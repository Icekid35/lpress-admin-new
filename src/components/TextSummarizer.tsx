interface Props {
  children: string;
  limit?: number;
}

const TextSummarizer = ({ children, limit = 50 }: Props) => {
  const visibleText =
    children.length <= limit ? children : children.substring(0, limit) + '...';

  return <p>{visibleText}</p>;
};

export default TextSummarizer;
