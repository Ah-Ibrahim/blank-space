import { create } from "zustand";

interface CoverImageState {
  isOpen: boolean;
  url?: string;
}

interface CoverImageActions {
  onOpen: () => void;
  onClose: () => void;
  onReplaceUrl: (url: string) => void;
}

type CoverImageStore = CoverImageState & CoverImageActions;

export const useCoverImage = create<CoverImageStore>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),
  onReplaceUrl: (url) => {
    set({ isOpen: true, url });
  },
}));
