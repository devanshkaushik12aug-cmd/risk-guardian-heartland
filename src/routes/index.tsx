import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Radar,
  AlertTriangle,
  BellRing,
  Construction,
  CloudRain,
  Droplets,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppShell } from "@/components/layout/app-shell";
import { KpiCard } from "@/components/kpi-card";
import { RiskMapCanvas } from "@/components/risk-map-canvas";
import { DemoDataNote, RiskBadge, RiskLegend, RiskScore, StatusPill, severityDot } from "@/components/risk";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  alerts,
  forecast24h,
  kpis,
  priorities,
  riskDistribution,
  severityLabel,
  zones,
} from "@/data/ner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Command Dashboard — NER Sentinel Landslide Monitoring" },
      {
        name: "description",
        content:
          "Monitor landslide risk scores, rainfall-linked early warnings, active alerts and road status across the North Eastern Region of India.",
      },
      { property: "og:title", content: "Command Dashboard — NER Sentinel" },
      {
        property: "og:description",
        content:
          "Regional risk overview, 24-hour rainfall forecast and emergency response priorities for the North Eastern Region.",
      },
    ],
  }),
  component: Dashboard,
});

const kpiIcons = [Radar, AlertTriangle, BellRing, Construction];

function Dashboard() {
  const [selected, setSelected] = useState(zones[1]);
  const total = riskDistribution.reduce((s, r) => s + r.count, 0);

  return (
    <AppShell
      title="Regional Command Dashboard"
      subtitle="North Eastern Region · monsoon watch · updated 6 Sep 2026, 11:40 IST"
      actions={
        <>
          <Button variant="outline" asChild>
            <Link to="/risk-map">Open risk map</Link>
          </Button>
          <Button asChild>
            <Link to="/alerts">Issue early warning</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k, i) => (
          <KpiCard key={k.label} {...k} icon={kpiIcons[i]} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="panel xl:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-5">
            <div>
              <h2 className="font-display text-lg font-semibold">Regional Risk Overview</h2>
              <DemoDataNote className="mt-1">
                Predicted risk scores from demo rainfall and terrain data — indicative, not a
                location- or time-specific prediction.
              </DemoDataNote>
            </div>
            <RiskLegend />
          </div>
          <div className="p-5">
            <RiskMapCanvas
              zones={zones}
              selectedId={selected.id}
              onSelect={setSelected}
              className="h-[340px] sm:h-[420px]"
            />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface p-4">
              <div>
                <p className="label-eyebrow">Selected zone</p>
                <p className="mt-1 font-display text-sm font-semibold">{selected.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selected.district}, {selected.state} · {selected.roadStatus}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="label-eyebrow">Risk score</p>
                  <RiskScore score={selected.riskScore} className="text-lg" />
                </div>
                <RiskBadge severity={selected.severity} />
                <Button variant="outline" size="sm" asChild>
                  <Link to="/risk-analysis">
                    Analyse <ChevronRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-6">
          <section className="panel p-5">
            <h2 className="font-display text-lg font-semibold">Risk Distribution</h2>
            <p className="mt-1 text-xs text-muted-foreground">{total} monitored zones classified</p>
            <div className="mt-5 flex h-3 overflow-hidden rounded-full">
              {riskDistribution.map((r) => (
                <span
                  key={r.severity}
                  className={cn("h-full", severityDot(r.severity))}
                  style={{ width: `${(r.count / total) * 100}%` }}
                />
              ))}
            </div>
            <ul className="mt-5 space-y-3">
              {riskDistribution.map((r) => (
                <li key={r.severity} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className={cn("size-2.5 rounded-sm", severityDot(r.severity))} />
                    {severityLabel[r.severity]}
                  </span>
                  <span className="font-semibold tabular-nums">
                    {r.count}
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      {Math.round((r.count / total) * 100)}%
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold">24-Hour Risk Forecast</h2>
                <DemoDataNote className="mt-1">
                  Sample rainfall and soil moisture series.
                </DemoDataNote>
              </div>
              <span className="rounded-md border border-risk-high/30 bg-risk-high-soft px-2 py-0.5 text-[11px] font-semibold text-risk-high">
                Rising
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg border border-border bg-surface p-3">
                <CloudRain className="mx-auto size-4 text-primary" />
                <p className="mt-1 font-display text-base font-semibold">34 mm</p>
                <p className="text-[10px] text-muted-foreground">Peak rainfall</p>
              </div>
              <div className="rounded-lg border border-border bg-surface p-3">
                <Droplets className="mx-auto size-4 text-primary" />
                <p className="mt-1 font-display text-base font-semibold">85%</p>
                <p className="text-[10px] text-muted-foreground">Soil moisture</p>
              </div>
              <div className="rounded-lg border border-border bg-surface p-3">
                <ArrowUpRight className="mx-auto size-4 text-risk-high" />
                <p className="mt-1 font-display text-base font-semibold">87</p>
                <p className="text-[10px] text-muted-foreground">Peak risk</p>
              </div>
            </div>
            <div className="mt-4 h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecast24h} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-risk-high)" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="var(--color-risk-high)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid var(--color-border)",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="rainfall" name="Rainfall (mm)" fill="var(--color-chart-2)" radius={3} />
                  <Area
                    type="monotone"
                    dataKey="risk"
                    name="Risk score"
                    stroke="var(--color-risk-high)"
                    strokeWidth={2}
                    fill="url(#riskFill)"
                  />
                  <Line
                    type="monotone"
                    dataKey="soilMoisture"
                    name="Soil moisture (%)"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="panel xl:col-span-1">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="font-display text-lg font-semibold">Recent Alerts</h2>
            <Link to="/alerts" className="text-xs font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {alerts.slice(0, 4).map((a) => (
              <li key={a.id} className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <RiskBadge severity={a.severity} />
                  <StatusPill status={a.status} />
                </div>
                <p className="mt-2 text-sm font-semibold leading-snug">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.location}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">{a.time}</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/alerts">View details</Link>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel xl:col-span-2">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div>
              <h2 className="font-display text-lg font-semibold">Response Priority</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Ranked by risk score, road connectivity and exposed population
              </p>
            </div>
            <Link to="/response" className="text-xs font-semibold text-primary hover:underline">
              Full queue
            </Link>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Priority</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Road status</TableHead>
                  <TableHead>Recommended action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priorities.slice(0, 5).map((p) => (
                  <TableRow key={p.zoneId}>
                    <TableCell>
                      <RiskBadge severity={p.priority} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm font-medium">{p.zone}</TableCell>
                    <TableCell>
                      <RiskScore score={p.riskScore} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {p.connectivity}
                    </TableCell>
                    <TableCell className="min-w-[240px] text-sm text-muted-foreground">
                      {p.action}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
