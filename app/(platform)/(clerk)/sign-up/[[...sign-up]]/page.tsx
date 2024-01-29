import { ClerkLazy } from "@/components/shared";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <ClerkLazy>
      <SignUp />
    </ClerkLazy>
  );
}
