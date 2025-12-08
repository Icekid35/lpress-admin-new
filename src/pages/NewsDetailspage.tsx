import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { newsApi } from "@/lib/api";

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

const NewsDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      if (!id) return;
      try {
        const response = await newsApi.getById(id);
        if (response.success && response.data) {
          setNews(response.data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    setDeleting(true);
    try {
      await newsApi.delete(id);
      navigate("/news");
    } catch (err: any) {
      alert(err.message || "Failed to delete news");
    } finally {
      setDeleting(false);
      setOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1140px] mx-auto px-4 pb-28 lg:pb-12">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="max-w-[1140px] mx-auto px-4 pb-28 lg:pb-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error || "News not found"}
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="max-w-[1140px] mx-auto px-4 pb-28 lg:pb-12">
        <div className="mb-5">
          <h1 className="text-xl font-semibold mb-1 text-green-900 lg:text-2xl">
            {news.title}
          </h1>
          <div className="text-gray-500 tracking-wider mb-3 flex flex-col lg:flex-row lg:justify-between">
            <p>{news.location}</p>
            <p className="mb-2 mt-2 lg:mt-0 italic">
              {new Date(
                news.published_at || news.created_at
              ).toLocaleDateString("en-us", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="mb-5">
            <p className="font-semibold text-gray-600 text-lg">Event</p>
            {news.event}
          </div>
          <div>
            <p className="font-semibold text-lg text-gray-600">Description</p>
            <div
              className="prose prose-zinc dark:prose-invert max-w-3xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: news.details }}
            />
          </div>
        </div>
        {news.images && news.images.length > 0 && (
          <div>
            <p className="text-lg text-gray-600 font-semibold mb-2">Images</p>
            <div className="grid gap-4 max-w-2xl">
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                {news.images.map((img, idx) => (
                  <div key={idx}>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src={img}
                      alt={`News image ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. The news article will be
                permanently deleted.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={handleDelete}
                type="submit"
                variant="destructive"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
          <DialogTrigger className="mt-4">
            <span className="inline-block py-2 px-4 rounded-md bg-red-600 hover:bg-red-800 font-semibold text-white">
              Delete News
            </span>
          </DialogTrigger>
        </Dialog>
      </div>
    </div>
  );
};

export default NewsDetailsPage;
