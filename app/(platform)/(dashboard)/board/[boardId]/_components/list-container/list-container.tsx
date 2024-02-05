"use client";
import styles from "./list-container.module.scss";
import { ListWithCards } from "@/lib/types";
import { NewList } from "./new-list/new-list";
import { useCallback, useEffect, useState } from "react";
import { ListItem } from "./list-item/list-item";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { ListContainerUtil } from "./list-container.util";
import { DragDropUtil } from "@/lib/dnd";
import { updateListOrder } from "@/actions/list/update-list-order";
import { Board } from "@prisma/client";

interface Props {
  data: ListWithCards[];
  boardId: Board["id"];
}
export const ListContainer: React.FC<Props> = (props) => {
  const { data, boardId } = props;
  const [orderedData, setOrderedData] = useState<ListWithCards[]>([]);

  const handleDragEnd = useCallback(
    async (e: DropResult) => {
      console.log(orderedData);
      const dragResult = ListContainerUtil.onDragEnd(e, orderedData);

      if (dragResult) {
        setOrderedData(dragResult);
        console.log(dragResult);
        await updateListOrder({ boardId, items: dragResult });
      }
    },
    [orderedData, boardId]
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
