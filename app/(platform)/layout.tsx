import { ClerkProvider } from "@clerk/nextjs";

const PlatformLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};
export default PlatformLayout;
