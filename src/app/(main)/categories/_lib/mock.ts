import { createId } from "@paralleldrive/cuid2";

import { ExpenseCategory, IncomeCategory } from "./types";

export const mockIncomeCategories: IncomeCategory[] = [
  {
    id: createId(),
    name: "給与",
    type: "income",
  },
  {
    id: createId(),
    name: "副業",
    type: "income",
  },
  {
    id: createId(),
    name: "投資",
    type: "income",
  },
  {
    id: createId(),
    name: "配当",
    type: "income",
  },
  {
    id: createId(),
    name: "臨時収入",
    type: "income",
  },
];

export const mockExpenseCategories: ExpenseCategory[] = [
  {
    id: createId(),
    name: "食費",
    type: "expense",
  },
  {
    id: createId(),
    name: "交通費",
    type: "expense",
  },
  {
    id: createId(),
    name: "住居費",
    type: "expense",
  },
  {
    id: createId(),
    name: "光熱費",
    type: "expense",
  },
  {
    id: createId(),
    name: "通信費",
    type: "expense",
  },
  {
    id: createId(),
    name: "娯楽費",
    type: "expense",
  },
  {
    id: createId(),
    name: "教育費",
    type: "expense",
  },
  {
    id: createId(),
    name: "医療費",
    type: "expense",
  },
  {
    id: createId(),
    name: "衣服費",
    type: "expense",
  },
  {
    id: createId(),
    name: "美容費",
    type: "expense",
  },
];

export const mockCategories = {
  income: mockIncomeCategories,
  expense: mockExpenseCategories,
};
