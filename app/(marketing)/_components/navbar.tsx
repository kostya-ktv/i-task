import { Logo } from "@/components/shared";
import { Button } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div
      className="fixed top-0 w-full h-14
  px-4 border-b border-slate-800 bg-slate-950 flex items-center"
    >
      <div
        className="md:max-w-screen-2xl mx-auto flex items-center
      w-full justify-between"
      >
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button asChild size="sm" variant="secondary">
            <Link href="/sign-up">
              <Image
                className="md:hidden"
                src="./logo.svg"
                alt="logo"
                height={30}
                width={30}
              />
              Get iTask
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
