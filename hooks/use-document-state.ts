import { create } from "zustand/react";

interface DocumentState {
  isDeleting: boolean;
}

interface DocumentActions {
  setIsDeleting: (isDeleting: boolean) => void;
}

type DocumentStore = DocumentState & DocumentActions;

export const useDocumentStore = create<DocumentStore>()((set) => ({
  isDeleting: false,
  setIsDeleting: (isDeleting) => {
    set({ isDeleting });
  },
}));
