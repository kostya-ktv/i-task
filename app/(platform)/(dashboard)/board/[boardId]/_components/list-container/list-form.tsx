"use client";
import styles from "./list-container.module.scss";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button, Input } from "@/components/ui";
import { ElementRef, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useEscape } from "@/hooks";

interface Props {
  closeEditing: () => void;
}
export const ListForm: React.FC<Props> = ({ closeEditing }) => {
  const formRef = useRef<ElementRef<"form">>(null);

  const form = useForm();

  useOnClickOutside(formRef, closeEditing);
  useEscape(closeEditing);
  return (
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
          <Button
            size="sm"
            variant="ghost"
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
