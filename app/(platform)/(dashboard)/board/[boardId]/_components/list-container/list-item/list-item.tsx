import { List } from "@prisma/client";
import styles from "./list-item.module.scss"
import { ListHeader } from "./list-header";
import { ListWrapper } from "../list-wrapper";

interface Props {
  index: number;
  data: List;
}
export const ListItem: React.FC<Props> = (props) => {
  const { data, index } = props;
  return (
    <ListWrapper>
      <div className={styles.listItemBox}>
        <ListHeader data={data} />
      </div>
    </ListWrapper>
  );
};
