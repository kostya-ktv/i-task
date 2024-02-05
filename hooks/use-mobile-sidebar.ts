import { create } from "zustand";
interface IStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMobileSidebar = create<IStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
