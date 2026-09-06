/**
 * Sample / demo dataset for NER Sentinel.
 * All values here are illustrative demo data for the North Eastern Region of India.
 * Replace with API calls to a Node.js/Express + PostgreSQL/PostGIS backend later.
 */

export type Severity = "low" | "moderate" | "high" | "critical";

export const severityLabel: Record<Severity, string> = {
  low: "Low",
  moderate: "Moderate",
  high: "High",
  critical: "Critical",
};

export interface Zone {
  id: string;
  name: string;
  district: string;
  state: string;
  riskScore: number;
  severity: Severity;
  rainfall24h: number; // mm
  soilMoisture: number; // %
  slope: number; // degrees
  population: number;
  roadStatus: string;
  lastUpdated: string;
  action: string;
  /** Normalised map position (0-100) used by the schematic map canvas. */
  x: number;
  y: number;
}

export const zones: Zone[] = [
  {
    id: "TAW-014",
    name: "Tawang — Jang Ghat Slope",
    district: "Tawang",
    state: "Arunachal Pradesh",
    riskScore: 82,
    severity: "high",
    rainfall24h: 96,
    soilMoisture: 78,
    slope: 41,
    population: 4200,
    roadStatus: "NH-13 partially blocked",
    lastUpdated: "6 Sep 2026, 11:20 IST",
    action: "Inspect vulnerable road section and alert field officials",
    x: 61,
    y: 16,
  },
  {
    id: "SKM-007",
    name: "East Sikkim — Rangpo Corridor",
    district: "Gangtok",
    state: "Sikkim",
    riskScore: 91,
    severity: "critical",
    rainfall24h: 132,
    soilMoisture: 86,
    slope: 46,
    population: 9800,
    roadStatus: "NH-10 closed at Rangpo",
    lastUpdated: "6 Sep 2026, 11:35 IST",
    action: "Activate evacuation readiness for two downslope wards",
    x: 12,
    y: 26,
  },
  {
    id: "AIZ-022",
    name: "Aizawl — Melthum Ridge",
    district: "Aizawl",
    state: "Mizoram",
    riskScore: 74,
    severity: "high",
    rainfall24h: 88,
    soilMoisture: 71,
    slope: 38,
    population: 15400,
    roadStatus: "Internal ridge road narrowed",
    lastUpdated: "6 Sep 2026, 10:55 IST",
    action: "Monitor slope movement and restrict heavy vehicles",
    x: 63,
    y: 76,
  },
  {
    id: "KOH-009",
    name: "Kohima — Zubza Cutting",
    district: "Kohima",
    state: "Nagaland",
    riskScore: 68,
    severity: "moderate",
    rainfall24h: 64,
    soilMoisture: 63,
    slope: 34,
    population: 6100,
    roadStatus: "NH-2 single lane",
    lastUpdated: "6 Sep 2026, 10:40 IST",
    action: "Schedule debris clearance and slope netting review",
    x: 77,
    y: 40,
  },
  {
    id: "IMP-031",
    name: "Imphal East — Nongmaiching Hills",
    district: "Imphal East",
    state: "Manipur",
    riskScore: 57,
    severity: "moderate",
    rainfall24h: 47,
    soilMoisture: 58,
    slope: 27,
    population: 8300,
    roadStatus: "Open",
    lastUpdated: "6 Sep 2026, 09:50 IST",
    action: "Continue routine monitoring of drainage channels",
    x: 79,
    y: 58,
  },
  {
    id: "SHL-018",
    name: "Shillong — Sohra Road Escarpment",
    district: "East Khasi Hills",
    state: "Meghalaya",
    riskScore: 86,
    severity: "critical",
    rainfall24h: 148,
    soilMoisture: 89,
    slope: 44,
    population: 5200,
    roadStatus: "Sohra Road blocked at km 27",
    lastUpdated: "6 Sep 2026, 11:15 IST",
    action: "Prepare alternate route via Mawkdok and pre-position JCBs",
    x: 40,
    y: 58,
  },
  {
    id: "GUW-004",
    name: "Guwahati — Kalapahar Hillside",
    district: "Kamrup Metro",
    state: "Assam",
    riskScore: 61,
    severity: "moderate",
    rainfall24h: 55,
    soilMoisture: 60,
    slope: 24,
    population: 22400,
    roadStatus: "Open with caution",
    lastUpdated: "6 Sep 2026, 10:05 IST",
    action: "Issue advisory to hillside settlements",
    x: 40,
    y: 40,
  },
  {
    id: "AGT-012",
    name: "Agartala — Baramura Range",
    district: "West Tripura",
    state: "Tripura",
    riskScore: 34,
    severity: "low",
    rainfall24h: 21,
    soilMoisture: 42,
    slope: 18,
    population: 3900,
    roadStatus: "Open",
    lastUpdated: "6 Sep 2026, 09:20 IST",
    action: "No action required — routine sensor check",
    x: 55,
    y: 82,
  },
];

