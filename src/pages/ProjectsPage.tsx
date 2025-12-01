import ProjectCard from '@/components/ProjectCard';
import projects from '@/data/projects';

const ProjectsPage = () => {
  return (
    <div className="max-w-[1140px] mx-auto px-4 pb-28 lg:pb-10">
      <div>
        <h1 className="text-3xl md:text-4xl mb-2 font-semibold text-green-900">
          Projects Overview
        </h1>
        <p className="text-gray-600 mb-6">
          View and manage all current and completed projects here.
        </p>
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
