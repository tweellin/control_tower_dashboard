"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import type { MetricDefinition } from "@/lib/metrics";

const chartConfig = {
  "2024": { label: "2024", color: "var(--chart-1)" },
  "2025": { label: "2025", color: "var(--chart-2)" },
  "2026": { label: "2026", color: "var(--chart-3)" },
  target: { label: "Цель 2026", color: "var(--chart-4)" },
} satisfies ChartConfig;

function formatValue(value: number, unit: string) {
  const formatted = Number.isInteger(value)
    ? value.toString()
    : value.toFixed(1);
  return unit === "%" ? `${formatted}%` : `${formatted} ${unit}`;
}

export function MetricChartCard({ metric }: { metric: MetricDefinition }) {
  const priorYearSameMonth = metric.rows[metric.currentMonth - 1]["2025"];
  const delta = metric.currentValue - priorYearSameMonth;
  const improved = metric.higherIsBetter ? delta > 0 : delta < 0;
  const deltaRounded = Math.round(Math.abs(delta) * 10) / 10;

  return (
    <Card>
      <CardHeader className="gap-1">
        <CardTitle className="text-base font-medium">{metric.name}</CardTitle>
        <CardDescription className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-foreground">
            {formatValue(metric.currentValue, metric.unit)}
          </span>
          {deltaRounded > 0 && (
            <span
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                improved ? "text-success" : "text-destructive"
              )}
            >
              {delta > 0 ? (
                <TrendingUp className="size-3.5" />
              ) : (
                <TrendingDown className="size-3.5" />
              )}
              {formatValue(deltaRounded, metric.unit)} к 2025
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-56 w-full">
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
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
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
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls={false}
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
      </CardContent>
    </Card>
  );
}
