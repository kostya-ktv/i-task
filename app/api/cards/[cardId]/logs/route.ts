import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();
    if (!orgId || !userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const logs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
    return NextResponse.json(logs);
  } catch (error) {
    return new NextResponse("Internal error!", { status: 500 });
  }
}
