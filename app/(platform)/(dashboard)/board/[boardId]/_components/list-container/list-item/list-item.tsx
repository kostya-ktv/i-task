"use client";
import styles from "./list-item.module.scss";
import { ListHeader } from "./list-header";
import { ListWrapper } from "../list-wrapper";
import { useBoolean } from "usehooks-ts";
import { CardForm } from "../card/card-form";
import { ListWithCards } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CardItem } from "../card/card-item";
import { Draggable, Droppable } from "@hello-pangea/dnd";

interface Props {
  index: number;
  list: ListWithCards;
}
export const ListItem: React.FC<Props> = (props) => {
  const isEditing = useBoolean();

  const { list, index } = props;

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <ListWrapper ref={provided.innerRef} {...provided.draggableProps}>
          <div className={styles.listItemBox} {...provided.dragHandleProps}>
            <ListHeader onAddCard={isEditing.setTrue} list={list} />
            <Droppable droppableId={list.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(styles.cardList)}
                >
                  {list.cards.map((card, cardIndex) => (
                    <CardItem cardIndex={cardIndex} key={card.id} card={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              closeEditing={isEditing.setFalse}
              openEditing={isEditing.setTrue}
              isEditing={isEditing.value}
              listId={list.id}
              boardId={list.boardId}
            />
          </div>
        </ListWrapper>
      )}
    </Draggable>
  );
};
