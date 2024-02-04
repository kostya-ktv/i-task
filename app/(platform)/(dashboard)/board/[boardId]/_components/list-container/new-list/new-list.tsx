"use client";
import { useState } from "react";
import styles from "./new-list.module.scss";
import { ListForm } from "./list-form";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui";
import { ListWrapper } from "../list-wrapper";

export const NewList = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <ListWrapper>
      {isEditing ? (
        <ListForm closeEditing={() => setIsEditing(false)} />
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
