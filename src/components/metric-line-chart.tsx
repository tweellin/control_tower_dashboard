"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatMetricValue, type MetricDefinition } from "@/lib/metrics";

export const metricChartConfig = {
  "2024": { label: "2024", color: "var(--chart-1)" },
  "2025": { label: "2025", color: "var(--chart-2)" },
  "2026": { label: "2026", color: "var(--chart-3)" },
  target: { label: "Цель 2026", color: "var(--chart-4)" },
} satisfies ChartConfig;

export function MetricLineChart({
  metric,
  heightClassName = "h-56",
}: {
  metric: MetricDefinition;
  heightClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <ChartContainer
        config={metricChartConfig}
        className={`aspect-auto w-full ${heightClassName}`}
      >
        <LineChart data={metric.rows} margin={{ left: 4, right: 4, top: 4 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          type="number"
          domain={[1, 12]}
          ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={36}
          tickFormatter={(value: number) =>
            metric.unit === "%" ? `${value}` : `${value}`
          }
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="line"
              hideLabel
              formatter={(value, name, item) => {
                const key = (item.dataKey ?? name) as keyof typeof metricChartConfig;
                const label = metricChartConfig[key]?.label ?? name;
                return (
                  <>
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="flex flex-1 items-center justify-between gap-3 leading-none">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-mono font-medium text-foreground tabular-nums">
                        {formatMetricValue(value as number, metric.unit)}
                      </span>
                    </span>
                  </>
                );
              }}
            />
          }
        />
        <Line
          dataKey="2024"
          stroke="var(--color-2024)"
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
        <Line
          dataKey="2025"
          stroke="var(--color-2025)"
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
        <Line
          dataKey="2026"
          stroke="var(--color-2026)"
          strokeWidth={2.5}
          dot={{ r: 4, fill: "var(--color-2026)", stroke: "var(--card)", strokeWidth: 2 }}
          connectNulls={false}
          className="drop-shadow-[0_0_6px_var(--chart-3)] print:drop-shadow-none"
        />
        <Line
          dataKey="target"
          stroke="var(--color-target)"
          strokeWidth={2}
          strokeDasharray="4 4"
          dot={false}
          connectNulls
        />
        <ChartLegend content={<ChartLegendContent />} />
        </LineChart>
      </ChartContainer>
      <p className="text-center text-[11px] text-muted-foreground">Месяц</p>
    </div>
  );
}
