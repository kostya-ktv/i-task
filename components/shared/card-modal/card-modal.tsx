"use client";
import { useCardModal } from "@/hooks/use-card-modal";
import { Dialog, DialogContent } from "@/components/ui";

export const CardModal = () => {
  const { id, isOpen, onClose } = useCardModal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent></DialogContent>
    </Dialog>
  );
};
