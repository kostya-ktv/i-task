"use server";
import { revalidatePath } from "next/cache";
import { APP_ROUTES } from "@/lib/constants";
import { db } from "@/lib/prisma";
import { ChangeListTitleSchemaType } from "./list.schema";

export const changeListTitle = async (value: ChangeListTitleSchemaType) => {
  await db.list.update({
    where: {
      id: value.listId,
      boardId: value.boardId,
    },
    data: {
      title: value.title,
    },
  });
  revalidatePath(APP_ROUTES.toBoardWithId(value.boardId));
};
