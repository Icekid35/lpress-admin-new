interface Props {
  status: 'in progress' | 'completed';
}

const ProjectStatusBadge = ({ status }: Props) => {
  return (
    <span
      className={`py-[2.5px] px-3 inline-block rounded-lg backdrop-blur-md font-semibold whitespace-nowrap ${
        status === 'completed'
          ? 'text-green-950 bg-green-200/40'
          : 'text-gray-800 bg-gray-300/40'
      }`}
    >
      {status}
    </span>
  );
};

export default ProjectStatusBadge;
