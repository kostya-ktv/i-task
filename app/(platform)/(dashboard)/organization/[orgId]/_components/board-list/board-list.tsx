import { HelpCircleIcon, User2Icon } from "lucide-react";
import styles from "./board-list.module.scss";
import { Hint } from "@/components/shared";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui";
import { BoardListForm } from "./board-list-form";

export const BoardList = () => {
  return (
    <div className={styles.boardList}>
      <div className={styles.legend}>
        <User2Icon className={styles.legendIcon} />
        Your boards
      </div>
      <div className={styles.newBoardBox}>
        <Popover>
          <PopoverTrigger asChild>
            <div className={styles.newBoardContainer}>
              <p>Create new board</p>
              <span>5 remaining</span>
              <Hint
                sideOffset={40}
                side="right"
                description={`Free Workspaces can have up to 5 boards`}
              >
                <HelpCircleIcon className={styles.hintIcon} />
              </Hint>
            </div>
          </PopoverTrigger>
          <PopoverContent sideOffset={10} side="right">
            <BoardListForm />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
