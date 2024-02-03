"use client";
import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { Board } from "@prisma/client";
import { MoreHorizontalIcon, XIcon } from "lucide-react";
import styles from "./board-options.module.scss";
import { deleteBoard } from "@/actions/board/delete-board";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface Props {
  id: Board["id"];
}
export const BoardOptions: React.FC<Props> = ({ id }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const handleDeleteBoard = async () => {
    setIsLoading(true);
    await deleteBoard(id)
      .then(() => {
        toast({
          title: "Board deleted",
          variant: "success",
        });
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={isLoading}
          className={styles.trigger}
          variant="transparent"
        >
          <MoreHorizontalIcon className={styles.icon} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={styles.content} side="bottom" align="start">
        <div className={styles.contentBox}>
          Settings
          <PopoverClose asChild>
            <Button
              disabled={isLoading}
              className={styles.contentBoxBtn}
              variant="ghost"
            >
              <XIcon className={styles.icon} />
            </Button>
          </PopoverClose>
        </div>
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          onClick={() => handleDeleteBoard()}
          variant="ghost"
          className={styles.deleteBtn}
        >
          <p className="text-red-600 text-xs">Delete board</p>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
