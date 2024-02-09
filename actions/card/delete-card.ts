"use server";

import { UnauthorizedError } from "@/lib/exceptions";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/prisma";
import { DeleteCardSchemaType } from ".";
import { revalidatePath } from "next/cache";
import { APP_ROUTES } from "@/lib/constants";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export const deleteCard = async (values: DeleteCardSchemaType) => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) {
    throw new UnauthorizedError();
  }
  const { boardId, listId, cardId } = values;
  const card = await db.card.delete({
    where: {
      id: cardId,
      listId,
      list: {
        boardId,
      },
    },
  });
  await createAuditLog({
    entityTitle: card.title,
    entityId: card.id,
    entityType: ENTITY_TYPE.CARD,
    action: ACTION.DELETE,
  });
  revalidatePath(APP_ROUTES.toBoardWithId(boardId));
};
