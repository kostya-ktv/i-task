"use client";
import { Button } from "@/components/ui";
import styles from "./card.module.scss";
import { CopyIcon, TrashIcon } from "lucide-react";
import { useCardModal } from "@/hooks";
import { CardWithList } from "@/lib/types";
import { copyCard, deleteCard } from "@/actions/card/";
import { useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useBoolean } from "usehooks-ts";

interface CardActionsProps {
  card: CardWithList;
}
export const CardActions: React.FC<CardActionsProps> = ({ card }) => {
  const { onClose } = useCardModal();
  const isLoading = useBoolean();
  const { toast } = useToast();
  const handleDeleteCard = useCallback(async () => {
    isLoading.setTrue();
    await deleteCard({
      boardId: card.list.boardId,
      cardId: card.id,
      listId: card.listId,
    })
      .then(() => {
        toast({
          title: "Deleted",
          description: `Card: ${card.title}`,
        });
        onClose();
      })
      .catch((err) => console.error(err))
      .finally(() => isLoading.setFalse());
  }, [card, onClose, toast, isLoading]);
  
  const handleCopyCard = useCallback(async () => {
    isLoading.setTrue();
    await copyCard({
      boardId: card.list.boardId,
      cardId: card.id,
      listId: card.listId,
    })
      .then(() => {
        toast({
          title: "Copied",
          description: `Card: ${card.title}`,
        });
      })
      .catch((err) => console.error(err))
      .finally(() => isLoading.setFalse());
  }, [card, toast, isLoading]);

  return (
    <div className={styles.cardActionsBox}>
      <Button
        type="button"
        size="sm"
        onClick={() => handleCopyCard()}
        disabled={isLoading.value}
        className={styles.cardActionsBtn}
        variant="outline"
      >
        <CopyIcon className={styles.cardActionsIcon} />
        Copy
      </Button>
      <Button
        size="sm"
        onClick={() => handleDeleteCard()}
        type="button"
        disabled={isLoading.value}
        className={styles.cardActionsBtn}
        variant="outline"
      >
        <TrashIcon className={styles.cardActionsIcon} />
        Delete
      </Button>
    </div>
  );
};
