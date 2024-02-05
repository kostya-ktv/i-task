import { z } from "@/lib/forms";
import { ValidationsSchemes } from "../util";

export const CreateCardSchema = z.object({
  title: ValidationsSchemes.TITLE_VALIDATION,
  listId: z.string(),
  boardId: z.string(),
});
export type CreateCardSchemaType = z.infer<typeof CreateCardSchema>;

export const UpdateCardOrderSchema = z.object({
 
  boardId: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      listId: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});
export type UpdateCardOrderSchemaType = z.infer<typeof UpdateCardOrderSchema>;
