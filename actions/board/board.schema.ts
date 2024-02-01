import { z } from "@/lib/forms";
const TITLE_VALIDATION = z
  .string({
    required_error: "Title is required",
    invalid_type_error: "Title must be string value",
  })
  .min(3, {
    message: "Title is too short ",
  })
  .max(20, {
    message: "Too long title",
  });

export const ChangeBoardTitleSchema = z.object({
  title: TITLE_VALIDATION,
});
export const CreateBoardSchema = z.object({
  title: TITLE_VALIDATION,
  image: z
    .string({
      required_error: "Picture is required",
      invalid_type_error: "Please select picture",
    })
    .min(3, "Please select picture"),
  // .refine((value) => {
  //   const imageSet = value.split("|");
  //   return imageSet.every((el) => Boolean(el));
  // }),
});
export type CreateBoardSchemaType = z.infer<typeof CreateBoardSchema>;
export type ChangeBoardTitleSchemaType = z.infer<typeof ChangeBoardTitleSchema>;
