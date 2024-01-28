import { LogoLink } from "@/components/shared";

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-full flex items-center justify-center flex-col gap-y-2">
      <LogoLink />
      {children}
    </div>
  );
};

export default AuthLayout;
