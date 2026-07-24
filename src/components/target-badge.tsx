import { CircleCheck, Target } from "lucide-react";

import { formatMetricValue, getTargetStatus, type MetricDefinition } from "@/lib/metrics";

export function TargetBadge({ metric }: { metric: MetricDefinition }) {
  const { achieved, gap } = getTargetStatus(metric);

  if (achieved) {
    return (
      <span className="flex items-center gap-1 text-sm font-medium text-success">
        <CircleCheck className="size-3.5" />
        {gap > 0
          ? `Опережаем цель на ${formatMetricValue(gap, metric.unit)}`
          : "Цель достигнута"}
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
      <Target className="size-3.5" />
      До цели: {formatMetricValue(gap, metric.unit)}
    </span>
  );
}
