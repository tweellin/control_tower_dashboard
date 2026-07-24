import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import {
  getAllMetricKeys,
  getMetricByKey,
  getSectionForKey,
  METRIC_CONTENT,
  type MetricKey,
} from "@/lib/metrics";
import { Card, CardContent } from "@/components/ui/card";

export function generateStaticParams() {
  return getAllMetricKeys().map((key) => ({ key }));
}

export default async function MetricMethodologyPage({
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

  const rows: { label: string; value: string; mono?: boolean }[] = [
    { label: "Формула расчёта", value: content.methodology.formula, mono: true },
    { label: "Источник данных", value: content.methodology.source },
    { label: "Периодичность расчёта", value: content.methodology.frequency },
    { label: "Примечание", value: content.methodology.note },
  ];

  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-background">
      <header className="border-b border-border/70">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-8">
          <Link
            href={`/metrics/${metricKey}`}
            className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            {metric.name}
          </Link>
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground/80 uppercase">
              {section} · Методология
            </p>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              {metric.name}
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <Card>
          <CardContent>
            <p className="mb-6 text-sm text-muted-foreground">
              {content.description}
            </p>
            <dl className="flex flex-col divide-y divide-border">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-1.5 py-4 first:pt-0 last:pb-0 sm:grid-cols-[200px_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-medium text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd
                    className={
                      row.mono
                        ? "font-mono text-sm text-foreground"
                        : "text-sm text-foreground"
                    }
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
