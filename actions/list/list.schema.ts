import { ValidationsSchemes } from "../util";
import { z } from "@/lib/forms";

export const CreateListSchema = z.object({
  title: ValidationsSchemes.TITLE_VALIDATION,
  boardId: z.string(),
});
export type CreateBoardListSchemaType = z.infer<typeof CreateListSchema>;

export const ChangeListTitleSchema = z.object({
  title: ValidationsSchemes.TITLE_VALIDATION,
  boardId: z.string(),
  listId: z.string(),
});
export type ChangeListTitleSchemaType = z.infer<typeof ChangeListTitleSchema>;
