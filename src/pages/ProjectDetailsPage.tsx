import ProjectLocation from "@/components/ProjectLocation";
import ProjectStatusBadge from "@/components/ProjectStatusBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { projectsApi } from "@/lib/api";

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  lga: string;
  ward: string;
  status: string;
  images: string[];
  created_at: string;
}

const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const response = await projectsApi.getById(id);
        if (response.success && response.data) {
          setProject(response.data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!id) return;
    setUpdating(true);
    try {
      await projectsApi.update(id, { status: newStatus });
      setProject((prev) => (prev ? { ...prev, status: newStatus } : null));
    } catch (err: any) {
      alert(err.message || "Failed to update status");
    } finally {
      setUpdating(false);
      setOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    setDeleting(true);
    try {
      await projectsApi.delete(id);
      navigate("/projects");
    } catch (err: any) {
      alert(err.message || "Failed to delete project");
    } finally {
      setDeleting(false);
      setOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 pb-28 lg:pb-10">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-5xl mx-auto px-4 pb-28 lg:pb-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error || "Project not found"}
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto px-4 pb-28 lg:pb-10">
      <div className="mb-5">
        <div className="flex mb-4 flex-col lg:flex-row lg:justify-between">
          <div className="max-w-lg">
            <h1 className="text-2xl font-semibold text-green-900 lg:text-2xl mb-1">
              {project.title}
            </h1>
            <p className="text-gray-600">Project overview and progress</p>
          </div>
          <div className="mb-3 mt-3 lg:mt-0">
            <ProjectStatusBadge status={project.status} />
          </div>
        </div>
        <div className="flex mb-5 justify-between max-w-xl">
          <div>
            <p className="text-gray-600 font-semibold text-lg">Location</p>
            <ProjectLocation
              location={`${project.ward}, ${project.lga}, ${project.location}`}
            />
          </div>
          <div>
            <p className="text-gray-600 font-semibold text-lg">Status</p>
            <p className="capitalize">{project.status}</p>
          </div>
        </div>
        <div>
          <p className="font-semibold text-lg text-gray-600">Description</p>
          <div
            className="prose prose-zinc dark:prose-invert max-w-3xl leading-relaxed"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        </div>
      </div>
      {project.images && project.images.length > 0 && (
        <div className="">
          <p className="text-gray-600 font-semibold mb-3 text-lg">
            Project Images
          </p>
          <div className="grid gap-4 max-w-2xl">
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              {project.images.map((img, idx) => (
                <div key={idx}>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src={img}
                    alt={`Project image ${idx + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div>
        {project.status !== "completed" && (
          <Dialog>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-green-950">
                  Mark project as completed?
                </DialogTitle>
                <DialogDescription>
                  This action will change the project status to Completed. You
                  can undo this later if the project becomes active again
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  onClick={() => handleStatusUpdate("completed")}
                  type="submit"
                  className="bg-green-700 hover:bg-green-900 transition-colors"
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Yes, mark as completed"}
                </Button>
              </DialogFooter>
            </DialogContent>
            <DialogTrigger className="mt-4">
              <span className="inline-block py-1.5 px-4 text-md rounded-md bg-green-700 hover:bg-green-900 font-semibold transition-colors text-white">
                Mark as Completed
              </span>
            </DialogTrigger>
          </Dialog>
        )}
        {project.status !== "in progress" && (
          <Dialog>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-green-950">
                  Reopen project as ongoing?
                </DialogTitle>
                <DialogDescription>
                  This action will change the project status back to In
                  Progress. Use this if the project still has work left or needs
                  updates.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  onClick={() => handleStatusUpdate("in progress")}
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-900 transition-colors"
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Yes, mark as in progress"}
                </Button>
              </DialogFooter>
            </DialogContent>
            <DialogTrigger className="mt-4 mx-2">
              <span className="inline-block py-1.5 px-4 text-md rounded-md bg-blue-700 hover:bg-blue-900 transition-colors font-semibold text-white">
                Mark as In Progress
              </span>
            </DialogTrigger>
          </Dialog>
        )}
        <Dialog open={open} onOpenChange={setOpen}>
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
                onClick={handleDelete}
                type="submit"
                className="bg-red-700 hover:bg-red-900 transition-colors"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, delete project"}
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
