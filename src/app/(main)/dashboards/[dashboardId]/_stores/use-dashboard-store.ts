import { create } from "zustand";

import { getDashboard } from "../_actions/get-dashboard";
import { updateDashboard } from "../_actions/update-dashboard";

type Dashboard = Awaited<ReturnType<typeof getDashboard>>;

type DashboardState = Readonly<{
  dashboard: Dashboard | null;
  draft: Dashboard | null;
  isEditing: boolean;
  isDirty: boolean;
  errors: {
    name?: string;
  };
  setDashboard: (dashboard: Dashboard) => void;
  startEditing: () => void;
  cancelEditing: () => void;
  updateDraftName: (name: string) => void;
  updateDraftWidgets: (widgets: Dashboard["widgets"]) => void;
  resetDraft: () => void;
  validate: () => boolean;
  save: () => Promise<void>;
}>;

export const useDashboardStore = create<DashboardState>((set, get) => ({
  dashboard: null,
  draft: null,
  isEditing: false,
  isDirty: false,
  errors: {},

  setDashboard: (dashboard) => set({ dashboard }),

  startEditing: () => {
    const { dashboard } = get();
    if (!dashboard) return;

    set({
      isEditing: true,
      draft: { ...dashboard },
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

  updateDraftWidgets: (widgets) => {
    const { draft } = get();
    if (!draft) return;

    set({
      draft: { ...draft, widgets },
      isDirty: true,
    });
  },

  resetDraft: () => {
    const { dashboard } = get();
    if (!dashboard) return;

    set({
      draft: { ...dashboard },
      isDirty: false,
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
    const { draft, dashboard, validate } = get();
    if (!draft || !dashboard) return;

    if (!validate()) return;

    await updateDashboard({
      id: dashboard.id,
      name: draft.name,
      widgets: draft.widgets,
    });

    set({
      dashboard: draft,
      isEditing: false,
      draft: null,
      isDirty: false,
      errors: {},
    });
  },
}));