export const districts = [
  "All districts",
  ...Array.from(new Set(zones.map((z) => z.district))).sort(),
];

export const kpis = [
  {
    label: "Monitored Zones",
    value: "128",
    trend: "+6 this week",
    direction: "up" as const,
    hint: "Zones under continuous monitoring",
  },
  {
    label: "High-Risk Zones",
    value: "18",
    trend: "+3 in 24h",
    direction: "up" as const,
    hint: "Predicted risk score above 70",
  },
  {
    label: "Active Alerts",
    value: "7",
    trend: "2 unacknowledged",
    direction: "flat" as const,
    hint: "Early warnings currently in force",
  },
  {
    label: "Roads Affected",
    value: "12",
    trend: "-1 since 06:00",
    direction: "down" as const,
    hint: "Blocked or restricted road segments",
  },
];

export const riskDistribution: { severity: Severity; count: number }[] = [
  { severity: "low", count: 64 },
  { severity: "moderate", count: 46 },
  { severity: "high", count: 13 },
  { severity: "critical", count: 5 },
];

export interface ForecastPoint {
  time: string;
  rainfall: number;
  soilMoisture: number;
  risk: number;
}

export const forecast24h: ForecastPoint[] = [
  { time: "12:00", rainfall: 6, soilMoisture: 68, risk: 62 },
  { time: "15:00", rainfall: 11, soilMoisture: 71, risk: 66 },
  { time: "18:00", rainfall: 18, soilMoisture: 75, risk: 71 },
  { time: "21:00", rainfall: 27, soilMoisture: 79, risk: 78 },
  { time: "00:00", rainfall: 34, soilMoisture: 83, risk: 84 },
  { time: "03:00", rainfall: 29, soilMoisture: 85, risk: 87 },
  { time: "06:00", rainfall: 17, soilMoisture: 82, risk: 81 },
  { time: "09:00", rainfall: 9, soilMoisture: 78, risk: 74 },
];

export interface AlertItem {
  id: string;
  title: string;
  location: string;
  severity: Severity;
  trigger: string;
  time: string;
  status: "Active" | "Acknowledged" | "Resolved";
}

export const alerts: AlertItem[] = [
  {
    id: "ALT-2418",
    title: "Critical early warning — slope failure risk",
    location: "East Sikkim — Rangpo Corridor",
    severity: "critical",
    trigger: "132 mm rainfall in 24h, soil moisture 86%",
    time: "Today, 11:35 IST",
    status: "Active",
  },
  {
    id: "ALT-2417",
    title: "Road blockage confirmed on Sohra Road",
    location: "East Khasi Hills, Meghalaya",
    severity: "critical",
    trigger: "Field report FR-1094 verified by district control room",
    time: "Today, 11:02 IST",
    status: "Active",
  },
  {
    id: "ALT-2415",
    title: "High predicted risk — Jang Ghat slope",
    location: "Tawang, Arunachal Pradesh",
    severity: "high",
    trigger: "Risk score crossed 80 threshold",
    time: "Today, 09:48 IST",
    status: "Acknowledged",
  },
  {
    id: "ALT-2413",
    title: "Slope movement advisory — Melthum Ridge",
    location: "Aizawl, Mizoram",
    severity: "high",
    trigger: "Rainfall trend + historical incident cluster",
    time: "Today, 08:20 IST",
    status: "Active",
  },
  {
    id: "ALT-2410",
    title: "Moderate risk watch — Zubza cutting",
    location: "Kohima, Nagaland",
    severity: "moderate",
    trigger: "Soil moisture above seasonal normal",
    time: "Yesterday, 22:10 IST",
    status: "Acknowledged",
  },
  {
    id: "ALT-2406",
    title: "Hillside settlement advisory",
    location: "Kalapahar, Guwahati",
    severity: "moderate",
    trigger: "Forecast rainfall 55 mm in 24h",
    time: "Yesterday, 18:45 IST",
    status: "Resolved",
  },
];

