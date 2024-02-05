import { Card } from "@prisma/client";
import styles from "./card.module.scss";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks";

interface Props {
  card: Card;
  cardIndex: number;
}
export const CardItem: React.FC<Props> = ({ card, cardIndex }) => {
  const cardModal = useCardModal();
  return (
    <Draggable draggableId={card.id} index={cardIndex}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(card.id)}
          className={styles.cardItem}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
};
