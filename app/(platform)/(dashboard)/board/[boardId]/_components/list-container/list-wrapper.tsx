"use client";
import { useState } from "react";
import styles from "./list-container.module.scss";
import { ListForm } from "./list-form";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui";

export const ListWrapper = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  return (
    <div className={styles.listWrapper}>
      {isEditing ? (
        <ListForm closeEditing={() => setIsEditing(false)} />
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
