import { FaFile, FaRegNewspaper } from "react-icons/fa";
import { FaFileCirclePlus } from "react-icons/fa6";
import { HiNewspaper } from "react-icons/hi";
import { IoHome } from "react-icons/io5";
import { MdReport } from "react-icons/md";
import { LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import nigerStateSeal from "../assets/niger-state-seal.jpg";
import { useAuthStore } from "../store/authStore";

const DesktopSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state: { logout: () => void }) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navRoutes = [
    { path: "/", label: "home", icon: <IoHome /> },
    { path: "/news", label: "news management", icon: <FaRegNewspaper /> },
    { path: "/projects", label: "projects management", icon: <FaFile /> },
    { path: "/complaints", label: "complaints", icon: <MdReport /> },
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
      <div className="py-5 px-2 flex flex-col h-[calc(100%-4rem)]">
        <div className="flex-1">
          {navRoutes.map((route, index) => (
            <Link to={route.path} key={index}>
              <div
                className={`flex items-center mb-3 py-3 px-2 rounded-sm cursor-pointer ${
                  pathname === route.path && "bg-gray-300"
                } hover:bg-gray-200 transition-colors duration-200`}
              >
                <span className="inline-block mr-3 text-lg text-green-800">
                  {route.icon}
                </span>
                <p className="capitalize font-semibold text-green-950">
                  {route.label}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center py-3 px-2 rounded-sm cursor-pointer hover:bg-red-50 transition-colors duration-200 mt-auto border-t border-gray-200"
        >
          <span className="inline-block mr-3 text-lg text-red-600">
            <LogOut size={18} />
          </span>
          <p className="capitalize font-semibold text-red-600">Sign Out</p>
        </button>
      </div>
    </div>
  );
};

export default DesktopSidebar;
