import styles from "./board-navbar.module.scss";
import { Board } from "@prisma/client";
import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "@/components/widgets";
import { Button } from "@/components/ui";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { APP_ROUTES } from "@/lib/constants";

interface Props {
  board: Board;
}
const BoardNavbar: React.FC<Props> = async ({ board }) => {
  return (
    <nav className={styles.boardNavbar}>
      <Button size="sm" className={styles.trigger} variant="transparent">
        <Link href={APP_ROUTES.toOrgWithId(board.orgId)}>
          <LogOutIcon className={styles.icon} />
        </Link>
      </Button>
      <BoardTitleForm data={board} />
      <div className="ml-auto">
        <BoardOptions board={board} />
      </div>
    </nav>
  );
};
export default BoardNavbar;
