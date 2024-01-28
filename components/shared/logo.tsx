import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
interface ILogoImg
  extends Omit<React.ComponentProps<typeof Image>, "src" | "alt"> {}

export const LogoImg: React.FC<ILogoImg> = (props) => {
  return <Image src={logo} alt="logo" height={30} width={30} {...props} />;
};

export const LogoLink: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Link
      href="/"
      className="hover:opacity-75
      transition gap-x-1 items-center hidden md:flex"
    >
      <LogoImg />
      <p
        className="text-lg text-neutral-100 pb-1
      font-woff"
      >
        iTask
      </p>
    </Link>
  );
};
