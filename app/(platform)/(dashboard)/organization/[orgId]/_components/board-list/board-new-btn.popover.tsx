import { Hint } from "@/components/shared";
import { HelpCircleIcon } from "lucide-react";
import styles from "./board-list.module.scss";
import { CreateBoardPopover } from "@/components/widgets";
import { getAvailableCount } from "@/actions/org-limit";
import { BOARD_LIMIT } from "@/lib/boards";
import { cn } from "@/lib/utils";

export const NewBoardBtnPopover = async () => {
  const availableCount = await getAvailableCount();
  return (
    <CreateBoardPopover>
      <div
        className={cn(
          styles.newBoardContainer,
          availableCount === BOARD_LIMIT && "opacity-50"
        )}
      >
        <p>Create new board </p>
        <span className="italic">{`${
          BOARD_LIMIT - availableCount
        } remaining`}</span>
        <Hint description={`Free Workspaces can have up to 5 boards`}>
          <HelpCircleIcon className={styles.hintIcon} />
        </Hint>
      </div>
    </CreateBoardPopover>
  );
};
