import { z } from "@/lib/forms";

export namespace ValidationsSchemes {
  export const TITLE_VALIDATION = z
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
}
