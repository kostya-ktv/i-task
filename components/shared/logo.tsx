import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import { APP_ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ILogoImg
  extends Omit<React.ComponentProps<typeof Image>, "src" | "alt"> {}

export const LogoImg: React.FC<ILogoImg> = (props) => {
  return <Image src={logo} alt="logo" height={30} width={30} {...props} />;
};

interface ILogoLink {
  imgProps?: ILogoImg;
  className?: string;
  showLogoOnMobile?: boolean;
}
export const LogoLink: React.FC<ILogoLink> = (props) => {
  const { imgProps, className, showLogoOnMobile } = props;
  return (
    <Link
      href={APP_ROUTES.home}
      className={cn(
        `hover:opacity-75
      transition
      gap-x-1
      items-center
      md:flex`,
        className,
        !showLogoOnMobile && "hidden"
      )}
    >
      <LogoImg {...imgProps} />
      <p
        className="text-lg text-neutral-100 pb-1
      font-woff hidden md:block"
      >
        iTask
      </p>
    </Link>
  );
};
