import React, { useMemo, useState } from "react";

import {
  ChevronLeft,
  Send,
  Mic,
  Search,
  History,
  MapPin,
  LocateFixed,
  Navigation,
  Fish,
  FlaskConical,
  Bot,
  ShieldCheck,
  Scale,
  Database,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  FileText,
  Clock3,
  ExternalLink,
  Sparkles,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Circle,
  CircleMarker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

// Map helper
function MapRecenter({ center }) {
  const map = useMap();

  React.useEffect(() => {
    if (center) {
      map.flyTo(center, Math.max(map.getZoom(), 9), {
        duration: 1,
      });
    }
  }, [center, map]);

  return null;
}

// Operation configuration
const OPERATIONS = {
  navigation: {
    label: "Marine Navigation",
    description: "Route safety, weather and hazard analysis",
    icon: Navigation,
  },
  fishing: {
    label: "Commercial Fishing",
    description: "PFZ, SST and chlorophyll intelligence",
    icon: Fish,
  },
  research: {
    label: "Oceanographic Research",
    description: "Ocean parameters and research-zone analysis",
    icon: FlaskConical,
  },
  geofencing: {
    label: "Geofencing & Hazards",
    description: "IMBL boundaries & restricted marine zones",
    icon: ShieldCheck,
  },
};

// Default and Dynamic Scenario Decisions for the 4 Questions
const DEFAULT_DECISION = {
  recommendation: "Current marine conditions are suitable for operations with moderate caution.",
  alternative: "Delay the operation by approximately 2 hours if lower wave activity is preferred.",
  comparison: [
    { name: "Proceed Now", risk: "Moderate", time: "Fastest", cost: "Normal" },
    { name: "Alternative Route", risk: "Low", time: "+35 min", cost: "+8%" },
    { name: "Delay Operation", risk: "Very Low", time: "+2 hrs", cost: "Normal" },
  ],
  evidence: [
    { source: "Weather Intelligence Agent", detail: "Wind speed approximately 15 knots." },
    { source: "Ocean Analytics Agent", detail: "Wave height approximately 1.2 metres." },
    { source: "Risk Assessment Agent", detail: "No critical maritime hazard detected in the selected area." },
  ],
  dataSources: [
    {
      provider: "INCOIS", dataset: "Ocean State Forecast / Marine Ocean Data", category: "Government Oceanographic Data", usedFor: "Wave height, ocean state, currents and marine-condition assessment", sourceUrl: "https://incois.gov.in", retrievedAt: "Latest available dataset", status: "Verified",
    },
    {
      provider: "India Meteorological Department (IMD)", dataset: "Marine Weather Forecast & Warnings", category: "Government Weather Data", usedFor: "Wind, rainfall, severe weather, cyclone and marine-warning assessment", sourceUrl: "https://mausam.imd.gov.in", retrievedAt: "Latest available forecast", status: "Verified",
    },
    {
      provider: "OpenStreetMap", dataset: "OpenStreetMap Base Map", category: "Geospatial Reference Layer", usedFor: "Coastline, place names and geographic reference used by the map", sourceUrl: "https://www.openstreetmap.org", retrievedAt: "Live map tiles", status: "Active",
    },
    {
      provider: "ISRO MOSDAC", dataset: "Earth Observation Satellite Telemetry", category: "Satellite Intelligence", usedFor: "Real-time spatial verification and cloud cover", sourceUrl: "https://mosdac.gov.in", retrievedAt: "Live telemetry", status: "Active",
    },
  ],
  confidence: 92,
  justification: "Multi-agent synthesis completed. The Geospatial Agent verified the route is clear of restricted geofences. The Weather Agent correlated IMD forecasts showing safe wind parameters, and the Ocean Agent confirmed wave swells are within operational limits.",
  lastUpdated: "Just now",
};

// Customized AI Responses for the 4 Suggested Queries
const SCENARIOS = {
  pfz: {
    ...DEFAULT_DECISION,
    recommendation: "Proceed to PFZ Sector 4B (18.84° N, 72.58° E). Ocean analytics indicate a high chlorophyll bloom (1.8 mg/m³) ideal for pelagic fishing.",
    alternative: "Sector 2A is a secondary option if Sector 4B becomes crowded with other vessels.",
    comparison: [
      { name: "Sector 4B (Primary)", risk: "Low", time: "Tomorrow · 04:30 AM", cost: "Normal" },
      { name: "Sector 2A (Secondary)", risk: "Low", time: "Tomorrow · 06:00 AM", cost: "+5% Fuel" },
    ],
    justification: "The Ocean Analytics Agent correlated INCOIS SST and chlorophyll telemetry to pinpoint high-yield zones. The Weather Agent confirmed safe transit conditions to Sector 4B for tomorrow morning.",
  },
  safety: {
    ...DEFAULT_DECISION,
    recommendation: "Yes, it is SAFE to venture tomorrow morning. The optimal operational window is Wednesday between 05:00 AM and 10:30 AM.",
    alternative: "Avoid afternoon operations. Localized squalls and increased wind speeds are predicted after 01:00 PM.",
    comparison: [
      { name: "Morning Window (05:00 AM)", risk: "Very Low", time: "Optimal", cost: "Normal" },
      { name: "Afternoon Window (01:00 PM)", risk: "Moderate", time: "Delayed", cost: "High Risk" },
    ],
    justification: "IMD weather forecasts show minimal swell (1.2m) and clear visibility for tomorrow morning. The Risk Assessment agent clears the morning window but flags afternoon instability.",
  },
  route: {
    ...DEFAULT_DECISION,
    recommendation: "Proceed using the AI-optimized eastern corridor. This route actively bypasses the 3.1m swell detected in the western grid.",
    alternative: "Delay departure by 4 hours until the tide recedes and swell drops below 2.0m across all sectors.",
    comparison: [
      { name: "Eastern Corridor Route", risk: "Low", time: "Immediate", cost: "+2% Fuel" },
      { name: "Direct Route (Western Grid)", risk: "High", time: "Fastest", cost: "Wave Hazard" },
      { name: "Delay Departure", risk: "Very Low", time: "+4 Hours", cost: "Normal" },
    ],
    justification: "The Route Optimization and Ocean Analytics Agents mapped current wave heights. Rerouting via the eastern corridor adds 12 minutes to transit but avoids dangerous 3.1m swells, ensuring vessel safety.",
  },
  alert: {
    ...DEFAULT_DECISION,
    confidence: 98,
    recommendation: "CRITICAL ALERT: Cyclonic circulation detected 150 NM South-West. Deep depression intensifying. Do NOT venture into deep sea.",
    alternative: "Remain in port. Secure all vessels at harbor and monitor continuous IMD broadcasts.",
    comparison: [
      { name: "Remain in Port", risk: "None", time: "N/A", cost: "Safe" },
      { name: "Venture to Sea", risk: "CRITICAL", time: "Immediate", cost: "Severe Danger" },
    ],
    justification: "The Alert & Weather Intelligence Agents intercepted a high-priority IMD cyclone warning. The Risk Assessment Agent has geofenced your sector as a severe hazard zone until the depression passes.",
  },
};

// Main page
export default function AgentChatPage({ agent, back }) {
  const AgentIcon = agent?.icon || Bot;

  const ISRO_QUERIES = [
    { text: "Where is the nearest Potential Fishing Zone (PFZ) today?", key: "pfz" },
    { text: "Is it safe to venture into the sea tomorrow morning?", key: "safety" },
    { text: "What is the safest route avoiding current swell conditions?", key: "route" },
    { text: "Are there any high-wave or cyclonic alerts near my sector?", key: "alert" },
  ];

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hello! I am the ${
        agent?.name || "Planner Agent"
      }. I orchestrate workflows with my specialized sub-agents. How can we assist with your marine operations today?`,
    },
  ]);

  const [input, setInput] = useState("");
  const [stage, setStage] = useState("idle");
  const [language, setLanguage] = useState("auto");
  const [operation, setOperation] = useState("navigation");
  const [activeScenario, setActiveScenario] = useState(null); 
  const [activeTab, setActiveTab] = useState("decision");
  const [historySearch, setHistorySearch] = useState("");
  const [mapType, setMapType] = useState("map");
  const [userLocation, setUserLocation] = useState([18.922, 72.834]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [decision, setDecision] = useState(DEFAULT_DECISION);
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, title: "Weather near Mumbai coast", time: "10 min ago" },
    { id: 2, title: "Safe route assessment", time: "32 min ago" },
    { id: 3, title: "High-wave risk check", time: "1 hr ago" },
  ]);

  const findMyLocation = () => {
    if (!navigator.geolocation) return;
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        setLocationLoading(false);
      },
      () => {
        setLocationLoading(false);
      }
    );
  };

  // Dynamic Map Data depending on which query was clicked
  const mapData = useMemo(() => {
    const [lat, lng] = userLocation;

    if (activeScenario === "pfz" || operation === "fishing") {
      return {
        route: [],
        lines: [],
        zones: [
          { center: [lat + 0.08, lng + 0.07], radius: 4500, label: "Primary PFZ (Sector 4B)", color: "#11663F", fill: "#22c55e" },
          { center: [lat - 0.06, lng + 0.14], radius: 3500, label: "Secondary PFZ (Sector 2A)", color: "#11663F", fill: "#22c55e" },
        ],
        hazards: [],
      };
    }

    if (activeScenario === "route") {
      return {
        route: [
          [lat, lng],
          [lat + 0.05, lng + 0.12], 
          [lat + 0.12, lng + 0.16],
          [lat + 0.15, lng + 0.22],
        ],
        lines: [],
        zones: [],
        hazards: [
          { position: [lat + 0.08, lng + 0.05], label: "Heavy Swell Area (3.1m)", color: "#ea580c", fill: "#f97316" },
        ],
      };
    }

    if (activeScenario === "alert" || operation === "geofencing") {
      return {
        route: [],
        lines: [
          { positions: [[lat + 0.2, lng - 0.2], [lat - 0.2, lng - 0.1]], color: "#ef4444", dashArray: "10, 10", label: "IMBL / Restricted Zone" },
        ],
        zones: [
          { center: [lat + 0.15, lng - 0.15], radius: 8000, label: "Severe Cyclone Zone", color: "#dc2626", fill: "#ef4444" },
        ],
        hazards: [
          { position: [lat + 0.05, lng - 0.08], label: "Squall Warning", color: "#dc2626", fill: "#dc2626" },
        ],
      };
    }

    if (activeScenario === "safety" || operation === "navigation") {
      return {
        route: [
          [lat, lng],
          [lat + 0.04, lng + 0.08],
          [lat + 0.1, lng + 0.15],
        ],
        lines: [],
        zones: [
           { center: [lat + 0.07, lng + 0.12], radius: 6000, label: "Safe Operating Window", color: "#11663F", fill: "#4ade80" },
        ],
        hazards: [],
      };
    }

    return {
      route: [],
      lines: [],
      zones: [{ center: [lat + 0.07, lng + 0.05], radius: 5500, label: "Research Survey Area" }],
      hazards: [{ position: [lat + 0.02, lng + 0.1], label: "Observation Point" }],
    };
  }, [operation, userLocation, activeScenario]);

  // Enhanced Multi-Agent Workflow Sequence
  const handleSend = (suggestedText = null, scenarioKey = null) => {
    const textToSend = typeof suggestedText === "string" ? suggestedText : input;
    
    if (!textToSend.trim() || stage !== "idle") return;

    const question = textToSend.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
    ]);

    setRecentActivity((prev) => [
      { id: Date.now(), title: question, time: "Just now" },
      ...prev.slice(0, 4),
    ]);

    setInput("");
    
    if (scenarioKey) {
      setActiveScenario(scenarioKey);
      if (scenarioKey === "pfz") setOperation("fishing");
      else if (scenarioKey === "alert") setOperation("geofencing");
      else setOperation("navigation");
    } else {
      setActiveScenario(null);
    }

    // Agent Processing Timeline
    setStage("planner");
    
    setTimeout(() => {
      setStage("dataFetching");
    }, 800);

    setTimeout(() => {
      setStage("analytics");
    }, 1800);

    setTimeout(() => {
      setStage("routing");
    }, 2800);

    setTimeout(() => {
      setStage("decision");
    }, 3800);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Analysis completed. The multi-agent workflow has updated the map, generated an actionable recommendation, and cited verified INCOIS/IMD sources on the right panel.",
        },
      ]);

      const finalDecision = scenarioKey ? SCENARIOS[scenarioKey] : DEFAULT_DECISION;
      
      setDecision({
        ...finalDecision,
        lastUpdated: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      setActiveTab("decision");
      setStage("idle");
    }, 4800);
  };

  const filteredHistory = recentActivity.filter((item) =>
    item.title.toLowerCase().includes(historySearch.toLowerCase())
  );

  const getStageText = () => {
    if (stage === "planner") return "Planner Agent decomposing intent...";
    if (stage === "dataFetching") return "Marine Data & Weather Agents fetching IMD/INCOIS feeds...";
    if (stage === "analytics") return "Ocean Analytics & Geospatial Agents mapping vectors...";
    if (stage === "routing") return "Route Optimization, Risk & Alert Agents verifying safety...";
    if (stage === "decision") return "Decision Engine synthesizing final recommendations...";
    return "Systems Online & Ready";
  };

  return (
    <div className="h-full flex flex-col min-h-0 bg-[#f8fafc]">
      
      {/* HEADER BAR: Removed top padding to eliminate empty space, moved Agent Names to the right */}
      <div className="flex items-center justify-between pb-3 mb-3 shrink-0 border-b border-slate-200 bg-[#f8fafc]">
        <div className="flex items-center gap-3">
          <button
            onClick={back}
            className="p-1.5 rounded-md hover:bg-slate-200/50 transition text-slate-500 hover:text-[#0a1b35]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0a1b35] to-[#11663F] flex items-center justify-center shadow-sm">
            <AgentIcon className="h-5 w-5 text-white" />
          </div>

          <div className="flex items-center gap-2.5">
            <h1 className="text-base font-bold text-[#0a1b35]">
              {agent?.name || "Planner Agent"}
            </h1>
            
            <span className="text-[11px] text-emerald-800 font-bold flex items-center gap-1.5 bg-emerald-100/60 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-sm">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              {stage === "idle" ? "Online & Ready" : "Agents Working..."}
            </span>

            {/* Agent Names Placed to the Right of the Badge */}
            <div className="hidden md:flex items-center gap-1.5 ml-1 border-l border-slate-300 pl-3 text-[10px] text-slate-500 font-medium tracking-wide">
              <span className="text-emerald-500 text-[10px]">●</span> 
              ACTIVE AGENTS: Weather • Ocean Analytics • Marine Data • Geospatial • Route Optimization • Risk • Alert
            </div>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 hidden xl:flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
           Marine Decision Workspace
        </div>
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-[38%_62%] gap-4 min-h-0 pb-1">
        
        {/* LEFT COLUMN: CHAT INTERFACE (Light Theme) */}
        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col min-h-0 shadow-sm">
          
          {/* Language Selector */}
          <div className="p-3 border-b border-slate-100 shrink-0 bg-slate-50/50">
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1.5">
              Select Language
            </p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 bg-white shadow-sm focus:outline-none focus:border-[#11663F] focus:ring-1 focus:ring-[#11663F]"
            >
              <option value="auto">✨ Auto-Detect Intent (Indic NLP)</option>
              <option>English</option>
              <option>Marathi (मराठी)</option>
              <option>Hindi (हिंदी)</option>
              <option>Tamil (தமிழ்)</option>
              <option>Bengali (বাংলা)</option>
            </select>
          </div>

          <div className="p-3 border-b border-slate-100 shrink-0 bg-slate-50/50">
            <div className="flex items-center gap-2 mb-2.5">
              <History className="w-3.5 h-3.5 text-[#0a1b35]" />
              <h2 className="text-xs font-semibold text-[#0a1b35]">
                History & Recent Activity
              </h2>
            </div>

            <div className="relative mb-2.5">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Search recent activity..."
                className="w-full border border-slate-200 bg-white rounded-lg pl-8 pr-2.5 py-1.5 text-xs shadow-sm focus:outline-none focus:border-[#11663F] focus:ring-1 focus:ring-[#11663F]"
              />
            </div>

            <button
              onClick={findMyLocation}
              className="w-full flex items-center justify-center gap-1.5 border border-emerald-200/60 bg-emerald-50 text-emerald-700 rounded-lg py-1.5 text-xs font-semibold hover:bg-emerald-100 transition mb-2 shadow-sm"
            >
              {locationLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <LocateFixed className="w-3.5 h-3.5" />
              )}
              Search Near My Location
            </button>

            {/* History List */}
            <div className="max-h-[85px] overflow-y-auto space-y-1">
              {filteredHistory.slice(0, 3).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setInput(item.title)}
                  className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition group"
                >
                  <div className="text-xs text-slate-700 truncate group-hover:text-[#11663F] font-medium">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {item.time}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Heading */}
          <div className="px-3 py-2.5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
            <div>
              <p className="text-xs font-bold text-[#0a1b35]">
                Natural Language Chat
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                Contextual, multi-turn reasoning
              </p>
            </div>
            {stage !== "idle" && (
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                <Loader2 className="h-3 w-3 animate-spin" />
                AI Working
              </div>
            )}
          </div>

          {/* Messages Area (Light Theme) */}
          <div className="flex-1 bg-slate-50/60 px-3 py-3 overflow-y-auto min-h-0 flex flex-col">
            <div className="space-y-3 flex-1">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#0a1b35] text-white rounded-br-sm"
                        : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Enhanced Dynamic Agent Loading Bubble */}
              {stage !== "idle" && (
                <div className="flex justify-start">
                  <div className="bg-white border border-emerald-200 rounded-xl px-3 py-2.5 shadow-sm flex items-center gap-2.5 rounded-bl-sm">
                    <div className="flex gap-1 items-center shrink-0">
                      <span className="w-1.5 h-1.5 bg-[#11663F] rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-[#11663F] rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                      <span className="w-1.5 h-1.5 bg-[#11663F] rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700">{getStageText()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* ISRO Suggested Prompts inside Chat - Rendered in a 2x2 horizontal Grid */}
            {messages.length < 3 && stage === "idle" && (
              <div className="mt-4 pt-3 border-t border-slate-200/60">
                <p className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-500" /> Suggested Scenarios
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {ISRO_QUERIES.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q.text, q.key)}
                      className="text-[11px] font-medium bg-white border border-emerald-200/60 text-emerald-800 px-3 py-2 rounded-lg hover:bg-emerald-50/50 hover:border-emerald-300 transition text-left shadow-sm leading-relaxed"
                    >
                      {q.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-slate-200 bg-white shrink-0">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask in your language..."
                  className="w-full border border-slate-300 bg-slate-50 rounded-lg pl-3 pr-9 py-2.5 text-xs shadow-inner focus:outline-none focus:ring-1 focus:ring-[#11663F] focus:border-[#11663F]"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#11663F] transition"
                  title="Voice input"
                >
                  <Mic className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || stage !== "idle"}
                className="bg-gradient-to-r from-[#11663F] to-[#0e5131] hover:from-[#0e5131] hover:to-[#093d24] disabled:from-slate-300 disabled:to-slate-300 text-white px-4 rounded-lg flex items-center gap-1.5 shrink-0 transition text-xs font-bold shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </section>

      
        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col min-h-0 shadow-sm">
          {/* Operation Selector */}
          <div className="p-3 shrink-0 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">
                  Current Operation
                </p>
                <h2 className="text-sm font-bold text-[#0a1b35]">
                  Select Type of Operation
                </h2>
              </div>

              <div className="min-w-[220px]">
                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold bg-white text-[#0a1b35] shadow-sm focus:outline-none focus:border-[#11663F] focus:ring-1 focus:ring-[#11663F]"
                >
                  {Object.entries(OPERATIONS).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative h-[32%] min-h-[220px] shrink-0 border-b border-slate-200">
            <div className="absolute z-[500] top-2 left-2 bg-white/95 shadow-sm border border-slate-200 rounded-lg p-0.5 flex">
              <button
                onClick={() => setMapType("map")}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition ${
                  mapType === "map" ? "bg-[#0a1b35] text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Map
              </button>
              <button
                onClick={() => setMapType("satellite")}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition ${
                  mapType === "satellite" ? "bg-[#0a1b35] text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Satellite
              </button>
            </div>

            <div className="absolute z-[500] top-2 right-2">
              <button
                onClick={findMyLocation}
                className="bg-white/95 border border-slate-200 shadow-sm p-1.5 rounded-lg text-[#0a1b35] hover:bg-slate-100 transition"
              >
                <LocateFixed className="h-4 w-4" />
              </button>
            </div>

            <MapContainer
              center={userLocation}
              zoom={9}
              scrollWheelZoom
              className="w-full h-full"
            >
              <MapRecenter center={userLocation} />

              {mapType === "map" ? (
                <TileLayer
                  attribution="&copy; OpenStreetMap"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              ) : (
                <TileLayer
                  attribution="Tiles &copy; Esri"
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
              )}

              <CircleMarker
                center={userLocation}
                radius={6}
                pathOptions={{
                  color: "#0a1b35",
                  fillColor: "#11663F",
                  fillOpacity: 1,
                }}
              >
                <Popup>
                  <strong>Your Location</strong>
                </Popup>
              </CircleMarker>

              {mapData.route.length > 0 && (
                <Polyline
                  positions={mapData.route}
                  pathOptions={{
                    color: "#11663F",
                    weight: 3.5,
                    opacity: 0.9,
                  }}
                />
              )}

              {/* Added Line Mapping for Borders */}
              {mapData.lines && mapData.lines.map((line, idx) => (
                <Polyline
                  key={`line-${idx}`}
                  positions={line.positions}
                  pathOptions={{
                    color: line.color,
                    weight: 3,
                    dashArray: line.dashArray,
                  }}
                >
                  <Popup>
                    <strong>{line.label}</strong>
                  </Popup>
                </Polyline>
              ))}

              {mapData.zones.map((zone, index) => (
                <Circle
                  key={index}
                  center={zone.center}
                  radius={zone.radius}
                  pathOptions={{
                    color: zone.color || "#11663F",
                    fillColor: zone.fill || "#22c55e",
                    fillOpacity: 0.18,
                    weight: 2,
                  }}
                >
                  <Popup>
                    <strong>{zone.label}</strong>
                  </Popup>
                </Circle>
              ))}

              {mapData.hazards.map((hazard, index) => (
                <CircleMarker
                  key={index}
                  center={hazard.position}
                  radius={5}
                  pathOptions={{
                    color: hazard.color || "#b45309",
                    fillColor: hazard.fill || "#f59e0b",
                    fillOpacity: 1,
                  }}
                >
                  <Popup>
                    <strong>{hazard.label}</strong>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>

          <div className="flex-1 flex flex-col min-h-0 bg-slate-50/40">
            {/* Tabs Header */}
            <div className="px-3 pt-2 border-b border-slate-200 bg-white shrink-0">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab("decision")}
                  className={`pb-2 text-xs font-bold border-b-2 transition ${
                    activeTab === "decision"
                      ? "border-[#11663F] text-[#11663F]"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Decision & Recs
                </button>

                <button
                  onClick={() => setActiveTab("evidence")}
                  className={`pb-2 text-xs font-bold border-b-2 transition ${
                    activeTab === "evidence"
                      ? "border-[#11663F] text-[#11663F]"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Agent Reasoning
                </button>

                <button
                  onClick={() => setActiveTab("sources")}
                  className={`pb-2 text-xs font-bold border-b-2 transition ${
                    activeTab === "sources"
                      ? "border-[#11663F] text-[#11663F]"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Data Sources
                </button>
              </div>
            </div>

            {/* Scrollable Tab Panels */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
              {activeTab === "decision" && (
                <div className="space-y-3">
                  <div className="bg-white border border-emerald-200 rounded-xl p-3.5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 shrink-0 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
                        <CheckCircle2 className="w-4 h-4 text-[#11663F]" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-700">
                          Recommended Action
                        </p>
                        <p className="text-[12px] text-slate-700 mt-1 leading-relaxed font-medium">
                          {decision.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-orange-200 rounded-xl p-3.5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 shrink-0 rounded-lg bg-orange-50 flex items-center justify-center border border-orange-100">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-extrabold text-orange-600">
                          Alternative Action
                        </p>
                        <p className="text-[12px] text-slate-700 mt-1 leading-relaxed font-medium">
                          {decision.alternative}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="px-3.5 py-2.5 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                      <Scale className="w-4 h-4 text-[#0a1b35]" />
                      <p className="text-xs font-bold text-[#0a1b35]">
                        Compare Operational Scenarios
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-500 bg-white">
                            <th className="text-left font-bold px-3.5 py-2.5">Scenario</th>
                            <th className="text-left font-bold px-3.5 py-2.5">Risk</th>
                            <th className="text-left font-bold px-3.5 py-2.5">Time</th>
                            <th className="text-left font-bold px-3.5 py-2.5">Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {decision.comparison.map((item, index) => (
                            <tr key={index} className="border-b last:border-b-0 border-slate-50 bg-white hover:bg-slate-50 transition">
                              <td className="px-3.5 py-2.5 font-bold text-[#0a1b35]">{item.name}</td>
                              <td className="px-3.5 py-2.5 font-medium text-slate-600">{item.risk}</td>
                              <td className="px-3.5 py-2.5 font-medium text-slate-600">{item.time}</td>
                              <td className="px-3.5 py-2.5 font-medium text-slate-600">{item.cost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 flex items-center gap-1 justify-end font-medium">
                    <Clock3 className="w-3 h-3" />
                    Updated {decision.lastUpdated}
                  </div>
                </div>
              )}

              {activeTab === "evidence" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#11663F]" />
                        <p className="text-xs font-bold text-[#0a1b35]">Safety Confidence</p>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-extrabold text-[#11663F]">{decision.confidence}%</span>
                        <span className="text-[10px] text-slate-400 font-medium">High</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-[#11663F] rounded-full"
                          style={{ width: `${decision.confidence}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Database className="w-4 h-4 text-[#0a1b35]" />
                        <p className="text-xs font-bold text-[#0a1b35]">Active Intelligence</p>
                      </div>
                      <span className="text-2xl font-extrabold text-[#0a1b35]">{decision.evidence.length}</span>
                      <span className="text-[10px] text-slate-400 font-medium ml-1.5">Specialized Agents</span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <FileText className="w-4 h-4 text-[#0a1b35]" />
                      <p className="text-xs font-bold text-[#0a1b35]">Agent Synthesis Logic</p>
                    </div>
                    <p className="text-[11.5px] text-slate-600 leading-relaxed font-medium">{decision.justification}</p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50/50">
                      <p className="text-xs font-bold text-[#0a1b35]">Specialized Agent Telemetry</p>
                    </div>
                    <div>
                      {decision.evidence.map((item, index) => (
                        <div key={index} className="p-3 border-b last:border-b-0 border-slate-100 flex gap-2.5">
                          <div className="w-6 h-6 rounded-full bg-[#11663F]/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Bot className="w-3.5 h-3.5 text-[#11663F]" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#0a1b35]">{item.source}</p>
                            <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "sources" && (
                <div className="space-y-3">
                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#0a1b35]">Verified Data Sources</p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">Official oceanographic & weather feeds</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 shadow-sm">
                      {decision.dataSources?.length || 0} Connected
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {(decision.dataSources || []).map((source, index) => (
                      <div
                        key={`${source.provider}-${index}`}
                        className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1.5">
                              <span className="text-xs font-bold text-[#0a1b35]">{source.provider}</span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-100 text-slate-600 font-bold uppercase tracking-wider">
                                {source.category}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-slate-700">{source.dataset}</p>
                            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-medium">{source.usedFor}</p>
                          </div>

                          <a
                            href={source.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#11663F]/20 bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-[#11663F] hover:bg-emerald-100 transition shrink-0 shadow-sm"
                          >
                            <span>Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}