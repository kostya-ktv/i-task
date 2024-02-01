import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui";

type Side = "left" | "right" | "top" | "bottom";
interface HintProps {
  children: React.ReactNode;
  description: string;
  side?: Side;
  sideOffset?: number;
  className?: string
}

export const Hint: React.FC<HintProps> = (props) => {
  const { children, className, description, side, sideOffset } = props;
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={sideOffset}
          side={side}
          className={cn("text-xs max-w-[220px] break-words", className)}
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
