import { getMetricsBySection } from "@/lib/metrics";
import { MetricChartCard } from "@/components/metric-chart-card";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const sections = getMetricsBySection();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Control Tower Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Ключевые показатели цепочки поставок — факт по месяцам 2024–2026
              и цель на 2026 год
            </p>
          </div>
          <ModeToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        <div className="flex flex-col gap-10">
          {sections.map(({ section, metrics }) => (
            <section key={section} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold tracking-tight">
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
          ))}
        </div>
      </main>
    </div>
  );
}
