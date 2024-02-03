"use client";
import styles from "./list-options.module.scss";
import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { List } from "@prisma/client";
import { XIcon } from "lucide-react";

interface Props {
  data: List;
  onAddCard: () => void;
  children: React.ReactNode;
}
export const ListOptions: React.FC<Props> = (props) => {
  const { children, data, onAddCard } = props;
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className={styles.listOptionsContent}>
        <div className={styles.listOptionsContentTitle}>List actions</div>
        <PopoverClose>
          <Button
            asChild
            className={styles.listOptionsCloseBtn}
            variant="ghost"
          >
            <XIcon className={styles.listOptionsCloseBtnIcon} />
          </Button>
        </PopoverClose>
        <Button
          className={styles.listOptionsAddBtn}
          onClick={() => onAddCard()}
        >
          Add card
        </Button>
      </PopoverContent>
    </Popover>
  );
};
