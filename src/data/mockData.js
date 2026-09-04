import { 
  Activity, Bot, CloudRain, Cpu, Download, Fish, Globe, 
  LayoutDashboard, Map as MapIcon, Route, ShieldAlert, 
  TriangleAlert, Waves 
} from "lucide-react";

export const MOCK_ALERTS = [
  { id: 1, type: "Cyclone Warning", severity: "Critical", location: "Bay of Bengal, near Odisha coast", time: "10:30 AM", date: "27 Aug 2026", desc: "Cyclone activity detected. Small and medium vessels should monitor official advisories." },
  { id: 2, type: "High Wave", severity: "High", location: "Arabian Sea, off Mumbai", time: "09:15 AM", date: "27 Aug 2026", desc: "Waves up to 4.5 m expected. Small vessels are advised to return to port." },
  { id: 3, type: "Heavy Rain", severity: "Moderate", location: "Kerala Coast", time: "08:45 AM", date: "27 Aug 2026", desc: "Continuous heavy rainfall expected during the next 24 hours." },
  { id: 4, type: "Lightning", severity: "Low", location: "Gulf of Mannar", time: "06:20 AM", date: "27 Aug 2026", desc: "Isolated thunderstorms with lightning are predicted." }
];

export const MOCK_PFZ = [
  { id: 1, lat: 18.5, lng: 72.1, dist: "45 NM", sst: "28.2°C", chloro: "1.5 mg/m³", score: 92, confidence: "High" },
  { id: 2, lat: 19.1, lng: 71.8, dist: "60 NM", sst: "27.9°C", chloro: "2.1 mg/m³", score: 88, confidence: "High" },
  { id: 3, lat: 17.8, lng: 72.5, dist: "32 NM", sst: "28.5°C", chloro: "1.1 mg/m³", score: 75, confidence: "Moderate" }
];

export const MOCK_AGENTS = [
  { id: "planner", name: "Planner Agent", desc: "Orchestrates workflows and assigns tasks to specialized agents.", icon: Cpu },
  { id: "weather", name: "Weather Agent", desc: "Analyzes meteorological data, cyclones, storms and rainfall.", icon: CloudRain },
  { id: "ocean", name: "Ocean Analytics Agent", desc: "Processes SST, chlorophyll and ocean-current intelligence.", icon: Waves },
  { id: "data", name: "Marine Data Agent", desc: "Retrieves and organizes satellite and marine datasets.", icon: Activity },
  { id: "geo", name: "Geospatial Agent", desc: "Handles coordinates, spatial queries and map intelligence.", icon: Globe },
  { id: "risk", name: "Risk Assessment Agent", desc: "Calculates safety scores and operational risk levels.", icon: ShieldAlert },
  { id: "route", name: "Route Optimization Agent", desc: "Finds safer and faster maritime routes around hazards.", icon: Route },
  { id: "alert", name: "Alert Agent", desc: "Monitors threats and prepares prioritized warnings.", icon: TriangleAlert }
];

export const WAVE_TREND = [
  { day: "21 Aug", wave: 2.1 }, { day: "22 Aug", wave: 2.3 },
  { day: "23 Aug", wave: 2.5 }, { day: "24 Aug", wave: 2.4 },
  { day: "25 Aug", wave: 2.8 }, { day: "26 Aug", wave: 3.1 },
  { day: "27 Aug", wave: 2.9 }
];

export const OCEAN_DATA = [
  { time: "00:00", sst: 28.1, wave: 1.2 }, { time: "04:00", sst: 27.9, wave: 1.5 },
  { time: "08:00", sst: 28.3, wave: 2.1 }, { time: "12:00", sst: 28.7, wave: 2.4 },
  { time: "16:00", sst: 28.5, wave: 1.8 }, { time: "20:00", sst: 28.2, wave: 1.4 }
];

export const ALERT_DISTRIBUTION = [
  { name: "Weather", value: 35 }, { name: "Navigation", value: 25 },
  { name: "Security", value: 20 }, { name: "Environment", value: 20 }
];

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "agents", label: "AI Marine Agents", icon: Bot },
  { id: "map", label: "Marine Map", icon: MapIcon },
  { id: "alerts", label: "Warnings & Alerts", icon: TriangleAlert },
  { id: "pfz", label: "Potential Fishing Zones", icon: Fish },
  { id: "ocean", label: "Ocean Intelligence", icon: Waves },
  { id: "routes", label: "Safe Route Planner", icon: Route },
  { id: "geofence", label: "Geofencing", icon: ShieldAlert },
  { id: "reports", label: "Reports & Analytics", icon: Download }
];