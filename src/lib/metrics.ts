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

export type MetricContent = {
  description: string;
  methodology: {
    formula: string;
    source: string;
    frequency: string;
    note: string;
  };
};

export const METRIC_CONTENT: Record<MetricKey, MetricContent> = {
  sl_frov: {
    description:
      "Доля заказов по категории ФРОВ, выполненных поставщиками в срок и в полном объёме. Рассчитывается как отношение числа корректно и своевременно исполненных заказов к общему числу заказов за период, в %.",
    methodology: {
      formula:
        "SL = (число заказов ФРОВ, доставленных в срок и в полном объёме) / (общее число заказов ФРОВ за период) × 100%",
      source: "Система управления заказами и TMS — факт доставки сверяется с плановой датой и заявленным объёмом.",
      frequency: "Рассчитывается ежедневно, агрегируется помесячно нарастающим итогом.",
      note: "Заказ считается выполненным (OTIF), если отклонение по объёму не превышает согласованный допуск и доставка произошла в пределах планового окна.",
    },
  },
  sl_ne_frov: {
    description:
      "Доля заказов по прочим (не-ФРОВ) категориям товаров, выполненных поставщиками в срок и в полном объёме. Считается аналогично SL ФРОВ — отношение корректно исполненных заказов к общему количеству заказов за период.",
    methodology: {
      formula:
        "SL = (число заказов не-ФРОВ, доставленных в срок и в полном объёме) / (общее число заказов не-ФРОВ за период) × 100%",
      source: "Система управления заказами и TMS — факт доставки сверяется с плановой датой и заявленным объёмом.",
      frequency: "Рассчитывается ежедневно, агрегируется помесячно нарастающим итогом.",
      note: "Методология идентична SL ФРОВ, но выборка заказов ограничена всеми категориями, кроме ФРОВ.",
    },
  },
  slt_postavshik_hab: {
    description:
      "Доля поставок на участке «поставщик — ХАБ», доехавших в пределах согласованного транспортного окна. Рассчитывается как отношение поставок, уложившихся в плановый срок этого плеча, к общему числу поставок за период.",
    methodology: {
      formula:
        "SLT = (число поставок «поставщик→ХАБ» в пределах планового окна) / (общее число поставок на этом плече) × 100%",
      source: "TMS/WMS — данные по фактическому времени прибытия транспорта на ХАБ.",
      frequency: "Ежедневный расчёт, агрегация помесячно.",
      note: "Плановое окно определяется договорным SLA с перевозчиком/поставщиком.",
    },
  },
  slt_hab_rc: {
    description:
      "Доля поставок на участке «ХАБ — распределительный центр», доехавших в пределах планового транспортного окна. Рассчитывается аналогично SLT (Поставщик-ХАБ), но по следующему плечу цепочки.",
    methodology: {
      formula:
        "SLT = (число поставок «ХАБ→РЦ» в пределах планового окна) / (общее число поставок на этом плече) × 100%",
      source: "TMS/WMS — данные по фактическому времени прибытия транспорта на распределительный центр.",
      frequency: "Ежедневный расчёт, агрегация помесячно.",
      note: "Плановое окно определяется внутренним нормативом транспортного плеча «ХАБ — РЦ».",
    },
  },
  oborachivaemost: {
    description:
      "Показывает, за сколько дней в среднем оборачивается товарный запас на складе — от поступления до продажи/отгрузки. Рассчитывается как отношение среднего остатка на складе к среднедневной реализации, в днях.",
    methodology: {
      formula: "Оборачиваемость (дни) = Средний остаток на складе за период / Среднедневная реализация за период",
      source: "WMS (остатки) и система продаж/отгрузок (реализация).",
      frequency: "Рассчитывается на конец каждого дня, показатель за месяц — среднее по дням.",
      note: "Чем меньше значение, тем быстрее товар проходит через склад.",
    },
  },
  sredniy_lt: {
    description:
      "Средний срок выполнения заказа — от размещения заявки поставщику до фактического поступления товара. Рассчитывается как среднее арифметическое фактического времени исполнения по всем заказам за период, в днях.",
    methodology: {
      formula:
        "Средний LT = Σ (дата фактического поступления − дата размещения заказа) / количество заказов за период",
      source: "Система управления заказами — даты размещения и приёмки.",
      frequency: "Рассчитывается по каждому закрытому заказу, агрегируется помесячно (среднее).",
      note: "Учитываются только исполненные заказы; отменённые и незавершённые в расчёт не входят.",
    },
  },
  std_lt: {
    description:
      "Разброс (нестабильность) сроков поставки вокруг среднего Lead Time; чем меньше значение, тем предсказуемее цепочка поставок. Рассчитывается как стандартное отклонение фактического времени исполнения заказов за период, в днях.",
    methodology: {
      formula: "STD LT = стандартное отклонение фактического Lead Time по всем заказам за период",
      source: "Система управления заказами — та же выборка заказов, что и для Среднего LT.",
      frequency: "Рассчитывается помесячно по накопленной выборке заказов за месяц.",
      note: "Высокое значение говорит о нестабильности сроков поставки даже при приемлемом среднем LT.",
    },
  },
  utilizatsiya: {
    description:
      "Насколько эффективно используются складские и транспортные мощности (площади, техника, персонал) относительно доступной ёмкости. Рассчитывается как отношение фактически задействованной мощности к максимально доступной за период, в %.",
    methodology: {
      formula:
        "Утилизация = Фактически задействованная мощность / Максимально доступная мощность за период × 100%",
      source: "WMS и системы учёта ресурсов (техника, персонал).",
      frequency: "Рассчитывается по дням, показатель за месяц — среднее по дням периода.",
      note: "Рассматривается в связке с показателями сервиса — рост утилизации не должен снижать SL/SLT.",
    },
  },
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

export function getAllMetricKeys(): MetricKey[] {
  return SECTIONS.flatMap(({ keys }) => keys);
}

export function getMetricByKey(key: MetricKey): MetricDefinition {
  return buildDefinition(key);
}

export function getSectionForKey(key: MetricKey): MetricSection {
  const found = SECTIONS.find(({ keys }) => keys.includes(key));
  if (!found) throw new Error(`Unknown metric key: ${key}`);
  return found.section;
}

export function formatMetricValue(value: number, unit: string) {
  const formatted = Number.isInteger(value) ? value.toString() : value.toFixed(1);
  return unit === "%" ? `${formatted}%` : `${formatted} ${unit}`;
}

export function getTargetStatus(metric: MetricDefinition) {
  const achieved = metric.higherIsBetter
    ? metric.currentValue >= metric.target2026
    : metric.currentValue <= metric.target2026;
  const gap = Math.round(Math.abs(metric.currentValue - metric.target2026) * 10) / 10;
  return { achieved, gap };
}

export const MONTH_LABELS = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
];

export const generatedAt = mockData.generatedAt;

export const MONTH_NAMES_RU = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

export const CURRENT_YEAR = "2026";
