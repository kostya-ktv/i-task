import { z } from "@/lib/forms";
import { ValidationsSchemes } from "../util";

export const CreateCardSchema = z.object({
  title: ValidationsSchemes.TITLE_VALIDATION,
  listId: z.string(),
  boardId: z.string(),
});
export type CreateCardSchemaType = z.infer<typeof CreateCardSchema>;

export const UpdateCardDetailsSchema = z.object({
  title: ValidationsSchemes.TITLE_VALIDATION,
  description: z.string().optional(),
  listId: z.string(),
  boardId: z.string(),
  cardId: z.string(),
});
export type UpdateCardDetailsSchemaType = z.infer<
  typeof UpdateCardDetailsSchema
>;

export const DeleteCardSchema = z.object({
  listId: z.string(),
  boardId: z.string(),
  cardId: z.string(),
});
export type DeleteCardSchemaType = z.infer<typeof DeleteCardSchema>;

export const CopyCardSchema = z.object({
  listId: z.string(),
  boardId: z.string(),
  cardId: z.string(),
});
export type CopyCardSchemaType = z.infer<typeof CopyCardSchema>;

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
