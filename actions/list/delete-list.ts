"use server";

import { APP_ROUTES } from "@/lib/constants";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { DeleteListSchemaType } from ".";
import { UnauthorizedError } from "@/lib/exceptions";
import { List } from "@prisma/client";

export const deleteList = async ({
  boardId,
  listId,
}: DeleteListSchemaType): Promise<List> => {
  const { orgId, userId } = auth();
  if (!orgId || !userId) throw new UnauthorizedError();

  const list = await db.list.delete({
    where: {
      id: listId,
      boardId,
    },
  });
  revalidatePath(APP_ROUTES.toBoardWithId(boardId));
  return list;
};