export interface PriorityRow {
  priority: Severity;
  zone: string;
  zoneId: string;
  riskScore: number;
  incident: string;
  connectivity: string;
  population: number;
  team: string;
  status: "Dispatched" | "En route" | "Queued" | "On site";
  urgency: string;
  reason: string;
  factors: string[];
  action: string;
}

export const priorities: PriorityRow[] = [
  {
    priority: "critical",
    zone: "East Sikkim — Rangpo Corridor",
    zoneId: "SKM-007",
    riskScore: 91,
    incident: "Active slope failure, debris on carriageway",
    connectivity: "NH-10 closed",
    population: 9800,
    team: "SDRF Team 3, Gangtok",
    status: "On site",
    urgency: "Immediate — within 1 hour",
    reason:
      "Highest predicted risk score in the region combined with a closed national highway that is the only all-weather link to Gangtok.",
    factors: [
      "132 mm rainfall in the last 24 hours",
      "Soil moisture at 86%, saturated for 3 consecutive days",
      "Slope angle 46° with prior failure in 2023",
      "9,800 residents downslope of the affected reach",
    ],
    action: "Hold traffic at Rangpo checkpost, clear debris, survey slope toe before reopening",
  },
  {
    priority: "critical",
    zone: "Shillong — Sohra Road Escarpment",
    zoneId: "SHL-018",
    riskScore: 86,
    incident: "Road blockage at km 27",
    connectivity: "Blocked",
    population: 5200,
    team: "District QRT, East Khasi Hills",
    status: "Dispatched",
    urgency: "Immediate — within 2 hours",
    reason:
      "Heaviest rainfall in the region with a confirmed field report of blockage on the tourist and supply corridor to Sohra.",
    factors: [
      "148 mm rainfall in the last 24 hours",
      "Soil moisture at 89%",
      "Escarpment slope 44°",
      "Alternate route adds 38 km detour",
    ],
    action: "Pre-position JCBs at Mawkdok and publish alternate route advisory",
  },
  {
    priority: "high",
    zone: "Tawang — Jang Ghat Slope",
    zoneId: "TAW-014",
    riskScore: 82,
    incident: "Slope cracks reported by field official",
    connectivity: "NH-13 single lane",
    population: 4200,
    team: "BRO Detachment, Tawang",
    status: "En route",
    urgency: "Within 6 hours",
    reason:
      "Risk score crossed the high threshold and the only road link towards Tawang town is already restricted to one lane.",
    factors: [
      "96 mm rainfall in the last 24 hours",
      "Soil moisture at 78%",
      "Two recorded incidents at this reach since 2019",
    ],
    action: "Inspect crack propagation and install temporary slope protection",
  },
  {
    priority: "high",
    zone: "Aizawl — Melthum Ridge",
    zoneId: "AIZ-022",
    riskScore: 74,
    incident: "Retaining wall bulge",
    connectivity: "Restricted",
    population: 15400,
    team: "Aizawl Municipal Response Unit",
    status: "Queued",
    urgency: "Within 12 hours",
    reason: "Dense hillside settlement above a bulging retaining structure on a ridge access road.",
    factors: [
      "88 mm rainfall in the last 24 hours",
      "Soil moisture at 71%",
      "15,400 residents within 500 m",
    ],
    action: "Structural inspection of retaining wall, restrict heavy vehicle movement",
  },
  {
    priority: "medium" as unknown as Severity,
    zone: "Kohima — Zubza Cutting",
    zoneId: "KOH-009",
    riskScore: 68,
    incident: "Minor debris accumulation",
    connectivity: "NH-2 single lane",
    population: 6100,
    team: "PWD Kohima",
    status: "Queued",
    urgency: "Within 24 hours",
    reason: "Recurring minor debris on a national highway cutting with moderate predicted risk.",
    factors: ["64 mm rainfall in the last 24 hours", "Soil moisture at 63%", "Slope angle 34°"],
    action: "Clear debris and inspect drainage outlets",
  },
  {
    priority: "low",
    zone: "Agartala — Baramura Range",
    zoneId: "AGT-012",
    riskScore: 34,
    incident: "Sensor maintenance",
    connectivity: "Open",
    population: 3900,
    team: "State Monitoring Cell",
    status: "Queued",
    urgency: "Routine",
    reason: "Low predicted risk; visit is a scheduled instrumentation check.",
    factors: ["21 mm rainfall in the last 24 hours", "Soil moisture at 42%"],
    action: "Calibrate soil moisture probes",
  },
];

