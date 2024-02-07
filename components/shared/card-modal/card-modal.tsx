"use client";
import { useCardModal } from "@/hooks/use-card-modal";
import { Dialog, DialogContent } from "@/components/ui";
import { CardDetails } from "./card-details/card-details";

export const CardModal = () => {
  const { id, isOpen, onClose } = useCardModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        dialogClose={{ disabled: true }}
        className="w-[500px] min-h-[300px]"
      >
        {id ? <CardDetails cardId={id} /> : <p>No id provided</p>}
      </DialogContent>
    </Dialog>
  );
};
