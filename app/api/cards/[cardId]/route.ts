import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.cardId) {
      return new NextResponse("Invalid id provided", { status: 500 });
    }

    const card = await db.card.findUniqueOrThrow({
      where: {
        id: params.cardId,
        list: {
          board: { orgId },
        },
      },
      include: {
        list: {
          select: {
            title: true,
            boardId: true,
          },
        },
      },
    });
    return NextResponse.json(card);
  } catch (error) {
    console.error(JSON.stringify(error));
    return new NextResponse("Internal error", { status: 500 });
  }
}
