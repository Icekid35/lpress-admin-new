import { useState } from "react";
import { FaFile, FaPlus, FaRegNewspaper } from "react-icons/fa";
import { FaFileCirclePlus } from "react-icons/fa6";
import { HiNewspaper } from "react-icons/hi";
import { IoHome } from "react-icons/io5";
import { MdReport } from "react-icons/md";
import { Link, useLocation } from "react-router";

const MobileBottomNavbar = () => {
  const { pathname } = useLocation();
  const [isCollapsed, setCollapsed] = useState(true);
  const navRoutes = [
    { path: "/", label: "home", icon: <IoHome /> },
    { path: "/news", label: "news ", icon: <FaRegNewspaper /> },
    {
      icon: <FaPlus />,
      children: [
        {
          path: "/projects/add",
          label: "add new project",
          icon: <FaFileCirclePlus />,
        },
        { path: "/news/add", label: "add news", icon: <HiNewspaper /> },
        {
          path: "/newsletter/send",
          label: "send newsletter",
          icon: <HiNewspaper />,
        },
      ],
    },
    { path: "/projects", label: "projects", icon: <FaFile /> },
    { path: "/complaints", label: "complaints", icon: <MdReport /> },
  ];
  return (
    <div className="py-3 px-2 bg-white/65 h-[850x] backdrop-blur-md border-t border-gray-100 flex justify-around items-center">
      {navRoutes.map((route, index) =>
        !route.children ? (
          <Link to={route.path} key={index}>
            <div className="flex flex-col items-center cursor-pointer text-gray-600">
              <div
                className={`w-9 h-9 rounded-full shadow text-xl flex justify-center items-center mb-1 ${
                  pathname === route.path
                    ? "bg-green-200/20 text-green-800"
                    : "bg-white/40"
                } transition-colors`}
              >
                {route.icon}
              </div>
              <p className="text-[11px] font-semibold sm:text-lg">
                {route.label}
              </p>
            </div>
          </Link>
        ) : (
          <div className="self-start relative" key={index}>
            <div
              onClick={() => setCollapsed(!isCollapsed)}
              className={`${
                !isCollapsed
                  ? "transform-[scale(1.1)_rotate(45deg)]"
                  : "transform-[rotate(0)]"
              } cursor-pointer w-12 h-12 rounded-full flex justify-center items-center text-white bg-green-700 transition-transform `}
            >
              {route.icon}
            </div>
            <ul className="absolute bottom-20 -left-12">
              {route.children.map((child, childIndex) => (
                <li
                  key={childIndex}
                  className={`shadow-md rounded-3xl bg-white w-44 cursor-pointer hover:transform-[scale(1.1)] ${
                    isCollapsed ? "h-0 overflow-hidden p-0" : "h-fit p-1 mb-3"
                  } transition-[height_0.3s_padding_0.3s]`}
                >
                  <Link to={child.path} onClick={() => setCollapsed(true)}>
                    <div className="flex items-center">
                      {" "}
                      <span className="inline-flex w-10 h-10 justify-center items-center rounded-full bg-green-900 text-white mr-1">
                        {child.icon}
                      </span>
                      <p>{child.label}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default MobileBottomNavbar;
