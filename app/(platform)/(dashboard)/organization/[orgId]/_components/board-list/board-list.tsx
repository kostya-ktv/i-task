import { User2Icon } from "lucide-react";
import styles from "./board-list.module.scss";
import { NewBoardBtnPopover } from "./board-new-btn.popover";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/lib/constants";
import { BoardItem } from "./board-item";
import { db } from "@/lib/prisma";
import { Skeleton } from "@/components/ui";

const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    redirect(APP_ROUTES.selectOrg);
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className={styles.boardList}>
      <div className={styles.legend}>
        <User2Icon className={styles.legendIcon} />
        Your boards
      </div>

      <div className={styles.newBoardBox}>
        {boards.map((board) => (
          <BoardItem board={board} key={board.id} />
        ))}
        <NewBoardBtnPopover />
      </div>
    </div>
  );
};

const BoardListSkeleton = () => (
  <div className={styles.boardList}>
    <div className={styles.newBoardBox}>
      {Array(5)
        .fill("*")
        .map((el) => (
          <Skeleton className={styles.boardItem} key={el + 1} />
        ))}
    </div>
  </div>
);
export { BoardListSkeleton, BoardList };
