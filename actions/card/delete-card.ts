"use server";

import { UnauthorizedError } from "@/lib/exceptions";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/prisma";
import { DeleteCardSchemaType } from ".";
import { revalidatePath } from "next/cache";
import { APP_ROUTES } from "@/lib/constants";

export const deleteCard = async (values: DeleteCardSchemaType) => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) {
    throw new UnauthorizedError();
  }
  const { boardId, listId, cardId } = values;
  await db.card.delete({
    where: {
      id: cardId,
      listId,
      list: {
        boardId,
      },
    },
  });
  revalidatePath(APP_ROUTES.toBoardWithId(boardId));
};
