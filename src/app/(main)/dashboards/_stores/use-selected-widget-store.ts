import { create } from "zustand";

type SelectedWidgetStore = {
  selectedWidgetId?: string;
  setSelectedWidgetId: (id: string | undefined) => void;
};

export const useSelectedWidgetStore = create<SelectedWidgetStore>((set) => ({
  setSelectedWidgetId: (id) => set({ selectedWidgetId: id }),
}));
