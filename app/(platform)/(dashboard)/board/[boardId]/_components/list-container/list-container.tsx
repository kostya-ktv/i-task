"use client";
import styles from "./list-container.module.scss";
import { ListWithCards } from "@/lib/types";
import { NewList } from "./new-list/new-list";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item/list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

interface Props {
  data: ListWithCards[];
}
export const ListContainer: React.FC<Props> = (props) => {
  const { data } = props;
  const [orderedData, setOrderedData] = useState<ListWithCards[]>([]);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.listContainer}
          >
            {orderedData.map((list, listIndex) => (
              <ListItem key={list.id} index={listIndex} list={list} />
            ))}
            {provided.placeholder}
            <NewList />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
