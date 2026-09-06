import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Map as MapIcon,
  Activity,
  ClipboardList,
  BellRing,
  ListOrdered,
  Database,
  Settings as SettingsIcon,
  Search,
  Menu,
  X,
  MapPin,
  ShieldAlert,
  ChevronDown,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { languages } from "@/data/ner";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/risk-map", label: "Risk Map", icon: MapIcon },
  { to: "/risk-analysis", label: "Risk Analysis", icon: Activity },
  { to: "/field-reports", label: "Field Reports", icon: ClipboardList },
  { to: "/alerts", label: "Alerts", icon: BellRing },
  { to: "/response", label: "Response Prioritisation", icon: ListOrdered },
  { to: "/data-sources", label: "Data Sources", icon: Database },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
] as const;

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3 px-5 py-5">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <ShieldAlert className="size-5" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-base font-semibold text-sidebar-primary">
          NER Sentinel
        </span>
        <span className="block text-[11px] text-sidebar-foreground/70">
          Landslide Risk & Response
        </span>
      </span>
    </Link>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {nav.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          activeOptions={{ exact: to === "/" }}
          className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/85 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:text-sidebar-accent-foreground"
        >
          <Icon className="size-[18px] shrink-0 opacity-80" />
          <span className="truncate">{label}</span>
        </Link>
      ))}
    </nav>
  );
}

function SidebarFooter() {
  return (
    <div className="mt-auto border-t border-sidebar-border px-5 py-4 text-[11px] leading-relaxed text-sidebar-foreground/60">
      Decision-support only. Risk scores are model estimates and do not predict the exact time or
      location of a landslide.
    </div>
  );
}

export function AppShell({
  children,
  title,
  subtitle,
  actions,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState(languages[0].code);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[272px] flex-col bg-sidebar lg:flex">
        <Brand />
        <NavList />
        <SidebarFooter />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-navy/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex h-full w-[280px] flex-col bg-sidebar">
            <div className="flex items-start justify-between">
              <Brand />
              <button
                aria-label="Close menu"
                className="m-4 rounded-md p-1.5 text-sidebar-foreground/80 hover:bg-sidebar-accent"
                onClick={() => setMobileOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>
            <NavList onNavigate={() => setMobileOpen(false)} />
            <SidebarFooter />
          </div>
        </div>
      )}

      <div className="lg:pl-[272px]">
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button
              aria-label="Open menu"
              className="rounded-md p-2 text-foreground hover:bg-secondary lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-5" />
            </button>

            <div className="hidden items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 md:flex">
              <MapPin className="size-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">North Eastern Region</span>
            </div>

            <div className="relative flex-1 md:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search zones, districts, reports"
                className="h-9 pl-9 text-sm"
                aria-label="Search"
              />
            </div>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
              <div className="hidden items-center rounded-lg border border-border bg-surface p-0.5 sm:flex">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                      lang === l.code
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              <Link
                to="/alerts"
                aria-label="Notifications"
                className="relative rounded-md p-2 text-foreground hover:bg-secondary"
              >
                <BellRing className="size-5" />
                <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-risk-critical text-[10px] font-bold text-primary-foreground">
                  7
                </span>
              </Link>

              <div className="flex items-center gap-2 rounded-lg border border-border bg-surface py-1 pl-1 pr-2">
                <span className="grid size-7 place-items-center rounded-md bg-primary text-[11px] font-bold text-primary-foreground">
                  DK
                </span>
                <span className="hidden leading-tight sm:block">
                  <span className="block text-xs font-semibold">D. Kaushik</span>
                  <span className="block text-[10px] text-muted-foreground">
                    District Control Room
                  </span>
                </span>
                <ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
              </div>

              <Button variant="ghost" size="icon" asChild aria-label="Sign out">
                <Link to="/login">
                  <LogOut className="size-[18px]" />
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-semibold text-foreground sm:text-[28px]">
                  {title}
                </h1>
                {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
              </div>
              {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
