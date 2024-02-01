"use server";
import { Board } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { APP_ROUTES } from "@/lib/constants";
import { db } from "@/lib/prisma";
import { ChangeBoardTitleSchemaType } from ".";

export const changeBoardTitle = async (
  value: ChangeBoardTitleSchemaType,
  boardId: Board["id"]
) => {
  await db.board.update({
    where: {
      id: boardId,
    },
    data: {
      title: value.title,
    },
  });
  revalidatePath(APP_ROUTES.toBoardWithId(boardId));
};
