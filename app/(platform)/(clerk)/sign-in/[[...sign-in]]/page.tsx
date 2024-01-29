import { ClerkLazy } from "@/components/shared";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <ClerkLazy>
      <SignIn />
    </ClerkLazy>
  );
}
