import { GridStackWidget } from "gridstack";
import { create } from "zustand";

import { getDashboard } from "../_actions/get-dashboard";
import { updateDashboard } from "../_actions/update-dashboard";

type Dashboard = Awaited<ReturnType<typeof getDashboard>>;

type DashboardState = Readonly<{
  dashboard: Dashboard | null;
  draft: {
    name: string;
  } | null;
  isEditing: boolean;
  isDirty: boolean;
  errors: {
    name?: string;
  };
  getCurrentLayout?: () => GridStackWidget[];
  setGetCurrentLayout: (fn: () => GridStackWidget[]) => void;
  setDashboard: (dashboard: Dashboard) => void;
  startEditing: () => void;
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

  setDashboard: (dashboard) => set({ dashboard }),

  startEditing: () => {
    const { dashboard } = get();
    if (!dashboard) return;

    set({
      isEditing: true,
      draft: { name: dashboard.name },
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
    const { draft, dashboard, validate, getCurrentLayout } = get();
    if (!draft || !dashboard || !getCurrentLayout) return;

    if (!validate()) return;

    const currentLayout = getCurrentLayout();
    await updateDashboard({
      id: dashboard.id,
      name: draft.name,
      widgets: currentLayout,
    });

    set({
      dashboard: {
        ...dashboard,
        name: draft.name,
        widgets: currentLayout,
      },
      isEditing: false,
      draft: null,
      isDirty: false,
      errors: {},
    });
  },
}));
