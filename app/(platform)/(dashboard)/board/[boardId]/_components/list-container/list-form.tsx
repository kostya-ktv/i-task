"use client";
import styles from "./list-container.module.scss";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ListWrapper } from "./list-wrapper";
import { useForm } from "react-hook-form";
import { Button, Input } from "@/components/ui";
import { PlusIcon, XIcon } from "lucide-react";
import { ElementRef, useRef } from "react";
import { useBoolean, useOnClickOutside } from "usehooks-ts";

export const ListForm = () => {
  const formRef = useRef<ElementRef<"form">>(null);
  const Editing = useBoolean();
  const form = useForm();

  useOnClickOutside(formRef, Editing.setFalse);
  return (
    <ListWrapper>
      {Editing.value ? (
        <Form {...form}>
          <form ref={formRef} className={styles.listForm}>
            <FormField
              name=""
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      autoFocus
                      placeholder="Enter list title"
                      className={styles.listFormInput}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-[2fr_1fr] gap-x-1">
              <Button size="sm" variant="blue">
                Add
              </Button>
              <Button size="sm" variant="ghost">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Button onClick={Editing.setTrue} className={styles.listAddBtn}>
          Add a list <PlusIcon className="h-4 w-4 mr-2" />
        </Button>
      )}
    </ListWrapper>
  );
};
