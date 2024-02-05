"use server";

import { UnauthorizedError } from "@/lib/exceptions";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/prisma";
import { UpdateCardOrderSchemaType } from ".";
import { revalidatePath } from "next/cache";
import { APP_ROUTES } from "@/lib/constants";

export const updateCardOrder = async (values: UpdateCardOrderSchemaType) => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) {
    throw new UnauthorizedError();
  }
  const {boardId, items } = values;

  const transaction = items.map((card) =>
    db.card.update({
      where: {
        id: card.id,
        list: {
        
          board: { orgId },
        },
      },
      data: {
        order: card.order,
        listId: card.listId,
      },
    })
  );
  const transactionResult = await db.$transaction(transaction).catch((err) => {
    console.error(JSON.stringify(err));
    return [];
  });
  revalidatePath(APP_ROUTES.toBoardWithId(boardId));
  return transactionResult
};
