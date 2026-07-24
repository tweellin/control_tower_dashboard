import { Handshake, Truck, Warehouse } from "lucide-react";

import { getMetricsBySection, generatedAt, type MetricSection } from "@/lib/metrics";
import { MetricChartCard } from "@/components/metric-chart-card";
import { ModeToggle } from "@/components/mode-toggle";
import { PrintButton } from "@/components/print-button";
import { BrandLogo } from "@/components/brand-logo";
import { Separator } from "@/components/ui/separator";

const SECTION_ICONS: Record<MetricSection, typeof Handshake> = {
  Сервис: Handshake,
  Логистика: Truck,
  Инфраструктура: Warehouse,
};

function formatDateTime(iso: string) {
  const [datePart, timePart] = iso.split("T");
  const [year, month, day] = datePart.split("-");
  return `${day}.${month}.${year}, ${timePart} (UTC+3 Москва)`;
}

export default function Home() {
  const sections = getMetricsBySection();

  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-background">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,var(--glow),transparent_55%)] print:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:48px_48px] print:hidden"
      />

      <header className="relative overflow-hidden border-b border-border/70">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[var(--glow)] blur-3xl print:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-1/5 h-64 w-64 rounded-full bg-[var(--glow)] opacity-70 blur-3xl print:hidden"
        />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo />
            <div className="hidden h-10 w-px bg-border sm:block" />
            <div>
              <h1 className="font-heading text-2xl font-semibold tracking-tight">
                Supply Chain Control Tower
              </h1>
              <p className="text-sm text-muted-foreground">
                Динамика ключевых показателей ДУЦП БЕ Импорт
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Демонстрационный прототип разработанный Андреем Сысенко.
                Значения метрик, методология расчета — сгенерированы
                ClaudeCode и не являются реальными.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--chart-3)] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[var(--chart-3)]" />
              </span>
              Обновлено {formatDateTime(generatedAt)}
            </div>
            <div className="flex items-center gap-2 print:hidden">
              <PrintButton />
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <div className="flex flex-col gap-12">
          {sections.map(({ section, metrics }) => {
            const Icon = SECTION_ICONS[section];
            return (
              <section key={section} className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <h2 className="font-heading text-lg font-semibold tracking-tight">
                    {section}
                  </h2>
                  <Separator className="flex-1" />
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 [&:has(.chart-card:hover)>.chart-card:not(:hover)]:scale-[0.98] [&:has(.chart-card:hover)>.chart-card:not(:hover)]:opacity-50">
                  {metrics.map((metric) => (
                    <MetricChartCard key={metric.key} metric={metric} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <footer className="border-t border-border/70 px-6 py-6 text-center text-xs text-muted-foreground">
        Демонстрационный прототип разработанный Андреем Сысенко. Значения
        метрик, методология расчета — сгенерированы ClaudeCode и не
        являются реальными.
      </footer>
    </div>
  );
}
