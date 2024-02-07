"use server";

import { UnauthorizedError } from "@/lib/exceptions";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/prisma";
import { DeleteCardSchemaType } from ".";
import { revalidatePath } from "next/cache";
import { APP_ROUTES } from "@/lib/constants";

export const updateCardDetails = async (values: DeleteCardSchemaType) => {
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
  revalidatePath(APP_ROUTES.toBoardWithId(boardId));
  return updatedCard;
};
