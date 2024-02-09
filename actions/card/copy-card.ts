"use server";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { UnauthorizedError } from "@/lib/exceptions";
import { CopyCardSchemaType } from ".";
import { ACTION, Card, ENTITY_TYPE } from "@prisma/client";
import { createAuditLog } from "@/lib/create-audit-log";

export const copyCard = async (values: CopyCardSchemaType): Promise<Card> => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) {
    throw new UnauthorizedError();
  }
  const { boardId, cardId, listId } = values;
  const card = await db.card.findFirstOrThrow({
    where: {
      id: cardId,
      listId,
      list: { boardId },
    },
  });

  const lastCardOrder = await db.card.findFirst({
    where: {
      listId,
      list: { boardId },
    },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  const newCard = await db.card.create({
    data: {
      order: lastCardOrder?.order ? lastCardOrder.order + 1 : 1,
      title: `${card.title} Copy`,
      description: card.description,
      listId: card.listId,
    },
  });
  await createAuditLog({
    entityTitle: newCard.title,
    entityId: newCard.id,
    entityType: ENTITY_TYPE.CARD,
    action: ACTION.CREATE,
  });
  revalidatePath(APP_ROUTES.toBoardWithId(values.boardId));
  return newCard;
};
