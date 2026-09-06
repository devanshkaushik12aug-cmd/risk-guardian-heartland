import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  trend,
  direction,
  hint,
  icon: Icon,
  className,
}: {
  label: string;
  value: string;
  trend: string;
  direction: "up" | "down" | "flat";
  hint?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  const TrendIcon = direction === "up" ? TrendingUp : direction === "down" ? TrendingDown : Minus;
  return (
    <div className={cn("panel p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <span className="label-eyebrow">{label}</span>
        {Icon && (
          <span className="grid size-8 place-items-center rounded-lg bg-surface text-primary">
            <Icon className="size-4" />
          </span>
        )}
      </div>
      <p className="mt-3 font-display text-3xl font-semibold tabular-nums text-foreground">
        {value}
      </p>
      <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <TrendIcon
          className={cn(
            "size-3.5",
            direction === "up" ? "text-risk-high" : direction === "down" ? "text-risk-low" : "",
          )}
        />
        {trend}
      </div>
      {hint && <p className="mt-2 text-[11px] leading-snug text-muted-foreground">{hint}</p>}
    </div>
  );
}
