import { Outlet } from 'react-router';
import DesktopSidebar from '../components/DesktopSidebar';
import DesktopTopbar from '../components/DesktopTopbar';
import MobileTopbar from '../components/MobileTopbar';
import MobileBottomNavbar from '../components/MobileBottomNavbar';

const Layout = () => {
  return (
    <div className="selection:bg-blue-200">
      {/* Desktop view */}
      <div className="fixed top-0 left-0 bottom-0 w-[300px] h-dvh overflow-auto hidden md:block">
        <DesktopSidebar />
      </div>
      <div className="fixed left-[300px] right-0 top-0 hidden md:block">
        <DesktopTopbar />
      </div>

      {/* Mobile view */}
      <div className="fixed top-0 left-0 right-0 md:hidden">
        <MobileTopbar />
      </div>
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
        <MobileBottomNavbar />
      </div>
      <div className="pt-14 px-3 md:ml-[300px] md:pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
