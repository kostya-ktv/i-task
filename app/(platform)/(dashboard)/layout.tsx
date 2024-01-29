import { Navbar } from "./_components/navbar/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-white">
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
