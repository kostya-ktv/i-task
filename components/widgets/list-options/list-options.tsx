"use client";
import { copyList, deleteList } from "@/actions/list";
import styles from "./list-options.module.scss";
import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { List } from "@prisma/client";
import { CopyPlusIcon, PlusSquareIcon, Trash2Icon, XIcon } from "lucide-react";
import { ElementRef, useCallback, useRef } from "react";
import { useBoolean } from "usehooks-ts";

interface Props {
  list: List;
  onAddCard: () => void;
  children: React.ReactNode;
}
export const ListOptions: React.FC<Props> = (props) => {
  const isLoading = useBoolean();
  const closeBtnRef = useRef<ElementRef<"button">>(null);
  const { children, list, onAddCard } = props;

  const handleDeleteList = useCallback(async () => {
    isLoading.setTrue();
    await deleteList({
      boardId: list.boardId,
      listId: list.id,
    })
      .then(() => {
        if (closeBtnRef.current) {
          closeBtnRef.current.click();
        }
      })
      .finally(isLoading.setFalse);
  }, [list, isLoading]);
  const handleCopyList = useCallback(async () => {
    isLoading.setTrue();
    await copyList({
      boardId: list.boardId,
      listId: list.id,
    })
      .then(() => {
        if (closeBtnRef.current) {
          closeBtnRef.current.click();
        }
      })
      .finally(isLoading.setFalse);
  }, [list, isLoading]);

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className={styles.listOptionsContent}>
        <div className={styles.listOptionsContentTitle}>List actions</div>
        <PopoverClose asChild>
          <Button
            ref={closeBtnRef}
            size="icon"
            className={styles.listOptionsCloseBtn}
            variant="ghost"
          >
            <XIcon className={styles.listOptionsCloseBtnIcon} />
          </Button>
        </PopoverClose>
        <Button
          disabled={isLoading.value}
          variant="ghost"
          type="button"
          className={styles.listOptionsBtn}
        >
          <PlusSquareIcon className={styles.listIcon} />
          Add card...
        </Button>
        <Button
          disabled={isLoading.value}
          variant="ghost"
          type="button"
          onClick={() => handleCopyList()}
          className={styles.listOptionsBtn}
        >
          <CopyPlusIcon className={styles.listIcon} />
          Copy list...
        </Button>
        <Separator />
        <Button
          variant="ghost"
          type="button"
          isLoading={isLoading.value}
          className={cn(styles.listOptionsBtn, "text-red-600 ")}
          onClick={() => handleDeleteList()}
        >
          <Trash2Icon className={styles.listIcon} /> Delete list
        </Button>
      </PopoverContent>
    </Popover>
  );
};
