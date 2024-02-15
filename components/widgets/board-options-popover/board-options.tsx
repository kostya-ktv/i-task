"use client";
import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "@/components/ui";
import { Board } from "@prisma/client";
import {
  LogOutIcon,
  MoreHorizontalIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import styles from "./board-options.module.scss";
import { deleteBoard } from "@/actions/board/delete-board";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/lib/constants";

interface Props {
  board: Board;
}
export const BoardOptions: React.FC<Props> = ({ board }) => {
  const { id, orgId } = board;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

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
          disabled={isLoading}
          onClick={() => router.push(APP_ROUTES.toOrgWithId(orgId))}
          variant="ghost"
          className={styles.btn}
        >
          <LogOutIcon className={styles.icon} />
          Back to boards
        </Button>
        <Separator />
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          onClick={() => handleDeleteBoard()}
          variant="ghost"
          className={cn(styles.btn, "text-red-600")}
        >
          <Trash2Icon className={styles.icon} />
          Delete board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
