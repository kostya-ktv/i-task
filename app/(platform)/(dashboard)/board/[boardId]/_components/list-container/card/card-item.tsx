import { Card } from "@prisma/client";
import styles from "./card.module.scss";

interface Props {
  card: Card;
  cardIndex: number;
}
export const CardItem: React.FC<Props> = ({ card, cardIndex }) => {
  return (
    <div role="button" className={styles.cardItem}>
      {card.title}
    </div>
  );
};
