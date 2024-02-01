import { APP_ROUTES } from "@/lib/constants";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import styles from "./boardId-page.module.scss";
import { Metadata } from "next";
import BoardNavbar from "./_components/board-navbar/board-navbar";

type Params = {
  params: { boardId: string };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const defaultTitle = "Board";
  const { orgId } = auth();
  if (!orgId) {
    return { title: defaultTitle };
  }
  const board = await db.board.findUnique({
    where: {
      orgId,
      id: params.boardId,
    },
  });
  return {
    title: board?.title ?? defaultTitle,
  };
}
type Props = Params & {
  children: React.ReactNode;
};
const BoardIdLayout: React.FC<Props> = async ({ params, children }) => {
  const { orgId } = auth();
  if (!orgId) redirect(APP_ROUTES.selectOrg);

  const board = await db.board.findUnique({
    where: {
      orgId,
      id: params.boardId,
    },
  });
  if (!board) notFound();
  return (
    <div
      className={styles.boardIdLayout}
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <div className={styles.boardIdLayoutBGMask} />

      <BoardNavbar board={board} />

      <div className="absolute inset-0 bg-black/10" />
      <main className={styles.boardIdLayoutMain}>{children}</main>
    </div>
  );
};

export default BoardIdLayout;
