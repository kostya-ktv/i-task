import { z } from "@/lib/forms";
export const CreateBoardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be string value",
    })
    .min(3, {
      message: "Title is too short ",
    }),
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
