"use client";
import { List } from "@prisma/client";
import styles from "./list-item.module.scss";
import { ListEditableHeader } from "./list-editable-header";
import { Button } from "@/components/ui";
import { MoreVerticalIcon } from "lucide-react";
import { ListOptions } from "@/components/widgets";

interface Props {
  data: List;
}
export const ListHeader: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.listHeader}>
      <ListEditableHeader data={data} />
      <ListOptions list={data} onAddCard={() => {}}>
        <Button size="icon" className="h-auto w-auto" variant="ghost">
          <MoreVerticalIcon className="w-4 h-4" />
        </Button>
      </ListOptions>
    </div>
  );
};
