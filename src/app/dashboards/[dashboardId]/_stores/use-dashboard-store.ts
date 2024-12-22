import { create } from "zustand";

type DashboardState = Readonly<{
  isEditing: boolean;
  startEditing: () => void;
  endEditing: () => void;
}>;

export const useDashboardStore = create<DashboardState>((set) => ({
  isEditing: false,
  startEditing: () => set({ isEditing: true }),
  endEditing: () => set({ isEditing: false }),
}));
