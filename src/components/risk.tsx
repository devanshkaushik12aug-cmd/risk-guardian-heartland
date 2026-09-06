import { cn } from "@/lib/utils";
import type { Severity } from "@/data/ner";

const styles: Record<string, string> = {
  low: "bg-risk-low-soft text-risk-low border-risk-low/25",
  moderate: "bg-risk-moderate-soft text-risk-moderate border-risk-moderate/30",
  medium: "bg-risk-moderate-soft text-risk-moderate border-risk-moderate/30",
  high: "bg-risk-high-soft text-risk-high border-risk-high/30",
  critical: "bg-risk-critical-soft text-risk-critical border-risk-critical/30",
};

const dots: Record<string, string> = {
  low: "bg-risk-low",
  moderate: "bg-risk-moderate",
  medium: "bg-risk-moderate",
  high: "bg-risk-high",
  critical: "bg-risk-critical",
};

export function severityDot(severity: string) {
  return dots[severity] ?? "bg-muted-foreground";
}

export function RiskBadge({
  severity,
  className,
  label,
}: {
  severity: Severity | string;
  className?: string;
  label?: string;
}) {
  const key = String(severity);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize",
        styles[key] ?? "bg-secondary text-secondary-foreground border-border",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", dots[key] ?? "bg-muted-foreground")} />
      {label ?? key}
    </span>
  );
}

export function StatusPill({ status, className }: { status: string; className?: string }) {
  const tone =
    status === "Active" || status === "New" || status === "Dispatched" || status === "On site"
      ? "bg-risk-high-soft text-risk-high border-risk-high/25"
      : status === "Resolved" || status === "Closed" || status === "Verified"
        ? "bg-risk-low-soft text-risk-low border-risk-low/25"
        : "bg-secondary text-secondary-foreground border-border";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        tone,
        className,
      )}
    >
      {status}
    </span>
  );
}

export function RiskScore({ score, className }: { score: number; className?: string }) {
  const tone =
    score >= 85
      ? "text-risk-critical"
      : score >= 70
        ? "text-risk-high"
        : score >= 50
          ? "text-risk-moderate"
          : "text-risk-low";
  return (
    <span className={cn("font-display text-sm font-semibold tabular-nums", tone, className)}>
      {score}
      <span className="text-xs font-normal text-muted-foreground">/100</span>
    </span>
  );
}

export function MeterBar({
  value,
  severity = "moderate",
  className,
}: {
  value: number;
  severity?: string;
  className?: string;
}) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-surface", className)}>
      <div
        className={cn("h-full rounded-full transition-all", dots[severity] ?? "bg-primary")}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function RiskLegend({ className }: { className?: string }) {
  const items: { severity: Severity; label: string }[] = [
    { severity: "low", label: "Low" },
    { severity: "moderate", label: "Moderate" },
    { severity: "high", label: "High" },
    { severity: "critical", label: "Critical" },
  ];
  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      {items.map((i) => (
        <span key={i.severity} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className={cn("size-2.5 rounded-sm", dots[i.severity])} />
          {i.label}
        </span>
      ))}
    </div>
  );
}

export function DemoDataNote({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      {children ?? "Sample / demo data — not a live feed."}
    </p>
  );
}
