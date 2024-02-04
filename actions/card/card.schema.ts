import { z } from "@/lib/forms";
import { ValidationsSchemes } from "../util";

export const CreateCardSchema = z.object({
  title: ValidationsSchemes.TITLE_VALIDATION,
  listId: z.string(),
  boardId: z.string(),
});
export type CreateCardSchemaType = z.infer<typeof CreateCardSchema>;
