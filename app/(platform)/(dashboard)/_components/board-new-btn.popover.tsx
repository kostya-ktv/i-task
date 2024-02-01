import { Button } from "@/components/ui";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CreateBoardPopover } from "@/components/widgets";

interface Props {
  className?: string;
}
export const CreateBoardBtnPopoverSidebar: React.FC<Props> = ({
  className,
}) => {
  return (
    <CreateBoardPopover>
      <Button
        size="sm"
        variant="outline"
        className={cn("flex items-center", className)}
      >
        <PlusIcon className="h-4" />
        <span>Board</span>
      </Button>
    </CreateBoardPopover>
  );
};
