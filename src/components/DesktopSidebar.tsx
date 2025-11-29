import { useState } from 'react';
import { FaFile, FaRegNewspaper } from 'react-icons/fa';
import { FaFileCirclePlus, FaX } from 'react-icons/fa6';
import { HiNewspaper } from 'react-icons/hi';
import { IoHome } from 'react-icons/io5';
import { MdReport } from 'react-icons/md';
import nigerStateSeal from '../assets/niger-state-seal.jpg';

const DesktopSidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navRoutes = [
    { path: '#', label: 'home', icon: <IoHome /> },
    { path: '#', label: 'news management', icon: <FaRegNewspaper /> },
    { path: '#', label: 'projects', icon: <FaFile /> },
    { path: '#', label: 'reports', icon: <MdReport /> },
    { path: '#', label: 'add new project', icon: <FaFileCirclePlus /> },
    { path: '#', label: 'add news', icon: <HiNewspaper /> },
  ];

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md h-full">
      <div className="flex items-center justify-between px-3 py-3">
        <img
          className="w-10 object-cover h-10 rounded-full"
          src={nigerStateSeal}
          alt="Niger State Seal"
        />
        <p className="font-semibold text-lg ml-2">
          <span className="text-white bg-green-700 rounded-md p-1">NG</span>
          -LPRES
        </p>
      </div>
      <div className="py-5 px-2">
        {navRoutes.map((route, index) => (
          <div
            className={`flex items-center mb-3 py-3 px-2 rounded-sm cursor-pointer ${
              selectedIndex === index && 'bg-gray-300'
            } hover:bg-gray-200 transition-colors duration-200`}
            onClick={() => setSelectedIndex(index)}
          >
            <span className="inline-block mr-3 text-lg text-green-800">
              {route.icon}
            </span>
            <p className="capitalize font-semibold text-green-950">
              {route.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopSidebar;
