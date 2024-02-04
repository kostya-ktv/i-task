import { List } from "@prisma/client";
import styles from "./list-item.module.scss";
import { ListEditableHeader } from "./list-editable-header";
import { Button } from "@/components/ui";
import { MoreVerticalIcon } from "lucide-react";
import { ListOptions } from "@/components/widgets";

interface Props {
  list: List;
  onAddCard: () => void;
}
export const ListHeader: React.FC<Props> = ({ list, onAddCard }) => {
  return (
    <div className={styles.listHeader}>
      <ListEditableHeader list={list} />
      <ListOptions list={list} onAddCard={() => {}}>
        <Button size="icon" className="h-auto w-auto" variant="ghost">
          <MoreVerticalIcon className="w-4 h-4" />
        </Button>
      </ListOptions>
    </div>
  );
};
