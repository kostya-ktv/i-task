import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const MarketingLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-screen text-neutral-300 bg-slate-900">
      <Navbar />
      <main className="pt-40 pb-20">{children}</main>
      <Footer />
    </div>
  );
};
export default MarketingLayout;
