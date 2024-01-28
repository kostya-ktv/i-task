import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="hover:opacity-75
      transition gap-x-1 items-center hidden md:flex"
    >
      <Image src="./logo.svg" alt="logo" height={30} width={30} />
      <p
        className="text-lg text-neutral-100 pb-1
      font-woff"
      >
        iTask
      </p>
    </Link>
  );
};
