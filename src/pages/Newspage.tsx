import NewsCard from '@/components/NewsCard';
import news from '@/data/news';
import { Link } from 'react-router';

const Newspage = () => {
  return (
    <div className="max-w-[1140px] mx-auto px-4 pb-28 lg:pb-12">
      <h1 className="text-3xl text-green-900 font-semibold mb-3 lg:text-4xl">
        Published News
      </h1>
      <p className="text-gray-600">
        View and manage all news items that have been published
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {news.map((news) => (
          <Link to={`/news/${news.id}`} key={news.id}>
            <NewsCard news={news} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Newspage;
