import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui";
import { CreateBoardForm } from "./create-board-form";

interface Props {
  children: React.ReactNode;
}
export const CreateBoardPopover: React.FC<Props> = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <CreateBoardForm />
      </PopoverContent>
    </Popover>
  );
};
