import { User2Icon } from "lucide-react";
import styles from "./board-list.module.scss";
import { NewBoardBtnPopover } from "./board-new-btn.popover";

export const BoardList = () => {
  return (
    <div className={styles.boardList}>
      <div className={styles.legend}>
        <User2Icon className={styles.legendIcon} />
        Your boards
      </div>
      <NewBoardBtnPopover />
    </div>
  );
};
