"use server";

import { auth } from "@clerk/nextjs";
import { CreateBoardListSchemaType } from ".";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { List } from "@prisma/client";

export const createBoardList = async (
  values: CreateBoardListSchemaType
): Promise<List> => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) {
    throw Error("Unauthorized");
  }

  const board = await db.board.findUnique({
    where: {
      orgId: orgId,
      id: values.boardId,
    },
  });
  if (!board) {
    console.error("Invalid board id provided");
    redirect(APP_ROUTES.selectOrg);
  }
  const lastList = await db.list.findFirst({
    where: {
      boardId: values.boardId,
    },
    orderBy: {
      order: "desc",
    },
    select: {
      order: true,
    },
  });

  const newList = await db.list.create({
    data: {
      title: values.title,
      boardId: values.boardId,
      order: lastList ? lastList.order + 1 : 1,
    },
  });
  revalidatePath(APP_ROUTES.toBoardWithId(values.boardId));
  return newList;
};
