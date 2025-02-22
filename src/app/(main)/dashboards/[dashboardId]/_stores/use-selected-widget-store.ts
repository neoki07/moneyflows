import { create } from "zustand";

type SelectedWidgetStore = {
  selectedWidgetId: string | undefined;
  setSelectedWidgetId: (id: string | undefined) => void;
};

export const useSelectedWidgetStore = create<SelectedWidgetStore>((set) => ({
  selectedWidgetId: undefined,
  setSelectedWidgetId: (id) => set({ selectedWidgetId: id }),
}));
