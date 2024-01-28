import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Spinner } from "@/components/shared";

export const ClerkLazy: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ClerkLoading>
        <Spinner />
      </ClerkLoading>
      <ClerkLoaded>{children}</ClerkLoaded>
    </>
  );
};
