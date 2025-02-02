import { Transaction } from "./types";

export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    type: "income",
    amount: 280000,
    description: "1月給与",
    date: new Date("2024-01-25"),
    category: {
      id: "c1",
      name: "給与",
    },
    tags: [
      {
        id: "t1",
        name: "定期収入",
      },
      {
        id: "t2",
        name: "メイン収入",
      },
    ],
  },
  {
    id: "t2",
    type: "expense",
    amount: 85000,
    description: "1月家賃",
    date: new Date("2024-01-25"),
    category: {
      id: "c2",
      name: "住居費",
    },
    tags: [
      {
        id: "t3",
        name: "固定費",
      },
    ],
  },
  {
    id: "t3",
    type: "expense",
    amount: 12000,
    description: "電気代",
    date: new Date("2024-01-24"),
    category: {
      id: "c3",
      name: "光熱費",
    },
    tags: [
      {
        id: "t3",
        name: "固定費",
      },
    ],
  },
  {
    id: "t4",
    type: "expense",
    amount: 8500,
    description: "ガス代",
    date: new Date("2024-01-24"),
    category: {
      id: "c3",
      name: "光熱費",
    },
    tags: [
      {
        id: "t3",
        name: "固定費",
      },
    ],
  },
  {
    id: "t5",
    type: "expense",
    amount: 4500,
    description: "水道代",
    date: new Date("2024-01-24"),
    category: {
      id: "c3",
      name: "光熱費",
    },
    tags: [
      {
        id: "t3",
        name: "固定費",
      },
    ],
  },
  {
    id: "t6",
    type: "expense",
    amount: 5200,
    description: "携帯電話代",
    date: new Date("2024-01-23"),
    category: {
      id: "c4",
      name: "通信費",
    },
    tags: [
      {
        id: "t3",
        name: "固定費",
      },
    ],
  },
  {
    id: "t7",
    type: "expense",
    amount: 4800,
    description: "インターネット",
    date: new Date("2024-01-23"),
    category: {
      id: "c4",
      name: "通信費",
    },
    tags: [
      {
        id: "t3",
        name: "固定費",
      },
    ],
  },
  {
    id: "t8",
    type: "expense",
    amount: 12000,
    description: "食材（スーパー）",
    date: new Date("2024-01-22"),
    category: {
      id: "c5",
      name: "食費",
    },
    tags: [],
  },
  {
    id: "t9",
    type: "expense",
    amount: 3500,
    description: "ランチ",
    date: new Date("2024-01-22"),
    category: {
      id: "c5",
      name: "食費",
    },
    tags: [
      {
        id: "t10",
        name: "外食",
      },
    ],
  },
  {
    id: "t10",
    type: "expense",
    amount: 15000,
    description: "服",
    date: new Date("2024-01-21"),
    category: {
      id: "c6",
      name: "衣服",
    },
    tags: [
      {
        id: "t11",
        name: "買い物",
      },
    ],
  },
  {
    id: "t11",
    type: "income",
    amount: 50000,
    description: "副業収入",
    date: new Date("2024-01-20"),
    category: {
      id: "c7",
      name: "その他収入",
    },
    tags: [
      {
        id: "t12",
        name: "副業",
      },
    ],
  },
  {
    id: "t12",
    type: "expense",
    amount: 2500,
    description: "映画",
    date: new Date("2024-01-20"),
    category: {
      id: "c8",
      name: "娯楽",
    },
    tags: [
      {
        id: "t13",
        name: "趣味",
      },
    ],
  },
  {
    id: "t13",
    type: "expense",
    amount: 4500,
    description: "本",
    date: new Date("2024-01-19"),
    category: {
      id: "c8",
      name: "娯楽",
    },
    tags: [
      {
        id: "t13",
        name: "趣味",
      },
    ],
  },
  {
    id: "t14",
    type: "expense",
    amount: 3000,
    description: "ジム会費",
    date: new Date("2024-01-19"),
    category: {
      id: "c9",
      name: "健康",
    },
    tags: [
      {
        id: "t3",
        name: "固定費",
      },
    ],
  },
  {
    id: "t15",
    type: "expense",
    amount: 8000,
    description: "美容院",
    date: new Date("2024-01-18"),
    category: {
      id: "c10",
      name: "美容",
    },
    tags: [
      {
        id: "t16",
        name: "生活費",
      },
      {
        id: "t17",
        name: "月次",
      },
      {
        id: "t18",
        name: "自己投資",
      },
    ],
  },
  {
    id: "t16",
    type: "expense",
    amount: 6500,
    description: "飲み会",
    date: new Date("2024-01-18"),
    category: {
      id: "c11",
      name: "交際費",
    },
    tags: [
      {
        id: "t16",
        name: "生活費",
      },
    ],
  },
  {
    id: "t17",
    type: "expense",
    amount: 2800,
    description: "文房具",
    date: new Date("2024-01-17"),
    category: {
      id: "c12",
      name: "日用品",
    },
    tags: [
      {
        id: "t19",
        name: "仕事",
      },
    ],
  },
  {
    id: "t18",
    type: "expense",
    amount: 1500,
    description: "コーヒー",
    date: new Date("2024-01-17"),
    category: {
      id: "c5",
      name: "食費",
    },
    tags: [
      {
        id: "t20",
        name: "カフェ",
      },
    ],
  },
  {
    id: "t19",
    type: "expense",
    amount: 35000,
    description: "英会話スクール",
    date: new Date("2024-01-16"),
    category: {
      id: "c13",
      name: "教育",
    },
    tags: [
      {
        id: "t18",
        name: "自己投資",
      },
    ],
  },
  {
    id: "t20",
    type: "income",
    amount: 30000,
    description: "株式配当",
    date: new Date("2024-01-16"),
    category: {
      id: "c14",
      name: "投資収入",
    },
    tags: [
      {
        id: "t21",
        name: "配当",
      },
    ],
  },
  {
    id: "t21",
    type: "expense",
    amount: 4200,
    description: "ヘアケア用品",
    date: new Date("2024-01-15"),
    category: {
      id: "c10",
      name: "美容",
    },
    tags: [
      {
        id: "t22",
        name: "日用品",
      },
    ],
  },
  {
    id: "t22",
    type: "expense",
    amount: 7500,
    description: "友人への誕生日プレゼント",
    date: new Date("2024-01-15"),
    category: {
      id: "c11",
      name: "交際費",
    },
    tags: [
      {
        id: "t23",
        name: "プレゼント",
      },
    ],
  },
  {
    id: "t23",
    type: "expense",
    amount: 9800,
    description: "サプリメント",
    date: new Date("2024-01-14"),
    category: {
      id: "c9",
      name: "健康",
    },
    tags: [
      {
        id: "t22",
        name: "日用品",
      },
    ],
  },
  {
    id: "t24",
    type: "expense",
    amount: 2000,
    description: "駐輪場代",
    date: new Date("2024-01-14"),
    category: {
      id: "c15",
      name: "交通費",
    },
    tags: [
      {
        id: "t3",
        name: "固定費",
      },
    ],
  },
  {
    id: "t25",
    type: "expense",
    amount: 4500,
    description: "映画とポップコーン",
    date: new Date("2024-01-13"),
    category: {
      id: "c8",
      name: "娯楽",
    },
    tags: [
      {
        id: "t13",
        name: "趣味",
      },
    ],
  },
  {
    id: "t26",
    type: "expense",
    amount: 13000,
    description: "靴",
    date: new Date("2024-01-13"),
    category: {
      id: "c6",
      name: "衣服",
    },
    tags: [
      {
        id: "t11",
        name: "買い物",
      },
    ],
  },
  {
    id: "t27",
    type: "income",
    amount: 10000,
    description: "フリマアプリ売上",
    date: new Date("2024-01-12"),
    category: {
      id: "c7",
      name: "その他収入",
    },
    tags: [
      {
        id: "t12",
        name: "副業",
      },
    ],
  },
  {
    id: "t28",
    type: "expense",
    amount: 5600,
    description: "洗剤・掃除用品",
    date: new Date("2024-01-12"),
    category: {
      id: "c12",
      name: "日用品",
    },
    tags: [
      {
        id: "t16",
        name: "生活費",
      },
    ],
  },
  {
    id: "t29",
    type: "expense",
    amount: 3200,
    description: "ペット用品",
    date: new Date("2024-01-11"),
    category: {
      id: "c16",
      name: "ペット",
    },
    tags: [
      {
        id: "t16",
        name: "生活費",
      },
    ],
  },
  {
    id: "t30",
    type: "expense",
    amount: 4800,
    description: "音楽サブスク年間契約",
    date: new Date("2024-01-11"),
    category: {
      id: "c8",
      name: "娯楽",
    },
    tags: [
      {
        id: "t3",
        name: "固定費",
      },
      {
        id: "t24",
        name: "サブスク",
      },
      {
        id: "t13",
        name: "趣味",
      },
    ],
  },
];
