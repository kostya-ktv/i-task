"use server";

import { APP_ROUTES } from "@/lib/constants";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Board } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteBoard = async (boardId: Board["id"]) => {
  const { orgId } = auth();
  if (!orgId) redirect(APP_ROUTES.selectOrg);

  await db.board.delete({
    where: {
      id: boardId,
    },
  });
  revalidatePath(APP_ROUTES.toBoardWithId(boardId));

  redirect(APP_ROUTES.toOrgWithId(orgId));
};
