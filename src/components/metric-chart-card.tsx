"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { MetricLineChart } from "@/components/metric-line-chart";
import { TargetBadge } from "@/components/target-badge";
import {
  MONTH_NAMES_RU,
  CURRENT_YEAR,
  METRIC_CONTENT,
  formatMetricValue,
  type MetricDefinition,
} from "@/lib/metrics";

export function MetricChartCard({ metric }: { metric: MetricDefinition }) {
  const content = METRIC_CONTENT[metric.key];
  const currentPeriodLabel = `${MONTH_NAMES_RU[metric.currentMonth - 1]} ${CURRENT_YEAR}`;

  return (
    <Card
      className="chart-card origin-center transition-[transform,box-shadow,filter,opacity] duration-300 ease-out hover:z-20 hover:scale-125 hover:shadow-[0_0_0_2px_var(--chart-3),0_45px_90px_-20px_var(--glow)] hover:brightness-110 hover:contrast-105"
    >
      <CardHeader className="gap-1">
        <CardTitle className="text-[1.2rem] font-medium text-muted-foreground">
          <HoverCard>
            <HoverCardTrigger
              delay={150}
              closeDelay={100}
              render={
                <span className="cursor-default underline decoration-dotted decoration-current/40 underline-offset-4">
                  {metric.name}
                </span>
              }
            />
            <HoverCardContent className="w-80">
              <div className="flex flex-col gap-3">
                <div>
                  <p className="font-heading text-sm font-semibold text-popover-foreground">
                    {metric.name}
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {content.description}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    nativeButton={false}
                    render={<Link href={`/metrics/${metric.key}`}>Перейти к деталям</Link>}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    nativeButton={false}
                    render={
                      <Link href={`/metrics/${metric.key}/methodology`}>
                        Детализированная методология
                      </Link>
                    }
                  />
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <span className="text-xs font-medium tracking-wide text-muted-foreground/80 uppercase">
            {currentPeriodLabel}
          </span>
          <span className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-semibold text-foreground [text-shadow:0_0_24px_var(--glow)]">
              {formatMetricValue(metric.currentValue, metric.unit)}
            </span>
            <TargetBadge metric={metric} />
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MetricLineChart metric={metric} />
      </CardContent>
    </Card>
  );
}
