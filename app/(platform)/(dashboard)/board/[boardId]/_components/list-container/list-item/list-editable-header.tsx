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
  list: List;
}

export const ListEditableHeader: React.FC<Props> = ({ list }) => {
  const isEditing = useBoolean();
  const isLoading = useBoolean();
  const formRef = useRef<ElementRef<"form">>(null);
  const form = useForm<ChangeListTitleSchemaType>({
    resolver: zodResolver(ChangeListTitleSchema),
    defaultValues: {
      title: list.title,
      boardId: list.boardId,
      listId: list.id,
    },
  });

  const onSubmit = useCallback(
    async (values: ChangeListTitleSchemaType) => {
      if (values.title !== list.title) {
        isLoading.setTrue();
        await changeListTitle({
          ...values,
        }).finally(isLoading.setFalse);
      }
      isEditing.setFalse();
    },
    [list.title, isEditing, isLoading]
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
