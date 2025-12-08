import { useState, useEffect } from "react";
import NewsCard from "@/components/NewsCard";
import { newsApi } from "@/lib/api";
import { Link } from "react-router";

interface News {
  id: string;
  title: string;
  details: string;
  event: string;
  location: string;
  published_at: string;
  images: string[];
  created_at: string;
}

const Newspage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsApi.getAll(50, 0);
        if (response.success && response.data) {
          console.log(response.data)
          setNews(response.data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1140px] mx-auto px-4 pb-28 lg:pb-12">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1140px] mx-auto px-4 pb-28 lg:pb-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1140px] mx-auto px-4 pb-28 lg:pb-12">
      <h1 className="text-3xl text-green-900 font-semibold mb-3 lg:text-4xl">
        Published News
      </h1>
      <p className="text-gray-600">
        View and manage all news items that have been published ({news.length}{" "}
        total)
      </p>

      {news.length === 0 ? (
        <div className="mt-10 text-center p-12 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 text-lg">No news articles yet</p>
          <Link
            to="/news/add"
            className="mt-4 inline-block px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
          >
            Add Your First News Article
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {news.map((item) => (
            <Link to={`/news/${item.id}`} key={item.id}>
              <NewsCard news={item} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Newspage;
