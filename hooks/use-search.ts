import { create } from "zustand";

interface SearchState {
  isOpen: boolean;
}

interface SearchActions {
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

type SearchStore = SearchState & SearchActions;

export const useSearchStore = create<SearchStore>()((set) => ({
  isOpen: false,
  onOpen: () => {
    set(() => ({ isOpen: true }));
  },
  onClose: () => {
    set(() => ({ isOpen: false }));
  },
  onToggle: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
}));
