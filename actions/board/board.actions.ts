"use server";
import { Board } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { DB_CLIENT } from "@/lib/db.service";
import { revalidatePath } from "next/cache";
import { APP_ROUTES } from "@/lib/constants";
import { CreateBoardSchemaType } from "./board.schema";
import { redirect } from "next/navigation";

export const createBoard = async (
  { title, image }: CreateBoardSchemaType,
  withRedirect?: boolean
): Promise<Board> => {
  // Checking if user authorized
  const { userId, orgId } = auth();
  if (!userId || !orgId) throw Error("Unauthorized");

  // Parse image value to variables and check is not empty
  const imageSet = image.split("|");
  const isImageSetValid = imageSet.every((el) => Boolean(el));
  if (!isImageSetValid) {
    console.error(imageSet);
    throw Error("Missing image details to create Board");
  }

  const [imageId, imageThumbUrl, imageFullUrl, imageLinksHTML, imageUserName] =
    imageSet;
  const newBoard = await DB_CLIENT.board.create({
    data: {
      title,
      imageFullUrl,
      imageId,
      imageLinksHTML,
      imageThumbUrl,
      imageUserName,
      orgId,
    },
  });
  revalidatePath(APP_ROUTES.toBoardWithId(newBoard.id));
  if (withRedirect) {
    redirect(APP_ROUTES.toBoardWithId(newBoard.id));
  }
  return newBoard;
};
