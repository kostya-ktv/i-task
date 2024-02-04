"use client";
import { List } from "@prisma/client";
import styles from "./list-item.module.scss";
import { ListHeader } from "./list-header";
import { ListWrapper } from "../list-wrapper";
import { ElementRef, useRef } from "react";
import { useBoolean } from "usehooks-ts";
import { CardForm } from "../card/card-form";

interface Props {
  index: number;
  list: List;
}
export const ListItem: React.FC<Props> = (props) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const isEditing = useBoolean();

  const { list, index } = props;
  return (
    <ListWrapper>
      <div className={styles.listItemBox}>
        <ListHeader onAddCard={isEditing.setTrue} list={list} />
        <CardForm
          ref={textareaRef}
          closeEditing={isEditing.setFalse}
          openEditing={isEditing.setTrue}
          isEditing={isEditing.value}
          listId={list.id}
          boardId={list.boardId}
        />
      </div>
    </ListWrapper>
  );
};
