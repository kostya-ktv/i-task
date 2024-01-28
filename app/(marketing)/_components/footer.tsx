import { Button } from "@/components/ui";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full px-4 border-t border-slate-800 ">
      <div
        className="md:max-w-screen-2xl mx-auto flex items-center
      w-full justify-center"
      >
        <Button size="sm" variant="ghost">
          Privacy Policy
        </Button>
        <Button size="sm" variant="ghost">
          Terms of Service
        </Button>
      </div>
    </div>
  );
};
