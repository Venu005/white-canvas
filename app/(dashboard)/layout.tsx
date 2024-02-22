import Navbar from "./_components/navbar";
import OrgSidebar from "./_components/org-sidebar";
import Sidebar from "./_components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="h-full">
      <Sidebar />
      {/* creating three columns */}
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          {/* side bar again */}
          <OrgSidebar />
          <div className="h-full flex-1">
            {/* to add nav-bar */}
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
