"use client";
import { Button, Textarea } from "@/components/ui";
import { useForm, zodResolver } from "@/lib/forms";
import styles from "./card.module.scss";
import { Board, List } from "@prisma/client";
import { useCallback, useState } from "react";
import { PlusIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  CreateCardSchema,
  CreateCardSchemaType,
  createCard,
} from "@/actions/card";
import { useEscape } from "@/hooks";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  listId: List["id"];
  boardId: Board["id"];
  isEditing: boolean;
  openEditing: () => void;
  closeEditing: () => void;
}
export const CardForm: React.FC<Props> = (props) => {
  const { closeEditing, openEditing, listId, isEditing, boardId } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<CreateCardSchemaType>({
    resolver: zodResolver(CreateCardSchema),
    defaultValues: {
      boardId,
      title: "",
      listId,
    },
  });

  const onCancel = useCallback(() => {
    form.reset();
    closeEditing();
  }, [closeEditing, form]);

  const onSubmit = useCallback(
    async (values: CreateCardSchemaType) => {
      setIsLoading(true);
      await createCard(values)
        .then(() => {
          onCancel();
          toast({
            title: "New card created",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [onCancel, toast]
  );

  useEscape(onCancel);

  if (isEditing) {
    return (
      <Form {...form}>
        <form className={styles.cardForm} onSubmit={(e) => e.preventDefault()}>
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    {...field}
                    autoFocus
                    className="resize-none"
                    placeholder="Enter a title for this card..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={styles.cardFormBtnGroup}>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              <PlusIcon className={styles.cardFormAddBtnIcon} />
              Add
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    );
  }
  return (
    <div className={styles.cardForm}>
      <Button
        onClick={openEditing}
        className={styles.cardFormAddBtn}
        variant="ghost"
      >
        <PlusIcon className={styles.cardFormAddBtnIcon} /> Add a card
      </Button>
    </div>
  );
};
