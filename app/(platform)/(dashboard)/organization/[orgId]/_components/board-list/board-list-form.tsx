"use client";
import styles from "./board-list.module.scss";
import * as BoardAPI from "@/actions/board";
import { PicturePicker } from "@/components/shared";
import { Button, Input, PopoverClose } from "@/components/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useForm, zodResolver } from "@/lib/forms";
import { XIcon } from "lucide-react";
import { useRef } from "react";

export const BoardListForm = () => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();
  const form = useForm<BoardAPI.CreateBoardSchemaType>({
    resolver: zodResolver(BoardAPI.CreateBoardSchema),
    defaultValues: {
      title: "",
      image: "",
    },
  });
  const isLoadingForm = form.formState.isSubmitting || form.formState.isLoading;
  const onSubmit = async (values: BoardAPI.CreateBoardSchemaType) => {
    await BoardAPI.createBoard({ ...values }, true)
      .then(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.click();
        }
        toast({
          title: "Created successfully",
          description: `Board: ${values.title}`,
          variant: "success",
        });
        form.reset();
      })
      .catch((err) => {
        toast({
          title: "Error create board",
          description: JSON.stringify(err),
          variant: "destructive",
        });
      });
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles.popoverForm}
        >
          <span className={styles.popoverFormTitle}>New board</span>
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormControl>
                  <PicturePicker
                    onSelectPicture={(img) =>
                      onChange({
                        target: {
                          value: img,
                        },
                      })
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Board title</FormLabel>
                <FormControl>
                  <Input placeholder="..." {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="green"
            disabled={isLoadingForm}
            size="sm"
            type="submit"
            className="w-full"
          >
            Create
          </Button>
        </form>
      </Form>
      <PopoverClose asChild>
        <Button
          ref={closeButtonRef}
          className={styles.popoverCloseBtn}
          variant="ghost"
          size="icon"
        >
          <XIcon className={styles.popoverCloseBtnIcon} />
        </Button>
      </PopoverClose>
    </>
  );
};
