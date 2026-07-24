import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpenText } from "lucide-react";

import {
  getAllMetricKeys,
  getMetricByKey,
  getSectionForKey,
  METRIC_CONTENT,
  MONTH_NAMES_RU,
  CURRENT_YEAR,
  formatMetricValue,
  type MetricKey,
} from "@/lib/metrics";
import { MetricLineChart } from "@/components/metric-line-chart";
import { TargetBadge } from "@/components/target-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function generateStaticParams() {
  return getAllMetricKeys().map((key) => ({ key }));
}

export default async function MetricDetailPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const allKeys = getAllMetricKeys();
  if (!allKeys.includes(key as MetricKey)) notFound();

  const metricKey = key as MetricKey;
  const metric = getMetricByKey(metricKey);
  const section = getSectionForKey(metricKey);
  const content = METRIC_CONTENT[metricKey];
  const currentPeriodLabel = `${MONTH_NAMES_RU[metric.currentMonth - 1]} ${CURRENT_YEAR}`;

  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-background">
      <header className="border-b border-border/70">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-8">
          <Link
            href="/"
            className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Supply Chain Control Tower
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground/80 uppercase">
                {section}
              </p>
              <h1 className="font-heading text-2xl font-semibold tracking-tight">
                {metric.name}
              </h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={
                <Link href={`/metrics/${metricKey}/methodology`}>
                  <BookOpenText className="size-3.5" />
                  Детализированная методология
                </Link>
              }
            />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        <div className="flex flex-col gap-8">
          <p className="max-w-2xl text-sm text-muted-foreground">
            {content.description}
          </p>

          <Card>
            <CardContent className="flex flex-col gap-6">
              <span className="text-xs font-medium tracking-wide text-muted-foreground/80 uppercase">
                {currentPeriodLabel}
              </span>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-heading text-4xl font-semibold text-foreground [text-shadow:0_0_24px_var(--glow)]">
                  {formatMetricValue(metric.currentValue, metric.unit)}
                </span>
                <TargetBadge metric={metric} />
              </div>
              <MetricLineChart metric={metric} heightClassName="h-80" />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="mb-4 font-heading text-base font-semibold">
                Значения по месяцам
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
                      <th className="py-2 pr-4 font-medium">Месяц</th>
                      <th className="py-2 pr-4 font-medium">2024</th>
                      <th className="py-2 pr-4 font-medium">2025</th>
                      <th className="py-2 pr-4 font-medium">2026</th>
                      <th className="py-2 pr-4 font-medium">Цель 2026</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metric.rows.map((row) => (
                      <tr key={row.month} className="border-b border-border/50">
                        <td className="py-2 pr-4 text-muted-foreground">
                          {MONTH_NAMES_RU[row.month - 1]}
                        </td>
                        <td className="py-2 pr-4 font-mono tabular-nums">
                          {formatMetricValue(row["2024"], metric.unit)}
                        </td>
                        <td className="py-2 pr-4 font-mono tabular-nums">
                          {formatMetricValue(row["2025"], metric.unit)}
                        </td>
                        <td className="py-2 pr-4 font-mono tabular-nums">
                          {row["2026"] != null
                            ? formatMetricValue(row["2026"], metric.unit)
                            : "—"}
                        </td>
                        <td className="py-2 pr-4 font-mono text-muted-foreground tabular-nums">
                          {formatMetricValue(row.target, metric.unit)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
