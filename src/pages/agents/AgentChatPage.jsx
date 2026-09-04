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
};

const DEFAULT_DECISION = {
  recommendation:
    "Current marine conditions are suitable for operations with moderate caution.",

  alternative:
    "Delay the operation by approximately 2 hours if lower wave activity is preferred.",

  comparison: [
    {
      name: "Proceed Now",
      risk: "Moderate",
      time: "Fastest",
      cost: "Normal",
    },
    {
      name: "Alternative Route",
      risk: "Low",
      time: "+35 min",
      cost: "+8%",
    },
    {
      name: "Delay Operation",
      risk: "Very Low",
      time: "+2 hrs",
      cost: "Normal",
    },
  ],

  evidence: [
    {
      source: "Weather Intelligence Agent",
      detail: "Wind speed approximately 15 knots.",
    },
    {
      source: "Ocean Intelligence Agent",
      detail: "Wave height approximately 1.2 metres.",
    },
    {
      source: "Risk Assessment Agent",
      detail: "No critical maritime hazard detected in the selected area.",
    },
  ],

  dataSources: [
    {
      provider: "INCOIS",
      dataset: "Ocean State Forecast / Marine Ocean Data",
      category: "Government Oceanographic Data",
      usedFor: "Wave height, ocean state, currents and marine-condition assessment",
      sourceUrl: "https://incois.gov.in",
      retrievedAt: "Latest available dataset",
      status: "Verified",
    },
    {
      provider: "India Meteorological Department (IMD)",
      dataset: "Marine Weather Forecast & Warnings",
      category: "Government Weather Data",
      usedFor: "Wind, rainfall, severe weather, cyclone and marine-warning assessment",
      sourceUrl: "https://mausam.imd.gov.in",
      retrievedAt: "Latest available forecast",
      status: "Verified",
    },
    {
      provider: "OpenStreetMap",
      dataset: "OpenStreetMap Base Map",
      category: "Geospatial Reference Layer",
      usedFor: "Coastline, place names and geographic reference used by the map",
      sourceUrl: "https://www.openstreetmap.org",
      retrievedAt: "Live map tiles",
      status: "Active",
    },
  ],

  confidence: 88,

  justification:
    "The recommendation is based on combined weather, wave, route and hazard intelligence for the selected operational area.",

  lastUpdated: "Just now",
};

