import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Spinner } from "@/components/shared";

interface Props {
  children?: React.ReactNode;
  loader?: React.ReactNode;
}
export const ClerkLazy: React.FC<Props> = ({ children, loader }) => {
  return (
    <>
      <ClerkLoading>{loader || <Spinner />}</ClerkLoading>
      <ClerkLoaded>{children}</ClerkLoaded>
    </>
  );
};
