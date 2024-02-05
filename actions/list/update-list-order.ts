"use server";

import { UnauthorizedError } from "@/lib/exceptions";
import { auth } from "@clerk/nextjs";
import { UpdateListOrderSchemaType } from ".";
import { db } from "@/lib/prisma";

export const updateListOrder = async (values: UpdateListOrderSchemaType) => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) {
    throw new UnauthorizedError();
  }
  const { items, boardId } = values;
  const transaction = items.map((list) =>
    db.list.update({
      where: {
        id: list.id,
        board: {
          id: boardId,
          orgId,
        },
      },
      data: {
        order: list.order,
      },
    })
  );
  return await db.$transaction(transaction).catch((err) => {
    console.error(JSON.stringify(err));
    return [];
  });
};
