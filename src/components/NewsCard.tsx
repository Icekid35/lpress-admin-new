import { BsWindowSidebar } from 'react-icons/bs';
import TextSummarizer from './TextSummarizer';
import type { News } from '@/data/news';

interface Props {
  news: News;
}

const NewsCard = ({ news }: Props) => {
  return (
    <div className="p-2 rounded-2xl shadow-md border hover:transform-[scale(1.05)] transition-transform cursor-pointer">
      <div className="rounded-2xl overflow-hidden">
        <img className="w-full" src={news.image} alt={news.title} />
      </div>
      <div className="py-2">
        <h2 className="font-semibold text-gray-600">
          <TextSummarizer>{news.title}</TextSummarizer>
        </h2>
        <div className="mt-2">
          <span className="inline-block py-0.5 px-3 mb-2 rounded-sm text-green-950 bg-gray-50 border shadow font-semibold">
            {news.publishDate}
          </span>
          <div className="text-gray-600 mb-2">
            <TextSummarizer limit={75}>{news.details}</TextSummarizer>
          </div>
          <div className="text-green-800 flex items-center mt-5">
            <span className="inline-block mr-2">
              <BsWindowSidebar />
            </span>
            <p>
              <span className="inline-block">Event: {news.event}</span> {}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
