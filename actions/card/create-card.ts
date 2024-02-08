"use server";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { UnauthorizedError } from "@/lib/exceptions";
import { CreateCardSchemaType } from ".";
import { ACTION, Card, ENTITY_TYPE } from "@prisma/client";
import { createAuditLog } from "@/lib/create-audit-log";

export const createCard = async (
  values: CreateCardSchemaType
): Promise<Card> => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) {
    throw new UnauthorizedError();
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
  const list = await db.list.findUnique({
    where: {
      id: values.listId,
      boardId: values.boardId,
    },
  });
  if (!list) {
    console.error("Invalid list id provided");
    redirect(APP_ROUTES.selectOrg);
  }
  const lastCard = await db.card.findFirst({
    where: {
      listId: values.listId,
    },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  const newOrder = lastCard?.order ? lastCard.order + 1 : 1;
  const card = await db.card.create({
    data: {
      title: values.title,
      listId: values.listId,
      order: newOrder,
    },
  });
  await createAuditLog({
    entityId: card.id,
    entityTitle: card.title,
    entityType: ENTITY_TYPE.CARD,
    action: ACTION.CREATE,
  }).catch((err) => console.error("CREATE AUDIT LOG", err));
  revalidatePath(APP_ROUTES.toBoardWithId(values.boardId));
  return card;
};
