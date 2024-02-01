import { Hint } from "@/components/shared";
import { HelpCircleIcon } from "lucide-react";
import styles from "./board-list.module.scss";
import { CreateBoardPopover } from "@/components/widgets";

export const NewBoardBtnPopover = () => {
  return (
    <div className={styles.newBoardBox}>
      <CreateBoardPopover>
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
      </CreateBoardPopover>
    </div>
  );
};
