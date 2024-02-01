import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { PlusIcon } from "lucide-react";
import { BoardListForm } from "../organization/[orgId]/_components/board-list/board-list-form";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}
export const CreateBoardBtn: React.FC<Props> = ({ className }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className={cn("flex items-center", className)}
        >
          <PlusIcon className="h-4" />
          <span>Board</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <BoardListForm />
      </PopoverContent>
    </Popover>
  );
};
