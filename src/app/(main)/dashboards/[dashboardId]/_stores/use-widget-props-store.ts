import { create } from "zustand";

type WidgetPropsStore = {
  allWidgetProps: Record<string, object>;
  getWidgetProps: (widgetId: string) => object | undefined;
  setWidgetProps: (widgetId: string, props: object) => void;
};

export const useWidgetPropsStore = create<WidgetPropsStore>((set, get) => ({
  allWidgetProps: {},
  getWidgetProps: (widgetId) => get().allWidgetProps[widgetId],
  setWidgetProps: (widgetId, props) => {
    set({
      allWidgetProps: {
        ...get().allWidgetProps,
        [widgetId]: props,
      },
    });
  },
}));