// Main page
export default function AgentChatPage({ agent, back }) {
  const AgentIcon = agent?.icon || Bot;

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hello! I am the ${
        agent?.name || "Marine Intelligence Agent"
      }. How can I assist you with your marine operation today?`,
    },
  ]);

  const [input, setInput] = useState("");
  const [stage, setStage] = useState("idle");
  const [language, setLanguage] = useState("English");
  const [operation, setOperation] = useState("navigation");
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

  const mapData = useMemo(() => {
    const [lat, lng] = userLocation;

    if (operation === "fishing") {
      return {
        route: [],
        zones: [
          {
            center: [lat + 0.08, lng + 0.07],
            radius: 4500,
            label: "Potential Fishing Zone",
          },
          {
            center: [lat - 0.06, lng + 0.14],
            radius: 3500,
            label: "High Productivity Zone",
          },
        ],
        hazards: [],
      };
    }

    if (operation === "research") {
      return {
        route: [],
        zones: [
          {
            center: [lat + 0.07, lng + 0.05],
            radius: 5500,
            label: "Research Survey Area",
          },
        ],
        hazards: [
          {
            position: [lat + 0.02, lng + 0.1],
            label: "Observation Point",
          },
        ],
      };
    }

    return {
      route: [
        [lat, lng],
        [lat + 0.04, lng + 0.08],
        [lat + 0.1, lng + 0.15],
        [lat + 0.14, lng + 0.24],
      ],
      zones: [],
      hazards: [
        {
          position: [lat + 0.07, lng + 0.12],
          label: "Moderate Wave Zone",
        },
      ],
    };
  }, [operation, userLocation]);

  const handleSend = () => {
    if (!input.trim() || stage !== "idle") return;

    const question = input.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
    ]);

    setRecentActivity((prev) => [
      { id: Date.now(), title: question, time: "Just now" },
      ...prev.slice(0, 4),
    ]);

    setInput("");
    setStage("planner");

    setTimeout(() => {
      setStage("specialized");
    }, 900);

    setTimeout(() => {
      setStage("decision");
    }, 1800);

    setTimeout(() => {
      const operationLabel = OPERATIONS[operation].label;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Analysis completed. I have updated the operational intelligence, map, recommended action and supporting evidence on the right panel.",
        },
      ]);

      setDecision({
        ...DEFAULT_DECISION,
        recommendation:
          operation === "navigation"
            ? "Proceed using the recommended marine route while maintaining caution near the identified moderate-wave zone."
            : operation === "fishing"
            ? "Prioritize the highlighted Potential Fishing Zone while continuously monitoring weather and sea-state conditions."
            : "Proceed with the survey inside the highlighted research area and use the marked observation point for detailed measurements.",

        justification: `The Planner, Weather, Ocean, Geospatial and Risk agents analyzed the request for ${operationLabel}. The recommendation combines operational conditions, geospatial context and current marine risk indicators.`,

        lastUpdated: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      setActiveTab("decision");
      setStage("idle");
    }, 2700);
  };

  const filteredHistory = recentActivity.filter((item) =>
    item.title.toLowerCase().includes(historySearch.toLowerCase())
  );

  const getStageText = () => {
    if (stage === "planner") return "Planner Agent analysing request...";
    if (stage === "specialized") return `${agent?.name || "Marine Agent"} processing marine data...`;
    if (stage === "decision") return "Decision Engine preparing recommendation...";
    return "Online & Ready";
  };

  const OperationIcon = OPERATIONS[operation].icon;

  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="flex items-center justify-between py-1 px-1 mb-2 shrink-0 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={back}
            className="p-1 rounded-md hover:bg-gray-100 transition"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>

          <div className="w-8 h-8 rounded-lg bg-[#0a1b35]/5 flex items-center justify-center">
            <AgentIcon className="h-4 w-4 text-[#0a1b35]" />
          </div>

          <div className="flex items-center gap-2.5">
            <h1 className="text-base font-bold text-[#0a1b35]">
              {agent?.name || "Marine Intelligence Agent"}
            </h1>
            <span className="text-[11px] text-green-700 font-medium flex items-center gap-1.5 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              {getStageText()}
            </span>
          </div>
        </div>

        <div className="text-[11px] text-gray-400 hidden xl:block">
          SagarMitra AI Marine Decision Workspace
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 xl:grid-cols-[38%_62%] gap-3 min-h-0 pb-1">
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col min-h-0 shadow-sm">
          {/* Language Selector */}
          <div className="p-3 border-b border-gray-200 shrink-0">
            <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
              Select Language
            </p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 bg-white focus:outline-none focus:border-[#11663F]"
            >
              <option>English</option>
              <option>Marathi (मराठी)</option>
              <option>Hindi (हिंदी)</option>
            </select>
          </div>

          <div className="p-3 border-b border-gray-200 shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <History className="w-3.5 h-3.5 text-[#0a1b35]" />
              <h2 className="text-xs font-semibold text-[#0a1b35]">
                History & Recent Activity
              </h2>
            </div>

            <div className="relative mb-2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Search recent activity..."
                className="w-full border border-gray-200 bg-gray-50 rounded-lg pl-8 pr-2.5 py-1.5 text-xs focus:outline-none focus:border-[#11663F]"
              />
            </div>

            <button
              onClick={findMyLocation}
              className="w-full flex items-center justify-center gap-1.5 border border-[#11663F]/20 bg-green-50 text-[#11663F] rounded-lg py-1.5 text-xs font-semibold hover:bg-green-100 transition mb-2"
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
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-50 transition group"
                >
                  <div className="text-xs text-gray-700 truncate group-hover:text-[#11663F]">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {item.time}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Heading */}
          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between shrink-0 bg-gray-50/50">
            <div>
              <p className="text-xs font-semibold text-[#0a1b35]">
                Natural Language Chat
              </p>
              <p className="text-[10px] text-gray-400">
                Text & voice interaction
              </p>
            </div>
            {stage !== "idle" && (
              <div className="flex items-center gap-1.5 text-[10px] text-[#11663F] font-semibold">
                <Loader2 className="h-3 w-3 animate-spin" />
                AI Working
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 bg-gray-50/50 px-3 py-2.5 overflow-y-auto space-y-2.5 min-h-0">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-xl px-3.5 py-2 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#0a1b35] text-white rounded-br-sm"
                      : "bg-white border border-gray-200 text-gray-700 rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {stage !== "idle" && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-[#11663F] rounded-full animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 bg-[#11663F] rounded-full animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-[#11663F] rounded-full animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-2.5 border-t border-gray-200 bg-white shrink-0">
            <div className="flex gap-1.5">
              <div className="relative flex-1">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask SagarMitra AI..."
                  className="w-full border border-gray-300 rounded-lg pl-3 pr-9 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#11663F] focus:border-[#11663F]"
                />
                <button
                  type="button"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#11663F]"
                  title="Voice input"
                >
                  <Mic className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleSend}
                disabled={!input.trim() || stage !== "idle"}
                className="bg-[#11663F] hover:bg-[#0e5131] disabled:bg-gray-300 text-white px-3.5 rounded-lg flex items-center gap-1 shrink-0 transition text-xs font-semibold"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </section>

      
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col min-h-0 shadow-sm">
          {/* Operation Selector */}
          <div className="p-2.5 shrink-0 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                  Current Operation
                </p>
                <h2 className="text-sm font-bold text-[#0a1b35]">
                  Select Type of Operation
                </h2>
              </div>

              <div className="min-w-[200px]">
                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white text-gray-700 focus:outline-none focus:border-[#11663F]"
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
          <div className="relative h-[32%] min-h-[220px] shrink-0 border-b border-gray-200">
            <div className="absolute z-[500] top-2 left-2 bg-white/95 shadow-sm border border-gray-200 rounded p-0.5 flex">
              <button
                onClick={() => setMapType("map")}
                className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                  mapType === "map" ? "bg-[#0a1b35] text-white" : "text-gray-600"
                }`}
              >
                Map
              </button>
              <button
                onClick={() => setMapType("satellite")}
                className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                  mapType === "satellite" ? "bg-[#0a1b35] text-white" : "text-gray-600"
                }`}
              >
                Satellite
              </button>
            </div>

            <div className="absolute z-[500] top-2 right-2">
              <button
                onClick={findMyLocation}
                className="bg-white/95 border border-gray-200 shadow-sm p-1.5 rounded text-[#0a1b35] hover:bg-gray-50"
              >
                <LocateFixed className="h-3.5 w-3.5" />
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

              {mapData.zones.map((zone, index) => (
                <Circle
                  key={index}
                  center={zone.center}
                  radius={zone.radius}
                  pathOptions={{
                    color: "#11663F",
                    fillColor: "#22c55e",
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
                    color: "#b45309",
                    fillColor: "#f59e0b",
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

          <div className="flex-1 flex flex-col min-h-0 bg-gray-50/40">
            {/* Tabs Header */}
            <div className="px-3 pt-1.5 border-b border-gray-200 bg-white shrink-0">
              <div className="flex gap-5">
                <button
                  onClick={() => setActiveTab("decision")}
                  className={`pb-1.5 text-xs font-semibold border-b-2 transition ${
                    activeTab === "decision"
                      ? "border-[#11663F] text-[#11663F]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  Decision
                </button>

                <button
                  onClick={() => setActiveTab("evidence")}
                  className={`pb-1.5 text-xs font-semibold border-b-2 transition ${
                    activeTab === "evidence"
                      ? "border-[#11663F] text-[#11663F]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  Evidence
                </button>

                <button
                  onClick={() => setActiveTab("sources")}
                  className={`pb-1.5 text-xs font-semibold border-b-2 transition ${
                    activeTab === "sources"
                      ? "border-[#11663F] text-[#11663F]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  Data Sources
                </button>
              </div>
            </div>

            {/* Scrollable Tab Panels */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {activeTab === "decision" && (
                <div className="space-y-2.5">
                  <div className="bg-white border border-green-200 rounded-lg p-2.5 shadow-sm">
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 shrink-0 rounded bg-green-50 flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#11663F]" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-green-600">
                          Recommended Action
                        </p>
                        <p className="text-xs text-gray-700 mt-0.5 leading-relaxed">
                          {decision.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm">
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 shrink-0 rounded bg-orange-50 flex items-center justify-center">
                        <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                          Alternative Action
                        </p>
                        <p className="text-xs text-gray-700 mt-0.5 leading-relaxed">
                          {decision.alternative}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="px-3 py-1.5 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
                      <Scale className="w-3.5 h-3.5 text-[#0a1b35]" />
                      <p className="text-xs font-semibold text-[#0a1b35]">
                        Compare Operational Scenarios
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gray-100 text-gray-500">
                            <th className="text-left font-semibold px-3 py-1.5">Scenario</th>
                            <th className="text-left font-semibold px-3 py-1.5">Risk</th>
                            <th className="text-left font-semibold px-3 py-1.5">Time</th>
                            <th className="text-left font-semibold px-3 py-1.5">Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {decision.comparison.map((item, index) => (
                            <tr key={index} className="border-b last:border-b-0 border-gray-50">
                              <td className="px-3 py-2 font-medium text-[#0a1b35]">{item.name}</td>
                              <td className="px-3 py-2 text-gray-600">{item.risk}</td>
                              <td className="px-3 py-2 text-gray-600">{item.time}</td>
                              <td className="px-3 py-2 text-gray-600">{item.cost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="text-[10px] text-gray-400 flex items-center gap-1 justify-end">
                    <Clock3 className="w-3 h-3" />
                    Updated {decision.lastUpdated}
                  </div>
                </div>
              )}

              {activeTab === "evidence" && (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm">
                      <div className="flex items-center gap-1.5 mb-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#11663F]" />
                        <p className="text-xs font-semibold text-[#0a1b35]">Confidence</p>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-bold text-[#11663F]">{decision.confidence}%</span>
                        <span className="text-[10px] text-gray-400">High</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-[#11663F] rounded-full"
                          style={{ width: `${decision.confidence}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Database className="w-3.5 h-3.5 text-[#0a1b35]" />
                        <p className="text-xs font-semibold text-[#0a1b35]">Evidence Sources</p>
                      </div>
                      <span className="text-xl font-bold text-[#0a1b35]">{decision.evidence.length}</span>
                      <span className="text-[10px] text-gray-400 ml-1.5">verified agents</span>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm">
                    <div className="flex items-center gap-1.5 mb-1">
                      <FileText className="w-3.5 h-3.5 text-[#0a1b35]" />
                      <p className="text-xs font-semibold text-[#0a1b35]">Justification</p>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{decision.justification}</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="px-3 py-1.5 border-b border-gray-100 bg-gray-50/50">
                      <p className="text-xs font-semibold text-[#0a1b35]">Direct Source Citations</p>
                    </div>
                    <div>
                      {decision.evidence.map((item, index) => (
                        <div key={index} className="p-2.5 border-b last:border-b-0 border-gray-100 flex gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#11663F]/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3 h-3 text-[#11663F]" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#0a1b35]">{item.source}</p>
                            <p className="text-[11px] text-gray-500">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "sources" && (
                <div className="space-y-2.5">
                  <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#0a1b35]">Verified Data Sources</p>
                      <p className="text-[11px] text-gray-500">Official oceanographic & weather feeds</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
                      {decision.dataSources?.length || 0} Connected
                    </span>
                  </div>

                  <div className="space-y-2">
                    {(decision.dataSources || []).map((source, index) => (
                      <div
                        key={`${source.provider}-${index}`}
                        className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-bold text-[#0a1b35]">{source.provider}</span>
                              <span className="px-1.5 py-0.2 rounded bg-gray-100 text-[10px] text-gray-600 font-medium">
                                {source.category}
                              </span>
                            </div>
                            <p className="text-xs font-medium text-gray-700 mt-1">{source.dataset}</p>
                            <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{source.usedFor}</p>
                          </div>

                          <a
                            href={source.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded border border-[#11663F]/20 bg-green-50 px-2 py-1 text-[11px] font-semibold text-[#11663F] hover:bg-green-100 transition shrink-0"
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