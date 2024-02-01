"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./board-navbar.module.scss";
import { Button, Input } from "@/components/ui";
import { Board } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useBoolean } from "usehooks-ts";
import {
  ChangeBoardTitleSchema,
  ChangeBoardTitleSchemaType,
  changeBoardTitle,
} from "@/actions/board";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ElementRef, useRef } from "react";

interface Props {
  data: Board;
}

export const BoardTitleForm: React.FC<Props> = ({ data }) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const isEditing = useBoolean(false);

  const form = useForm<ChangeBoardTitleSchemaType>({
    resolver: zodResolver(ChangeBoardTitleSchema),
    defaultValues: {
      title: data.title,
    },
    values: {
      title: data.title,
    },
  });
  const onCancel = () => {
    form.reset();
    isEditing.setFalse();
  };
  const submitOnBlur = () => {
    if (data.title !== form.getValues("title")) {
      const onSubmit = form.handleSubmit(async (values) => {
        await changeBoardTitle(
          {
            title: values.title,
          },
          data.id
        ).then(isEditing.setFalse);
      });
      onSubmit();
    } else {
      isEditing.setFalse();
    }
  };

  if (isEditing.value) {
    return (
      <Form {...form}>
        <form ref={formRef} className={styles.boardNavbarForm}>
          <FormField
            control={form.control}
            name="title"
            render={({ field: { onBlur, ...rest } }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting}
                    autoFocus
                    onBlur={submitOnBlur}
                    className={styles.boardNavbarFormInput}
                    {...rest}
                  />
                </FormControl>
                <FormMessage className="absolute bg-black bottom-[-30px]" />
              </FormItem>
            )}
          />
          {form.formState.errors.title && (
            <Button
              onClick={() => onCancel()}
              type="button"
              size="sm"
              variant="ghost"
            >
              Cancel
            </Button>
          )}
        </form>
      </Form>
    );
  }
  return (
    <Button
      onClick={() => isEditing.setTrue()}
      className={styles.boardNavbarTitleForm}
      variant="transparent"
    >
      {form.watch("title")}
    </Button>
  );
};
