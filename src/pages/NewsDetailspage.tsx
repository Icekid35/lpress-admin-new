import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const NewsDetailsPage = () => {
  const text = `
This is the first paragraph of the article. It has some general information and sets the stage for the rest of the content. We can break it into multiple paragraphs for better readability.

Here are some key points:
*   Item A: The first important point.
*   Item B: The second important point, which can be a bit longer to show text wrapping.
*   Item C: The final point.

> This is a blockquote, often used for emphasis or citations. It helps break up the flow of regular paragraphs.

The article concludes here. We encourage readers to stay tuned for more updates.
  `;

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const date = new Date();
  return (
    <div>
      <div className="max-w-[1140px] mx-auto px-4 pb-28 lg:pb-12">
        <div className="mb-5">
          <h1 className="text-xl font-semibold mb-1 text-green-900 lg:text-2xl">
            Niger State Kicks Off the Implementation of Private Veterinary
            Practice Programme (PVP)
          </h1>
          <div className="text-gray-500 tracking-wider mb-3 flex flex-col lg:flex-row lg:justify-between">
            <p>News details and event highlights</p>
            <p className="mb-2 mt-2 lg:mt-0 italic">
              {date.toLocaleDateString('en-us', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="mb-5">
            <p className="font-semibold text-gray-600 text-lg">Event</p>
            Lpres event, niger state
          </div>
          <div>
            <p className="font-semibold text-lg text-gray-600">Description</p>
            <div className="prose prose-zinc dark:prose-invert max-w-3xl leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            </div>
          </div>
        </div>
        <div>
          <p className="text-lg text-gray-600 font-semibold mb-2">Images</p>
          <div className="grid gap-4 max-w-2xl">
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
                alt=""
              />
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. The record will be permanently
                deleted.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  navigate('/news');
                  setOpen(false);
                }}
                type="submit"
                variant="destructive"
              >
                Delete
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
