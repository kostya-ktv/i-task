"use client";
import styles from "./new-list.module.scss";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm, zodResolver } from "@/lib/forms";
import { Button, Input } from "@/components/ui";
import { ElementRef, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useEscape } from "@/hooks";
import { createList } from "@/actions/board";
import { Board } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { CreateListSchema, CreateListSchemaType } from "@/actions/list";

interface Props {
  closeEditing: () => void;
}
export const ListForm: React.FC<Props> = ({ closeEditing }) => {
  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<CreateListSchemaType>({
    resolver: zodResolver(CreateListSchema),
    defaultValues: {
      boardId: params.boardId as Board["id"],
      title: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  const onSubmitForm = async (values: CreateListSchemaType) => {
    await createList(values)
      .then(() => {
        toast({
          title: `List ${values.title}`,
          description: "Successfully created",
          variant: "success",
        });
        closeEditing();
        router.refresh();
      })
      .catch(() => {
        toast({
          title: `Error`,
          description: "list not created",
          variant: "destructive",
        });
      });
  };
  useOnClickOutside(formRef, closeEditing);
  useEscape(closeEditing);
  return (
    <Form {...form}>
      <form
        ref={formRef}
        className={styles.listForm}
        onSubmit={form.handleSubmit(onSubmitForm)}
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  autoFocus
                  placeholder="Enter list title"
                  className={styles.listFormInput}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className={styles.listFormCancelBtn}>
          <Button
            disabled={isSubmitting}
            isLoading={isSubmitting}
            type="submit"
            size="sm"
            variant="secondary"
          >
            Add
          </Button>
          <Button
            disabled={isSubmitting}
            size="sm"
            variant="transparent"
            type="button"
            onClick={closeEditing}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
