import { cn } from "@/lib/utils";
import spinner from "@/public/assets/spinner.svg";
import Image from "next/image";

export const Spinner: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Image className={cn("h-[70px]", className)} src={spinner} alt="spinner" />
  );
};
