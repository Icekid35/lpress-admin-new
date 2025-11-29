import { Outlet } from 'react-router';
import DesktopSidebar from '../components/DesktopSidebar';
import MobileBottomNavbar from '../components/MobileBottomNavbar';
import MobileTopbar from '../components/MobileTopbar';

const Layout = () => {
  return (
    <div className="selection:bg-blue-200">
      {/* Desktop view */}
      <div className="fixed top-0 left-0 bottom-0 w-[280px] h-dvh overflow-auto hidden lg:block">
        <DesktopSidebar />
      </div>

      {/* Mobile view */}
      <div className="fixed top-0 left-0 right-0 lg:hidden">
        <MobileTopbar />
      </div>
      <div className="fixed bottom-0 left-0 right-0 lg:hidden">
        <MobileBottomNavbar />
      </div>
      <div className="lg:ml-[290px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
