import { create } from "zustand/react";

interface SettingsState {
  isOpen: boolean;
}

interface SettingsActions {
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

type SettingsStore = SettingsState & SettingsActions;

export const useSettingsStore = create<SettingsStore>()((set) => ({
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
