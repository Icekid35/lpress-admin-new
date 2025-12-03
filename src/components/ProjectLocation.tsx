import { FaLocationDot } from 'react-icons/fa6';

interface Props {
  location: string;
}

const ProjectLocation = ({ location }: Props) => {
  return (
    <div className="flex items-center">
      <span className="inline-block text-md mr-1 text-green-800">
        <FaLocationDot />
      </span>
      <p>{location}</p>
    </div>
  );
};

export default ProjectLocation;
