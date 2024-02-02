import styles from "./boardId-page.module.scss";
import { APP_ROUTES } from "@/lib/constants";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ListContainer } from "./_components/list-container/list-container";
import { Board } from "@prisma/client";

interface Props {
  params: {
    boardId: Board["id"];
  };
}
const BoardIdPage: React.FC<Props> = async ({ params }) => {
  const { orgId } = auth();
  if (!orgId) redirect(APP_ROUTES.selectOrg);

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className={styles.boardIdPage}>
      <ListContainer boardId={params.boardId} data={lists} />
    </div>
  );
};
export default BoardIdPage;
