"use server";

import { UnauthorizedError } from "@/lib/exceptions";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/prisma";
import { UpdateCardDetailsSchemaType } from ".";
import { revalidatePath } from "next/cache";
import { APP_ROUTES } from "@/lib/constants";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export const updateCardDetails = async (
  values: UpdateCardDetailsSchemaType
) => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) {
    throw new UnauthorizedError();
  }
  const { boardId, listId, title, cardId, description } = values;

  const updatedCard = await db.card.update({
    where: {
      id: cardId,
      listId,
      list: { boardId },
    },
    data: {
      title,
      description,
    },
  });
  await createAuditLog({
    entityTitle: updatedCard.title,
    entityId: updatedCard.id,
    entityType: ENTITY_TYPE.CARD,
    action: ACTION.UPDATE,
  });
  revalidatePath(APP_ROUTES.toBoardWithId(boardId));
  return updatedCard;
};
