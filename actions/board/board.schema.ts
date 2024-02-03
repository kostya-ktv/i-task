import { z } from "@/lib/forms";
import { ValidationsSchemes } from "../util";

export const ChangeBoardTitleSchema = z.object({
  title: ValidationsSchemes.TITLE_VALIDATION,
});
export type ChangeBoardTitleSchemaType = z.infer<typeof ChangeBoardTitleSchema>;

export const CreateBoardSchema = z.object({
  title: ValidationsSchemes.TITLE_VALIDATION,
  image: z
    .string({
      required_error: "Picture is required",
      invalid_type_error: "Please select picture",
    })
    .min(3, "Please select picture"),
});
export type CreateBoardSchemaType = z.infer<typeof CreateBoardSchema>;
