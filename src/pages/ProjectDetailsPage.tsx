import ProjectLocation from '@/components/ProjectLocation';
import ProjectStatusBadge from '@/components/ProjectStatusBadge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router';
import remarkGfm from 'remark-gfm';

const ProjectDetailsPage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const text = `
This is the first paragraph of the article. It has some general information and sets the stage for the rest of the content. We can break it into multiple paragraphs for better readability.

Here are some key points:
*   Item A: The first important point.
*   Item B: The second important point, which can be a bit longer to show text wrapping.
*   Item C: The final point.

> This is a blockquote, often used for emphasis or citations. It helps break up the flow of regular paragraphs.

The article concludes here. We encourage readers to stay tuned for more updates.
  `;
  return (
    <div className="max-w-5xl mx-auto px-4 pb-28 lg:pb-10">
      <div className="mb-5">
        <div className="flex mb-4 flex-col lg:flex-row lg:justify-between">
          <div className="max-w-lg">
            <h1 className="text-2xl font-semibold text-green-900 lg:text-2xl mb-1">
              Kogi State Kicks Off the Implementation of Private Veterinary
              Practice Programme (PVP)
            </h1>
            <p className="text-gray-600">Project overview and progress</p>
          </div>
          <div className="mb-3 mt-3 lg:mt-0">
            <ProjectStatusBadge status="completed" />
          </div>
        </div>
        <div className="flex mb-5 justify-between max-w-xl">
          <div>
            <p className="text-gray-600 font-semibold text-lg">Location</p>
            <ProjectLocation location={{ city: 'minna', state: 'niger' }} />
          </div>
          <div>
            <p className="text-gray-600 font-semibold text-lg">Status</p>
            <p>Completed</p>
          </div>
        </div>
        <div>
          <p className="font-semibold text-lg text-gray-600">Description</p>
          <div className="prose prose-zinc dark:prose-invert max-w-3xl leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-gray-600 font-semibold mb-3 text-lg">
          Project Images
        </p>
        <div className="grid gap-4 max-w-2xl">
          <div className="grid gap-4 grid-cols-2">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
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

      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-green-950">
                Mark project as completed?
              </DialogTitle>
              <DialogDescription>
                This action will change the project status to Completed. You can
                undo this later if the project becomes active again
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  navigate('/projects');
                  setOpen(false);
                }}
                type="submit"
                className="bg-green-700 hover:bg-green-900 transition-colors"
              >
                Yes, mark as completed
              </Button>
            </DialogFooter>
          </DialogContent>
          <DialogTrigger className="mt-4">
            <span className="inline-block py-1.5 px-4 text-md rounded-md bg-green-700 hover:bg-green-900 font-semibold transition-colors text-white">
              Mark as Completed
            </span>
          </DialogTrigger>
        </Dialog>
        <Dialog>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-green-950">
                Reopen project as ongoing?
              </DialogTitle>
              <DialogDescription>
                This action will change the project status back to Ongoing. Use
                this if the project still has work left or needs updates.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  navigate('/projects');
                  setOpen(false);
                }}
                type="submit"
                className="bg-blue-700 hover:bg-blue-900 transition-colors"
              >
                Yes, mark as ongoing
              </Button>
            </DialogFooter>
          </DialogContent>
          <DialogTrigger className="mt-4 mx-2">
            <span className="inline-block py-1.5 px-4 text-md rounded-md bg-blue-700 hover:bg-blue-900 transition-colors font-semibold text-white">
              Mark as ongoing
            </span>
          </DialogTrigger>
        </Dialog>
        <Dialog>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-green-950">
                Delete this project?
              </DialogTitle>
              <DialogDescription>
                This action will permanently remove this project and all its
                details from the system. This cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  navigate('/projects');
                  setOpen(false);
                }}
                type="submit"
                className="bg-red-700 hover:bg-red-900 transition-colors"
              >
                Yes, delete project
              </Button>
            </DialogFooter>
          </DialogContent>
          <DialogTrigger className="mt-4">
            <span className="inline-block py-1.5 px-4 text-md rounded-md bg-red-700 hover:bg-red-900 transition-colors font-semibold text-white">
              Delete Project
            </span>
          </DialogTrigger>
        </Dialog>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
