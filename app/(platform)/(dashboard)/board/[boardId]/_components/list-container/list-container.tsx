"use client";
import styles from "./list-container.module.scss";
import { ListWithCards } from "@/lib/types";
import { NewList } from "./new-list/new-list";
import { useCallback, useEffect, useState } from "react";
import { ListItem } from "./list-item/list-item";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { ListContainerUtil } from "./list-container.util";
import { DragDropUtil } from "@/lib/dnd";

interface Props {
  data: ListWithCards[];
}
export const ListContainer: React.FC<Props> = (props) => {
  const { data } = props;
  const [orderedData, setOrderedData] = useState<ListWithCards[]>([]);

  const handleDragEnd = useCallback(
    (e: DropResult) => {
      ListContainerUtil.onDragEnd(e, orderedData, setOrderedData);
    },
    [orderedData]
  );

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId={DragDropUtil.DroppableId.lists}
        type={DragDropUtil.Type.list}
        direction="horizontal"
      >
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
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
