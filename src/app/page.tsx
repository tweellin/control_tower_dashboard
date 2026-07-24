import { Headphones, Server, Truck } from "lucide-react";

import { getMetricsBySection, generatedAt, type MetricSection } from "@/lib/metrics";
import { MetricChartCard } from "@/components/metric-chart-card";
import { ModeToggle } from "@/components/mode-toggle";
import { BrandLogo } from "@/components/brand-logo";
import { Separator } from "@/components/ui/separator";

const SECTION_ICONS: Record<MetricSection, typeof Headphones> = {
  Сервис: Headphones,
  Логистика: Truck,
  Инфраструктура: Server,
};

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${day}.${month}.${year}`;
}

export default function Home() {
  const sections = getMetricsBySection();

  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-background">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,var(--glow),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <header className="relative overflow-hidden border-b border-border/70">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[var(--glow)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-1/5 h-64 w-64 rounded-full bg-[var(--glow)] opacity-70 blur-3xl"
        />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo />
            <div className="hidden h-10 w-px bg-border sm:block" />
            <div>
              <h1 className="font-heading text-2xl font-semibold tracking-tight">
                Control Tower Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Ключевые показатели цепочки поставок — факт по месяцам
                2024–2026 и цель на 2026 год
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--chart-3)] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[var(--chart-3)]" />
              </span>
              Обновлено {formatDate(generatedAt)}
            </div>
            <ModeToggle />
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
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
        Control Tower Dashboard — демонстрационный прототип, данные mock
      </footer>
    </div>
  );
}