export interface FieldReport {
  id: string;
  location: string;
  type: string;
  severity: Severity;
  reporter: string;
  date: string;
  status: "New" | "Verifying" | "Verified" | "Closed";
  description: string;
}

export const incidentTypes = [
  "Landslide",
  "Road blockage",
  "Slope crack",
  "Soil movement",
  "Flash flood",
  "Infrastructure damage",
];

export const fieldReports: FieldReport[] = [
  {
    id: "FR-1094",
    location: "Sohra Road, km 27, East Khasi Hills",
    type: "Road blockage",
    severity: "critical",
    reporter: "B. Lyngdoh (Village Council)",
    date: "6 Sep 2026, 10:48 IST",
    status: "Verified",
    description:
      "Debris and boulders across both lanes after continuous overnight rain. Vehicles stranded on the Shillong side.",
  },
  {
    id: "FR-1093",
    location: "Rangpo bypass, Gangtok district",
    type: "Landslide",
    severity: "critical",
    reporter: "Insp. T. Bhutia, Sikkim Police",
    date: "6 Sep 2026, 09:32 IST",
    status: "Verifying",
    description: "Fresh slide on the downhill side; retaining wall section displaced by about 4 m.",
  },
  {
    id: "FR-1091",
    location: "Jang Ghat, Tawang",
    type: "Slope crack",
    severity: "high",
    reporter: "L. Khandu (BRO field officer)",
    date: "6 Sep 2026, 08:05 IST",
    status: "Verified",
    description: "Tension crack about 18 m long widening above the road cutting.",
  },
  {
    id: "FR-1088",
    location: "Melthum, Aizawl",
    type: "Infrastructure damage",
    severity: "high",
    reporter: "R. Chhangte (Local Council)",
    date: "5 Sep 2026, 19:40 IST",
    status: "Verifying",
    description: "Retaining wall behind community hall bulging outward with visible seepage.",
  },
  {
    id: "FR-1085",
    location: "Zubza, Kohima",
    type: "Soil movement",
    severity: "moderate",
    reporter: "PWD Junior Engineer",
    date: "5 Sep 2026, 16:12 IST",
    status: "Closed",
    description: "Slow soil creep noticed at the shoulder; barricades installed.",
  },
  {
    id: "FR-1082",
    location: "Kalapahar, Guwahati",
    type: "Flash flood",
    severity: "moderate",
    reporter: "Ward Councillor office",
    date: "5 Sep 2026, 12:25 IST",
    status: "Closed",
    description: "Storm drain overflow flooding two lanes for about 90 minutes.",
  },
];

export interface HistoricalIncident {
  date: string;
  location: string;
  type: string;
  severity: Severity;
  status: string;
}

