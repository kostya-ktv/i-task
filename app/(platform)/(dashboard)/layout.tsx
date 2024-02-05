import { CardModalProvider } from "@/components/shared/card-modal/card-modal-provider";
import { Navbar } from "./_components/navbar/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-white">
      <Navbar />
      <CardModalProvider />
      {children}
    </div>
  );
};

export default DashboardLayout;
