import { ValidationsSchemes } from "../util";
import { z } from "@/lib/forms";

export const CreateListSchema = z.object({
  title: ValidationsSchemes.TITLE_VALIDATION,
  boardId: z.string(),
});
export type CreateListSchemaType = z.infer<typeof CreateListSchema>;

export const ChangeListTitleSchema = z.object({
  title: ValidationsSchemes.TITLE_VALIDATION,
  boardId: z.string(),
  listId: z.string(),
});
export type ChangeListTitleSchemaType = z.infer<typeof ChangeListTitleSchema>;

export const DeleteListSchema = z.object({
  boardId: z.string(),
  listId: z.string(),
});
export type DeleteListSchemaType = z.infer<typeof DeleteListSchema>;

export const CopyListSchema = z.object({
  boardId: z.string(),
  listId: z.string(),
});
export type CopyListSchemaType = z.infer<typeof CopyListSchema>;

export const UpdateListOrderSchema = z.object({
  boardId: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});
export type UpdateListOrderSchemaType = z.infer<typeof UpdateListOrderSchema>;
