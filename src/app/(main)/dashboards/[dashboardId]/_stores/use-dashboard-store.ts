import { GridStackOptions } from "gridstack";
import { create } from "zustand";

import { updateDashboard } from "../_actions/update-dashboard";

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
  startEditing: (initialState: { id: string; name: string }) => void;
  cancelEditing: () => void;
  updateDraftName: (name: string) => void;
  validate: () => boolean;
  save: () => Promise<void>;
}>;

export const useDashboardStore = create<DashboardState>((set, get) => ({
  dashboard: null,
  draft: null,
  isEditing: false,
  isDirty: false,
  errors: {},

  getCurrentLayout: undefined,
  setGetCurrentLayout: (fn) => set({ getCurrentLayout: fn }),

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

  save: async () => {
    const { draft, validate, getCurrentLayout } = get();
    if (!draft || !getCurrentLayout) return;

    if (!validate()) return;

    const currentLayout = getCurrentLayout();
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
  },
}));
