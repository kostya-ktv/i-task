import { Board } from "@prisma/client";
import styles from "./list-container.module.scss";
import { ListWithCards } from "@/lib/types";
import { ListWrapper } from "./list-wrapper";

interface Props {
  boardId: Board["id"];
  data: ListWithCards[];
}
export const ListContainer: React.FC<Props> = (props) => {
  const { boardId, data } = props;
  return (
    <ol className={styles.listContainer}>
      <ListWrapper boardId={boardId} />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
