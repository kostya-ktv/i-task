import { APP_ROUTES } from "@/lib/constants";
import { Board } from "@prisma/client";
import Link from "next/link";
import styles from "./board-list.module.scss";
import { cn } from "@/lib/utils";

interface Props {
  board: Board;
}
export const BoardItem: React.FC<Props> = ({ board }) => {
  return (
    <Link
      href={APP_ROUTES.toBoardWithId(board.id)}
      style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
      className={cn(styles.boardItem, "group")}
    >
      <div className={cn(styles.boardItemMask, "group-hover:bg-black/50")} />
      <p className={styles.boardItemTitle}>{board.title}</p>
    </Link>
  );
};
