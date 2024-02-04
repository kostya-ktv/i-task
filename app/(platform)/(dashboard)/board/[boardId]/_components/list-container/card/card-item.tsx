import { Card } from "@prisma/client";
import styles from "./card.module.scss";
import { Draggable } from "@hello-pangea/dnd";

interface Props {
  card: Card;
  cardIndex: number;
}
export const CardItem: React.FC<Props> = ({ card, cardIndex }) => {
  return (
    <Draggable draggableId={card.id} index={cardIndex}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          role="button"
          className={styles.cardItem}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
};
