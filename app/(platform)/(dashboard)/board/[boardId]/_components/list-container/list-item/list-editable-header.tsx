"use client";
import styles from "./list-item.module.scss";
import { useForm, zodResolver } from "@/lib/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { List } from "@prisma/client";
import { Input } from "@/components/ui";
import { useEscape } from "@/hooks";
import { useBoolean } from "usehooks-ts";
import { ElementRef, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  ChangeListTitleSchema,
  ChangeListTitleSchemaType,
  changeListTitle,
} from "@/actions/list";

interface Props {
  data: List;
}

export const ListEditableHeader: React.FC<Props> = ({ data }) => {
  const isEditing = useBoolean();
  const isLoading = useBoolean();
  const formRef = useRef<ElementRef<"form">>(null);
  const form = useForm<ChangeListTitleSchemaType>({
    resolver: zodResolver(ChangeListTitleSchema),
    defaultValues: {
      title: data.title,
      boardId: data.boardId,
      listId: data.id,
    },
  });

  const onSubmit = useCallback(
    async (values: ChangeListTitleSchemaType) => {
      if (values.title !== data.title) {
        isLoading.setTrue();
        await changeListTitle({
          ...values,
        }).finally(isLoading.setFalse);
      }
      isEditing.setFalse();
    },
    [data.title, isEditing, isLoading]
  );

  useEscape(() => {
    isEditing.setFalse();
    form.reset();
  });

  return isEditing.value ? (
    <Form {...form}>
      <form
        ref={formRef}
        className="relative"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field: { onBlur, ...rest } }) => (
            <FormItem>
              <FormControl>
                <Input
                  onBlur={() => form.handleSubmit(onSubmit)()}
                  disabled={isLoading.value}
                  className={cn(styles.listHeaderInput, "focus-visible:ring-5")}
                  autoFocus
                  {...rest}
                />
              </FormControl>
              <FormMessage className={styles.listHeaderInputErr} />
            </FormItem>
          )}
        />
      </form>
    </Form>
  ) : (
    <div className={styles.listHeaderTitle} onClick={isEditing.setTrue}>
      {form.watch("title")}
    </div>
  );
};
