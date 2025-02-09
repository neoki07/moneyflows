import { GridStackOptions, GridStackWidget } from "gridstack";
import { create } from "zustand";

import { updateDashboard } from "../_actions/update-dashboard";

type SaveOptions = {
  onSuccess?: () => void;
};

type DashboardState = Readonly<{
  draft: {
    id: string;
    name: string;
  } | null;
  isEditing: boolean;
  isDirty: boolean;
  errors: {
    name?: string;
  };
  getCurrentLayout?: () => GridStackOptions;
  setGetCurrentLayout: (fn: () => GridStackOptions) => void;
  getCurrentWidgets?: () => GridStackWidget[];
  setGetCurrentWidgets: (fn: () => GridStackWidget[]) => void;

  startEditing: (initialState: { id: string; name: string }) => void;
  cancelEditing: () => void;
  updateDraftName: (name: string) => void;
  validate: () => boolean;
  save: (options?: SaveOptions) => Promise<void>;
}>;

export const useDashboardStore = create<DashboardState>((set, get) => ({
  dashboard: null,
  draft: null,
  isEditing: false,
  isDirty: false,
  errors: {},

  getCurrentLayout: undefined,
  setGetCurrentLayout: (fn) => set({ getCurrentLayout: fn }),

  getCurrentWidgets: undefined,
  setGetCurrentWidgets: (fn) => set({ getCurrentWidgets: fn }),

  startEditing: (initialState) => {
    set({
      isEditing: true,
      draft: { id: initialState.id, name: initialState.name },
      isDirty: false,
    });
  },

  cancelEditing: () => {
    set({
      isEditing: false,
      draft: null,
      isDirty: false,
      errors: {},
    });
  },

  updateDraftName: (name) => {
    const { draft } = get();
    if (!draft) return;

    set({
      draft: { ...draft, name },
      isDirty: true,
    });
  },

  validate: () => {
    const { draft } = get();
    const errors: { name?: string } = {};

    if (!draft?.name.trim()) {
      errors.name = "ダッシュボード名を入力してください";
    }

    set({ errors });
    return Object.keys(errors).length === 0;
  },

  save: async (options) => {
    const { draft, validate, getCurrentLayout } = get();
    if (!draft || !getCurrentLayout) return;

    if (!validate()) return;

    const currentLayout = getCurrentLayout();

    try {
      await updateDashboard({
        id: draft.id,
        name: draft.name,
        widgets: currentLayout.children ?? [],
      });

      set({
        isEditing: false,
        draft: null,
        isDirty: false,
        errors: {},
      });

      options?.onSuccess?.();
    } catch {
      set({
        errors: { name: "このダッシュボード名は既に使用されています" },
      });
    }
  },
}));
