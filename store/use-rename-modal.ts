import { create } from "zustand";
const defaultValues = { id: "", title: "" };

interface RenameModalProps {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

// using zutsand's way of handling state

export const useRenameModal = create<RenameModalProps>((set) => ({
  isOpen: false,
  onOpen: (id, title) =>
    set({
      isOpen: true,
      initialValues: { id, title }, // corrected typo here
    }),

  onClose: () =>
    // corrected typo here
    set({
      isOpen: false,
      initialValues: defaultValues, // corrected typo here
    }),
  initialValues: defaultValues,
}));
