import mockData from "../../data/mock-metrics.json";

export type MetricKey = keyof typeof mockData.metrics;

export type MetricSection = "Сервис" | "Логистика" | "Инфраструктура";

export type MetricRow = {
  month: number;
  "2024": number;
  "2025": number;
  "2026": number | null;
  target: number;
};

export type MetricDefinition = {
  key: MetricKey;
  name: string;
  unit: string;
  higherIsBetter: boolean;
  target2026: number;
  rows: MetricRow[];
  currentValue: number;
  currentMonth: number;
};

const SECTIONS: { section: MetricSection; keys: MetricKey[] }[] = [
  { section: "Сервис", keys: ["sl_frov", "sl_ne_frov"] as MetricKey[] },
  {
    section: "Логистика",
    keys: [
      "slt_postavshik_hab",
      "slt_hab_rc",
      "sredniy_lt",
      "std_lt",
    ] as MetricKey[],
  },
  {
    section: "Инфраструктура",
    keys: ["oborachivaemost", "utilizatsiya"] as MetricKey[],
  },
];

function buildRows(metric: (typeof mockData.metrics)[MetricKey]): MetricRow[] {
  const rows: MetricRow[] = [];
  for (let i = 0; i < 12; i++) {
    rows.push({
      month: i + 1,
      "2024": metric.series["2024"][i],
      "2025": metric.series["2025"][i],
      "2026": i < metric.series["2026"].length ? metric.series["2026"][i] : null,
      target: metric.series["Цель 2026"][i],
    });
  }
  return rows;
}

function buildDefinition(key: MetricKey): MetricDefinition {
  const metric = mockData.metrics[key];
  const rows = buildRows(metric);
  const currentMonth = metric.series["2026"].length;
  const currentValue = metric.series["2026"][currentMonth - 1];

  return {
    key,
    name: metric.name,
    unit: metric.unit,
    higherIsBetter: metric.higherIsBetter,
    target2026: metric.target2026,
    rows,
    currentValue,
    currentMonth,
  };
}

export type MetricSectionGroup = {
  section: MetricSection;
  metrics: MetricDefinition[];
};

export function getMetricsBySection(): MetricSectionGroup[] {
  return SECTIONS.map(({ section, keys }) => ({
    section,
    metrics: keys.map(buildDefinition),
  }));
}

export const MONTH_LABELS = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
];
