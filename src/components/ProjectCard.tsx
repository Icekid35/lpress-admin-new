import { FaArrowRight } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { Link } from "react-router";
import ProjectLocation from "./ProjectLocation";
import ProjectStatusBadge from "./ProjectStatusBadge";
import TextSummarizer from "./TextSummarizer";
import { Card } from "./ui/card";

interface Props {
  project: {
    id: string;
    title: string;
    description: string;
    location: string;
    lga: string;
    ward: string;
    status: string;
    images: string[];
    created_at: string;
  };
}

const ProjectCard = ({ project }: Props) => {
  const imageUrl =
    project.images && project.images.length > 0
      ? project.images[0]
      : "/placeholder-project.jpg";
  const fullLocation = `${project.ward}, ${project.lga}, ${project.location}`;

  return (
    <Card className="p-2 overflow-hidden block cursor-pointer group">
      <div className="p-0 overflow-hidden rounded-lg h-48">
        <img
          src={imageUrl}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt={project.title}
        />
      </div>
      <div className="text-left py-3 rounded-lg">
        <h2 className="text-[17px] font-semibold">
          <TextSummarizer>{project.title}</TextSummarizer>
        </h2>
        <ProjectLocation location={fullLocation} />
        <div className="flex justify-between items-center">
          <div className="flex items-center mt-2">
            <span className="inline-block text-md mr-1 text-green-800">
              <MdOutlinePendingActions />
            </span>
            <ProjectStatusBadge
              status={project.status as "in progress" | "completed"}
            />
          </div>
          <Link to={`/projects/${project.id}`}>
            <p className="hover:underline font-semibold text-green-900 flex items-center">
              Expand{" "}
              <span className="inline-block ml-1">
                <FaArrowRight />
              </span>
            </p>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
