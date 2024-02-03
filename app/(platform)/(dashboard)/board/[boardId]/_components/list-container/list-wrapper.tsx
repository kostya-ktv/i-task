"use client";
import { useState } from "react";
import styles from "./list-container.module.scss";
import { ListForm } from "./list-form";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui";
import { Board } from "@prisma/client";

export const ListWrapper: React.FC<{ boardId: Board["id"] }> = ({
  boardId,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className={styles.listWrapper}>
      {isEditing ? (
        <ListForm boardId={boardId} closeEditing={() => setIsEditing(false)} />
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          className={styles.listAddBtn}
        >
          Add a list <PlusIcon className="h-4 w-4 mr-2" />
        </Button>
      )}
    </div>
  );
};
