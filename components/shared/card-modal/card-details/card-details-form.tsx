"use client";

import { Button, DialogClose, Input, Textarea } from "@/components/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm, zodResolver } from "@/lib/forms";
import styles from "./card.module.scss";
import { useBoolean } from "usehooks-ts";
import {
  UpdateCardDetailsSchema,
  UpdateCardDetailsSchemaType,
  updateCardDetails,
} from "@/actions/card";
import { CardWithList } from "@/lib/types";
import { ElementRef, useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeftIcon, LayoutIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardActions } from "./card-actions";

interface Props {
  card: CardWithList;
}
export const CardDetailsForm: React.FC<Props> = ({ card }) => {
  const isLoading = useBoolean();

  const formRef = useRef<ElementRef<"form">>(null);
  const queryClient = useQueryClient();
  const form = useForm<UpdateCardDetailsSchemaType>({
    resolver: zodResolver(UpdateCardDetailsSchema),
    defaultValues: {
      title: card.title,
      cardId: card.id,
      listId: card.listId,
      boardId: card.list.boardId,
      description: card.description || "",
    },
  });
  const isDirty = form.formState.isDirty;
  const onCancel = form.reset;

  const onSubmit = useCallback(
    async (values: UpdateCardDetailsSchemaType) => {
      if (
        values.title !== card.title ||
        values.description !== card.description
      ) {
        isLoading.setTrue();
        await updateCardDetails({ ...values })
          .catch(console.error)
          .then(() => {
            queryClient.invalidateQueries({
              queryKey: ["card", card.id],
            });
          })
          .finally(() => {
            isLoading.setFalse();
          });
      }
    },
    [card, isLoading, queryClient]
  );

  return (
    <Form {...form}>
      <form
        className={styles.cardDetailsForm}
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
      >
        <LayoutIcon className={styles.cardContainerLayoutIcon} />
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className={cn(
                    styles.cardDetailsFormTitleInput,
                    styles.cardTitle
                  )}
                  disabled={isLoading.value}
                  {...field}
                />
              </FormControl>

              <div className={styles.cardDetailsFormTitleDesc}>
                in list <span>{card.list.title}</span>
              </div>
              <FormMessage
                className="absolute"
                actionBtn={{
                  onClick: () => onCancel(),
                  title: "Cancel",
                }}
              />
            </FormItem>
          )}
        />
        <AlignLeftIcon className={styles.cardContainerLayoutIcon} />
        <div className={styles.cardDescriptionSector}>
          <span className={styles.cardTitle}>Description</span>
          <span className={styles.cardTitle}>Actions</span>
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    rows={6}
                    placeholder="Add a description..."
                    className={styles.cardDescriptionTextarea}
                    disabled={isLoading.value}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <CardActions card={card} />
        </div>
        {/* mock grid column */}
        <div />
        <div className={styles.cardDetailsFormBtnGroup}>
          <Button
            type="button"
            variant="green"
            onClick={form.handleSubmit(onSubmit)}
            isLoading={isLoading.value}
            size="sm"
            disabled={!isDirty}
          >
            Save changes
          </Button>
          <DialogClose disabled={isLoading.value}>
            <Button variant="outline" size="sm">
              Close
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};
