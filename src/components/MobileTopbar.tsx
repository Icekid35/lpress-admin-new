import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import nigerStateSeal from "../assets/niger-state-seal.jpg";
import { useAuthStore } from "../store/authStore";

const MobileTopbar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state: { logout: () => void }) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-2 bg-white/65 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            className="w-10 object-cover h-10 rounded-full"
            src={nigerStateSeal}
            alt="Niger State Seal"
          />
          <p className="font-semibold text-lg">
            <span className="text-white bg-green-700 rounded-md p-1">NG</span>
            -LPRES
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-md hover:bg-red-50 transition-colors duration-200"
          aria-label="Sign Out"
        >
          <LogOut size={20} className="text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default MobileTopbar;
