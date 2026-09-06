import { cn } from "@/lib/utils";
import { Layers, Minus, Plus, Crosshair } from "lucide-react";
import type { Zone } from "@/data/ner";
import { severityDot } from "@/components/risk";

/**
 * Schematic map canvas.
 *
 * No mapping library is bundled in this MVP, so this renders a clean
 * relief-style canvas with positioned zone markers. The marker coordinates come
 * from the demo dataset and can be swapped for a Leaflet map later without
 * changing the surrounding layout.
 */
export function RiskMapCanvas({
  zones,
  selectedId,
  onSelect,
  className,
  showControls = true,
  compact = false,
}: {
  zones: Zone[];
  selectedId?: string;
  onSelect?: (zone: Zone) => void;
  className?: string;
  showControls?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-terrain map-grid",
        className,
      )}
    >
      {/* Relief + water styling */}
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,20 C18,10 26,30 42,26 C58,22 70,8 100,14 L100,0 L0,0 Z"
          fill="var(--color-terrain-deep)"
          opacity="0.85"
        />
        <path
          d="M0,62 C20,52 34,70 52,64 C72,58 84,72 100,66 L100,100 L0,100 Z"
          fill="var(--color-terrain-deep)"
          opacity="0.55"
        />
        <path
          d="M2,44 C22,40 36,50 54,44 C74,38 88,48 99,42"
          fill="none"
          stroke="var(--color-water)"
          strokeWidth="1.6"
          opacity="0.9"
        />
        <path
          d="M8,4 C18,26 34,34 40,58 C46,80 58,88 62,99"
          fill="none"
          stroke="oklch(0.55 0.03 250 / 0.35)"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
        <path
          d="M96,10 C82,28 76,42 78,60 C80,76 68,88 55,96"
          fill="none"
          stroke="oklch(0.55 0.03 250 / 0.35)"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
      </svg>

      {/* Risk heat blooms */}
      {zones.map((z) => (
        <span
          key={`heat-${z.id}`}
          className={cn(
            "pointer-events-none absolute rounded-full blur-2xl opacity-30",
            severityDot(z.severity),
          )}
          style={{
            left: `${z.x}%`,
            top: `${z.y}%`,
            width: compact ? 88 : 150,
            height: compact ? 88 : 150,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Zone markers */}
      {zones.map((z) => {
        const active = z.id === selectedId;
        return (
          <button
            key={z.id}
            type="button"
            onClick={() => onSelect?.(z)}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${z.x}%`, top: `${z.y}%` }}
            aria-label={`${z.name}, risk score ${z.riskScore}`}
          >
            <span
              className={cn(
                "grid place-items-center rounded-full border-2 border-card text-[10px] font-bold text-primary-foreground shadow-panel transition-transform group-hover:scale-110",
                severityDot(z.severity),
                active ? "size-9 ring-4 ring-primary/25" : compact ? "size-6" : "size-8",
              )}
            >
              {z.riskScore}
            </span>
            <span
              className={cn(
                "pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2 py-0.5 text-[10px] font-semibold text-foreground shadow-card",
                active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
              )}
            >
              {z.district}
            </span>
          </button>
        );
      })}

      {showControls && (
        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          {[Plus, Minus, Crosshair, Layers].map((Icon, i) => (
            <button
              key={i}
              type="button"
              className="grid size-8 place-items-center rounded-md border border-border bg-card text-foreground shadow-card transition-colors hover:bg-secondary"
              aria-label="Map control"
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      )}

      <div className="absolute bottom-3 left-3 rounded-md border border-border bg-card/95 px-2.5 py-1 text-[11px] font-medium text-muted-foreground shadow-card">
        North Eastern Region · schematic view
      </div>
    </div>
  );
}
