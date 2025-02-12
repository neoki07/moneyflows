"use client";

import { IconBolt } from "@tabler/icons-react";

import {
  FormErrorMessage,
  FormField,
  FormLabel,
} from "@/components/ui/form-conform";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { useDashboardStore } from "../_stores/use-dashboard-store";

export function EditDashboardPanel() {
  const { draft, errors, updateDraftName } = useDashboardStore();
  if (!draft) return null;

  return (
    <div className="min-h-screen w-80 space-y-3 border-l bg-white py-8">
      <h2 className="px-4 text-lg font-bold">ダッシュボードの編集</h2>
      <div className="space-y-5">
        <div className="px-4">
          <FormField>
            <div className="flex items-center gap-1">
              <FormLabel required>ダッシュボード名</FormLabel>
            </div>
            <Input
              value={draft.name}
              onChange={(e) => updateDraftName(e.target.value)}
              aria-invalid={!!errors.name}
            />
            {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
          </FormField>
        </div>
        <Separator />
        <div className="space-y-2">
          <h3 className="px-4 text-base font-bold">
            選択されたウィジェットの編集
          </h3>
          <div className="mx-4 rounded-md border border-yellow-200 bg-yellow-50 px-3 py-2 text-sm">
            <div className="flex items-center gap-1.5 font-medium text-yellow-800">
              <IconBolt size={16} className="text-yellow-600" />
              開発中の機能
            </div>
            <p className="mt-1 text-yellow-700">
              選択されたウィジェットの編集機能は、現在開発中です
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