export const historicalIncidents: HistoricalIncident[] = [
  {
    date: "14 Jul 2026",
    location: "Jang Ghat, Tawang",
    type: "Landslide",
    severity: "high",
    status: "Cleared",
  },
  {
    date: "28 Jun 2026",
    location: "Rangpo, East Sikkim",
    type: "Debris flow",
    severity: "critical",
    status: "Cleared",
  },
  {
    date: "9 Jun 2026",
    location: "Sohra Road, Meghalaya",
    type: "Road blockage",
    severity: "high",
    status: "Cleared",
  },
  {
    date: "22 Aug 2025",
    location: "Jang Ghat, Tawang",
    type: "Slope failure",
    severity: "moderate",
    status: "Restored",
  },
  {
    date: "3 Aug 2025",
    location: "Melthum, Aizawl",
    type: "Landslide",
    severity: "high",
    status: "Restored",
  },
  {
    date: "19 Jul 2024",
    location: "Zubza, Kohima",
    type: "Soil movement",
    severity: "moderate",
    status: "Restored",
  },
];

export const riskFactors = [
  {
    label: "Rainfall intensity",
    value: "96 mm / 24h",
    detail: "Above the 80 mm advisory threshold",
    severity: "high" as Severity,
    contribution: 34,
  },
  {
    label: "Soil moisture",
    value: "78%",
    detail: "Saturated for 2 consecutive days",
    severity: "high" as Severity,
    contribution: 26,
  },
  {
    label: "Slope angle",
    value: "41°",
    detail: "Steep cut slope with limited protection",
    severity: "moderate" as Severity,
    contribution: 21,
  },
  {
    label: "Terrain susceptibility",
    value: "Class IV",
    detail: "Weathered rock with thin soil cover",
    severity: "moderate" as Severity,
    contribution: 12,
  },
  {
    label: "Historical incidents",
    value: "3 since 2019",
    detail: "Recurring failures at the same reach",
    severity: "moderate" as Severity,
    contribution: 7,
  },
];

export const recommendedActions = [
  "Inspect vulnerable road section at km 12–14 of NH-13",
  "Monitor slope movement with daily crack-gauge readings",
  "Alert field officials and BRO detachment on duty",
  "Prepare alternate route via Jang–Lumla link road",
  "Review nearby village evacuation readiness for 3 hamlets",
];

export interface DataSource {
  name: string;
  status: "Connected" | "Demo" | "Pending";
  updated: string;
  type: string;
  detail: string;
}

export const dataSources: DataSource[] = [
  {
    name: "Rainfall data",
    status: "Demo",
    updated: "6 Sep 2026, 11:30 IST",
    type: "Time series — hourly gauge readings",
    detail: "Sample IMD-style station data bundled with this build. No live feed is connected.",
  },
  {
    name: "Weather forecast",
    status: "Demo",
    updated: "6 Sep 2026, 11:00 IST",
    type: "Forecast — 24h and 72h horizon",
    detail: "Demo forecast series used for the risk trend charts.",
  },
  {
    name: "Soil moisture sensors",
    status: "Pending",
    updated: "Not yet configured",
    type: "IoT telemetry",
    detail: "Awaiting district-level sensor onboarding and gateway credentials.",
  },
  {
    name: "Satellite imagery",
    status: "Pending",
    updated: "Not yet configured",
    type: "Raster tiles / change detection",
    detail: "Requires an imagery provider subscription before ingestion can begin.",
  },
  {
    name: "Terrain / slope data",
    status: "Demo",
    updated: "1 Sep 2026",
    type: "DEM-derived slope and aspect",
    detail: "Static sample slope values per zone; PostGIS ingestion planned.",
  },
  {
    name: "Historical landslide records",
    status: "Demo",
    updated: "1 Sep 2026",
    type: "Incident register",
    detail: "Curated sample incident register for the eight demo zones.",
  },
];

export const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
];

export const alertMessagePreview = {
  en: "Early warning: High predicted landslide risk in Tawang (Zone TAW-014). Avoid NH-13 between km 12 and km 14. Follow instructions from district officials.",
  hi: "पूर्व चेतावनी: तवांग (ज़ोन TAW-014) में भूस्खलन का उच्च अनुमानित जोखिम। NH-13 के किलोमीटर 12 से 14 के बीच यात्रा से बचें। ज़िला अधिकारियों के निर्देशों का पालन करें।",
};
