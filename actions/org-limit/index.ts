import { auth } from "@clerk/nextjs";
import { db } from "../../lib/prisma";
import { BOARD_LIMIT } from "../../lib/boards";

export const incrementAvailableCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("401");
  }

  const orgLimit = await db.orgLimit.findFirst({
    where: { orgId },
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count + 1,
      },
    });
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};
export const decreaseAvailableCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("401");
  }

  const orgLimit = await db.orgLimit.findUniqueOrThrow({
    where: { orgId },
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count > 0 ? orgLimit.count - 1 : 0,
      },
    });
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};
export const hasAvailableCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("401");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  return !orgLimit || orgLimit.count < BOARD_LIMIT;
};

export const getAvailableCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return 0;
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  return orgLimit?.count || 0;
};
