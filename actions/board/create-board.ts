"use server";
import { Board } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { APP_ROUTES } from "@/lib/constants";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { CreateBoardSchemaType } from ".";
import {
  hasAvailableCount,
  incrementAvailableCount,
} from "@/actions/org-limit";

export const createBoard = async (
  { title, image }: CreateBoardSchemaType,
  withRedirect?: boolean
): Promise<Board> => {
  // Checking if user authorized
  const { userId, orgId } = auth();
  if (!userId || !orgId) throw new Error("Unauthorized");

  const canCreate = await hasAvailableCount();

  if (!canCreate) {
    throw new Error("You have reached limit");
  }
  // Parse image value to variables and check is not empty
  const imageSet = image.split("|");
  const isImageSetValid = imageSet.every((el) => Boolean(el));
  if (!isImageSetValid) {
    console.error(imageSet);
    throw new Error("Missing image details to create Board");
  }

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    imageSet;
  const newBoard = await db.board.create({
    data: {
      title,
      imageFullUrl,
      imageId,
      imageLinkHTML,
      imageThumbUrl,
      imageUserName,
      orgId,
    },
  });
  await incrementAvailableCount();
  revalidatePath(APP_ROUTES.toBoardWithId(newBoard.id));
  if (withRedirect) {
    redirect(APP_ROUTES.toBoardWithId(newBoard.id));
  }
  return newBoard;
};
