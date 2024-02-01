import styles from "./board-navbar.module.scss";
import { Board } from "@prisma/client";
import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "@/components/widgets";

interface Props {
  board: Board;
}
const BoardNavbar: React.FC<Props> = async ({ board }) => {
  return (
    <nav className={styles.boardNavbar}>
      <BoardTitleForm data={board} />
      <div className="ml-auto">
        <BoardOptions id={board.id} />
      </div>
    </nav>
  );
};
export default BoardNavbar;
