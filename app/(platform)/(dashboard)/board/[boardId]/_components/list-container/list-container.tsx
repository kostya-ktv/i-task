"use client";
import { Board } from "@prisma/client";
import styles from "./list-container.module.scss";
import { ListWithCards } from "@/lib/types";
import { NewList } from "./new-list/new-list";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item/list-item";
import { ListWrapper } from "./list-wrapper";
import { Button, Skeleton } from "@/components/ui";

interface Props {
  boardId: Board["id"];
  data: ListWithCards[];
}
export const ListContainer: React.FC<Props> = (props) => {
  const { boardId, data } = props;
  const [orderedData, setOrderedData] = useState<ListWithCards[]>(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <section className={styles.listContainer}>
      {orderedData.map((list, listIndex) => (
        <ListItem key={list.id} index={listIndex} data={list} />
      ))}
      <NewList boardId={boardId} />
      <div className="flex-shrink-0 w-1" />
    </section>
  );
};

