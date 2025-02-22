import { IconBolt } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import {
  FormErrorMessage,
  FormField,
  FormLabel,
} from "@/components/ui/form-conform";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/hono";

import { useDashboardStore } from "../_stores/use-dashboard-store";
import { useSelectedWidgetStore } from "../_stores/use-selected-widget-store";
import { useWidgetPropsStore } from "../_stores/use-widget-props-store";

type Category = {
  id: string;
  name: string;
  type: "income" | "expense";
};

export function EditDashboardPanel() {
  const { draft, errors, updateDraftName } = useDashboardStore();
  const { selectedWidgetId } = useSelectedWidgetStore();
  const { getWidgetProps, setWidgetProps } = useWidgetPropsStore();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.categories.$get({ query: {} });
      if (!response.ok) return;
      const data = await response.json();
      setCategories(data.categories);
    };
    fetchCategories();
  }, []);

  if (!draft) return null;

  // const widgetType = "balance-chart"; TODO: Implement this
  const widgetProps = selectedWidgetId
    ? getWidgetProps(selectedWidgetId)
    : undefined;

  const incomeCategories = categories.filter((c) => c.type === "income");
  const expenseCategories = categories.filter((c) => c.type === "expense");

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

        <div className="px-4">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <IconBolt size={16} />
            <p>
              ウィジェットをドラッグ＆ドロップで移動・リサイズできます。
              <br />
              ウィジェットをクリックすると設定を変更できます。
            </p>
          </div>
        </div>

        {selectedWidgetId && widgetProps && (
          <>
            <Separator />

            <div className="space-y-4 px-4">
              <h3 className="font-medium">ウィジェットの設定</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>収入カテゴリー</Label>
                  <MultiSelect
                    options={incomeCategories.map((category) => ({
                      value: category.id,
                      label: category.name,
                    }))}
                    value={
                      (widgetProps as { incomeCategories: string[] })
                        ?.incomeCategories
                    }
                    onChange={(value) => {
                      setWidgetProps(selectedWidgetId, {
                        ...widgetProps,
                        incomeCategories: value,
                      });
                    }}
                    placeholder="すべて"
                  />
                </div>

                <div className="space-y-2">
                  <Label>支出カテゴリー</Label>
                  <MultiSelect
                    options={expenseCategories.map((category) => ({
                      value: category.id,
                      label: category.name,
                    }))}
                    value={
                      (widgetProps as { expenseCategories: string[] })
                        .expenseCategories
                    }
                    onChange={(value) => {
                      setWidgetProps(selectedWidgetId, {
                        ...widgetProps,
                        expenseCategories: value,
                      });
                    }}
                    placeholder="すべて"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
