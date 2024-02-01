import { PropsWithChildren } from "react";
import Sidebar from "../_components/sidebar/sidebar";

const OrganizationLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="py-20 px-4 max-w-6xl
  2xl:max-w-screen-xl mx-auto"
    >
      <div className="flex gap-x-7">
        <div className="w-64 shrink-0 hidden md:block">
          <Sidebar />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
export default OrganizationLayout;
