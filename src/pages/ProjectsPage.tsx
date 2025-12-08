import { useState, useEffect } from "react";
import ProjectCard from "@/components/ProjectCard";
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

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsApi.getAll(undefined, 50, 0);
        if (response.success && response.data) {
          setProjects(response.data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const projectsInProgress = projects.reduce(
    (acc, current) => (current.status === "in progress" ? acc + 1 : acc),
    0
  );

  if (loading) {
    return (
      <div className="max-w-[1140px] mx-auto px-4 pb-28 lg:pb-10">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1140px] mx-auto px-4 pb-28 lg:pb-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1140px] mx-auto px-4 pb-28 lg:pb-10">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl mb-2 font-semibold text-green-900">
          Projects Overview
        </h1>
        <p className="text-gray-600 mb-2">
          View and manage all current and completed projects here (
          {projects.length} total)
        </p>
        {projectsInProgress > 0 && (
          <p className="font-semibold text-green-900 bg-green-100 inline-block py-1 px-3 rounded-lg">
            {projectsInProgress} projects in progress
          </p>
        )}
      </div>
      {projects.length === 0 ? (
        <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 text-lg">No projects yet</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
