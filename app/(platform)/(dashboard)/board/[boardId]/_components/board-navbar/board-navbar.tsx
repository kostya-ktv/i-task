import styles from "./board-navbar.module.scss";
import { Board } from "@prisma/client";
import { BoardTitleForm } from "./board-title-form";

interface Props {
  board: Board;
}
const BoardNavbar: React.FC<Props> = async ({ board }) => {
  return (
    <nav className={styles.boardNavbar}>
      <BoardTitleForm data={board} />
    </nav>
  );
};
export default BoardNavbar;
