import ProjectCard from '@/components/ProjectCard';
import projects from '@/data/projects';

const ProjectsPage = () => {
  const projectsInProgress = projects.reduce(
    (acc, current) => (current.status === 'in progress' ? acc + 1 : acc),
    0
  );
  return (
    <div className="max-w-[1140px] mx-auto px-4 pb-28 lg:pb-10">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl mb-2 font-semibold text-green-900">
          Projects Overview
        </h1>
        <p className="text-gray-600 mb-2">
          View and manage all current and completed projects here.
        </p>
        {projectsInProgress > 0 && (
          <p className="font-semibold text-green-900 bg-green-100 inline-block py-1 px-3 rounded-lg">
            {projectsInProgress} projects in progress
          </p>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
