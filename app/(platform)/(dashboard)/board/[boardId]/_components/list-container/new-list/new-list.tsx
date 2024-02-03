"use client";
import { useState } from "react";
import styles from "./new-list.module.scss";
import { ListForm } from "./list-form";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui";
import { Board } from "@prisma/client";
import { ListWrapper } from "../list-wrapper";

interface Props {
  boardId: Board["id"];
}
export const NewList: React.FC<Props> = ({ boardId }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <ListWrapper>
      {isEditing ? (
        <ListForm boardId={boardId} closeEditing={() => setIsEditing(false)} />
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          className={styles.listAddBtn}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add a list
        </Button>
      )}
    </ListWrapper>
  );
};
