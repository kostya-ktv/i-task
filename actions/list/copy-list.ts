"use server";

import { APP_ROUTES } from "@/lib/constants";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CopyListSchemaType } from ".";
import { NotFoundError, UnauthorizedError } from "@/lib/exceptions";
import { List } from "@prisma/client";

export const copyList = async ({
  boardId,
  listId,
}: CopyListSchemaType): Promise<List> => {
  const { orgId, userId } = auth();
  if (!orgId || !userId) throw new UnauthorizedError();

  const listToCopy = await db.list.findUnique({
    where: {
      id: listId,
      boardId,
    },
    include: {
      cards: true,
    },
  });
  if (!listToCopy) {
    throw new NotFoundError();
  }
  const lastOrderList = await db.list.findFirst({
    where: {
      boardId,
    },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  const newOrder = lastOrderList?.order ? lastOrderList.order + 1 : 1;
  const newList = await db.list.create({
    data: {
      boardId,
      title: `${listToCopy.title} - Copy`,
      order: newOrder,
      cards: {
        createMany: {
          data: listToCopy.cards.map((card) => ({
            title: card.title,
            order: card.order,
            description: card.description,
          })),
        },
      },
    },
    include: {
      cards: true,
    },
  });
  revalidatePath(APP_ROUTES.toBoardWithId(boardId));
  return newList;
};
