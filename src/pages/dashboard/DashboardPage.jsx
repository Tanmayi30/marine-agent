import React, { useState } from "react";
import { 
  AlertTriangle, 
  Compass, 
  Route, 
  Waves, 
  Bot, 
  ArrowRight, 
  Sparkles,
  Fish,
  Cpu,
  Radio,
  Siren,
  CloudLightning,
  Wind,
  Thermometer,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  X,
  Eye
} from "lucide-react";

export default function DashboardPage({ navigate }) {
  // State for SOS distress broadcast modal
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [sosTransmitted, setSosTransmitted] = useState(false);

  // User's live coordinates (defaulted to Mumbai Coastal Sector)
  const userCoordinates = {
    lat: "18.9220° N",
    lon: "72.8347° E",
    sector: "Mumbai Offshore Zone-3",
    accuracy: "±4.2 meters"
  };

  // Quick queries straight from ISRO problem statement
  const ISRO_QUERIES = [
    { text: "Where is the nearest Potential Fishing Zone (PFZ) today?", type: "pfz" },
    { text: "Is it safe to venture into the sea tomorrow morning?", type: "safety" },
    { text: "What is the safest route avoiding current swell conditions?", type: "routes" },
    { text: "Are there any high-wave or cyclonic alerts near my sector?", type: "alerts" },
  ];

  const handleTriggerSOS = () => {
    setSosTransmitted(true);
  };

  return (
    <div className="space-y-6 pb-6 relative">

      {/* ========================================= */}
      {/* SOS EMERGENCY DISTRESS MODAL */}
      {/* ========================================= */}
      {sosModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-red-500 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2.5 text-red-600 font-bold text-lg">
                <Siren className="h-6 w-6 animate-bounce" />
                <span>MARITIME DISTRESS RELAY (SOS)</span>
              </div>
              <button 
                onClick={() => { setSosModalOpen(false); setSosTransmitted(false); }}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                Triggering this broadcast will dispatch an immediate high-priority distress telemetry packet to the 
                <strong className="text-gray-900"> Indian Coast Guard (MRCC Mumbai)</strong>, 
                <strong className="text-gray-900"> State Maritime Operations Center</strong>, and nearby AIS vessels.
              </p>

              <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex justify-between items-center text-red-900 font-semibold">
                  <span>Telemetry Payload:</span>
                  <span className="bg-red-200/80 px-2 py-0.5 rounded text-[10px] text-red-800">AUTOMATIC GPS RELAY</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-gray-700">
                  <div>Latitude / Longitude: <span className="font-mono font-bold text-gray-900 block">{userCoordinates.lat}, {userCoordinates.lon}</span></div>
                  <div>Operational Sector: <span className="font-bold text-gray-900 block">{userCoordinates.sector}</span></div>
                  <div>Channel: <span className="font-bold text-gray-900 block">VHF Marine Ch 16 + SAT-UHF</span></div>
                  <div>Signal Accuracy: <span className="font-bold text-emerald-700 block">{userCoordinates.accuracy}</span></div>
                </div>
              </div>

              {sosTransmitted ? (
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-center space-y-1">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                  <p className="text-sm font-bold text-emerald-900">DISTRESS BEACON TRANSMITTED</p>
                  <p className="text-xs text-emerald-700">MRCC Mumbai has locked coordinates. Patrol vessel dispatched.</p>
                </div>
              ) : (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setSosModalOpen(false)}
                    className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTriggerSOS}
                    className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-lg shadow-red-600/30 flex items-center justify-center gap-1.5"
                  >
                    <Radio className="h-4 w-4 animate-pulse" />
                    CONFIRM & TRANSMIT SOS
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* 1. HEADER: SOS & LAUNCH AI BUTTONS        */}
      {/* ========================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1b35]">Marine Intelligence Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time overview of marine conditions, AI insights and operational risks.</p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          {/* Red SOS Button */}
          <button 
            onClick={() => setSosModalOpen(true)}
            className="px-4 py-2.5 bg-red-500 hover:bg-red-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition shadow-md shadow-red-600/30 ring-2 ring-red-400/40"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <Siren className="h-4 w-4" />
            EMERGENCY SOS
          </button>

          {/* Launch AI Assistant */}
          <button 
            onClick={() => navigate("agent-chat")}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition shadow-md shadow-emerald-950/20"
          >
            <Bot className="h-4 w-4" />
            Launch AI Assistant
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ========================================= */}
      {/* 2. 4 STAT CARDS                           */}
      {/* ========================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Active Alerts</p>
              <h2 className="text-3xl font-bold text-[#0a1b35] mt-2">12</h2>
            </div>
            <AlertTriangle className="text-red-500 h-5 w-5" />
          </div>
          <p className="text-xs text-gray-500 mt-2">3 high-priority alerts</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Detected PFZs</p>
              <h2 className="text-3xl font-bold text-[#0a1b35] mt-2">24</h2>
            </div>
            <Fish className="text-emerald-600 h-5 w-5" />
          </div>
          <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
            <span>↑</span> 5 new this week
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Avg Sea State</p>
              <h2 className="text-3xl font-bold text-[#0a1b35] mt-2">2.5m</h2>
            </div>
            <Waves className="text-orange-500 h-5 w-5" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Moderate operational risk</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Agents Active</p>
              <h2 className="text-3xl font-bold text-[#0a1b35] mt-2">8 / 8</h2>
            </div>
            <Cpu className="text-emerald-700 h-5 w-5" />
          </div>
          <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
            <span>↑</span> 100% operational
          </p>
        </div>
      </div>

      {/* ========================================= */}
      {/* 3. CHARTS ROW (Wave Trend + Pie Chart)    */}
      {/* ========================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Wave Height Trend Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-[#0a1b35] uppercase tracking-wider">Wave Height Trend — 7 Days</h3>
            <button onClick={() => navigate("ocean")} className="text-xs text-emerald-600 hover:underline">Ocean Intelligence</button>
          </div>
          <div className="flex-1 relative w-full min-h-[200px] flex items-end">
            <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-400 pb-6">
              <div className="border-b border-gray-100 border-dashed w-full h-0 flex items-center"><span className="bg-white pr-2 -translate-y-2">3.2</span></div>
              <div className="border-b border-gray-100 border-dashed w-full h-0 flex items-center"><span className="bg-white pr-2 -translate-y-2">2.4</span></div>
              <div className="border-b border-gray-100 border-dashed w-full h-0 flex items-center"><span className="bg-white pr-2 -translate-y-2">1.6</span></div>
              <div className="border-b border-gray-100 border-dashed w-full h-0 flex items-center"><span className="bg-white pr-2 -translate-y-2">0.8</span></div>
              <div className="border-b border-gray-200 w-full h-0 flex items-center"><span className="bg-white pr-2 -translate-y-2">0</span></div>
            </div>
            <svg className="absolute inset-0 w-full h-full pt-4 pb-8 pl-8 overflow-visible" preserveAspectRatio="none">
              <polyline 
                points="0,150 120,135 240,115 360,125 480,90 600,60 720,75" 
                fill="none" 
                stroke="#11663F" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <circle cx="0" cy="150" r="4" fill="white" stroke="#11663F" strokeWidth="2" />
              <circle cx="120" cy="135" r="4" fill="white" stroke="#11663F" strokeWidth="2" />
              <circle cx="240" cy="115" r="4" fill="white" stroke="#11663F" strokeWidth="2" />
              <circle cx="360" cy="125" r="4" fill="white" stroke="#11663F" strokeWidth="2" />
              <circle cx="480" cy="90" r="4" fill="white" stroke="#11663F" strokeWidth="2" />
              <circle cx="600" cy="60" r="4" fill="white" stroke="#11663F" strokeWidth="2" />
              <circle cx="720" cy="75" r="4" fill="white" stroke="#11663F" strokeWidth="2" />
            </svg>
            <div className="absolute bottom-0 w-full flex justify-between text-[10px] text-gray-400 pl-8">
              <span>21 Aug</span><span>22 Aug</span><span>23 Aug</span><span>24 Aug</span><span>25 Aug</span><span>26 Aug</span><span>27 Aug</span>
            </div>
          </div>
        </div>

        {/* Colorized Alert Distribution Pie Chart with Tooltips & Legend */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-bold text-[#0a1b35] uppercase tracking-wider mb-2">Alert Distribution</h3>
          <div className="flex-1 flex flex-col justify-center items-center py-2">
            <div className="relative w-36 h-36 rounded-full shadow-inner border border-gray-100" 
                 style={{ background: 'conic-gradient(#ef4444 0% 35%, #f59e0b 35% 55%, #10b981 55% 75%, #3b82f6 75% 100%)' }}>
               
               {/* Hover Tooltips */}
               <div title="High Waves (35 Alerts)" className="absolute top-0 right-0 w-1/2 h-1/2 rounded-tr-full cursor-help hover:bg-white/10 transition z-10" />
               <div title="Cyclonic Alerts (20 Alerts)" className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-br-full cursor-help hover:bg-white/10 transition z-10" />
               <div title="Squall Warnings (20 Alerts)" className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-bl-full cursor-help hover:bg-white/10 transition z-10" />
               <div title="Strong Winds (25 Alerts)" className="absolute top-0 left-0 w-1/2 h-1/2 rounded-tl-full cursor-help hover:bg-white/10 transition z-10" />

               {/* Labels */}
               <div className="absolute -top-3 right-0 text-[11px] font-bold text-red-500 pointer-events-none">35</div>
               <div className="absolute bottom-4 -right-3 text-[11px] font-bold text-amber-500 pointer-events-none">20</div>
               <div className="absolute -bottom-3 left-6 text-[11px] font-bold text-emerald-500 pointer-events-none">20</div>
               <div className="absolute top-1/2 -left-4 text-[11px] font-bold text-blue-500 pointer-events-none">25</div>

               <div className="absolute inset-0 rounded-full border-[1.5px] border-white mix-blend-overlay pointer-events-none" />
               <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-white origin-bottom rotate-[126deg] pointer-events-none" />
               <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-white origin-bottom rotate-[198deg] pointer-events-none" />
               <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-white origin-bottom rotate-[270deg] pointer-events-none" />
               <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-white origin-bottom rotate-[0deg] pointer-events-none" />
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] text-gray-500 font-medium mt-4 w-full px-2">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-500 shrink-0" />High Waves (35)</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500 shrink-0" />Strong Winds (25)</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-500 shrink-0" />Cyclones (20)</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 shrink-0" />Squalls (20)</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. NEW HORIZONTAL ROW: LIVE COASTAL WEATHER & FISHING ADVISORY RECS       */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Horizontal Left Card: Live Coastal Weather[cite: 14] */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <CloudLightning className="h-4 w-4 text-blue-600" />
                <h3 className="text-xs font-bold text-[#0a1b35] uppercase tracking-wider">Live Coastal Weather Conditions</h3>
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">IMD Radar Active</span>
            </div>

            {/* Weather status summary banner */}
            <div className="bg-blue-50/60 border border-blue-200/60 rounded-xl p-4 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <CloudLightning className="h-8 w-8 text-amber-500 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-[#0a1b35]">Scattered Rain & Squally Wind</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Overcast · Moderate Wave Turbulence · High Humidity</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-3xl font-extrabold text-[#0a1b35]">28°C</span>
                <span className="block text-[10px] text-gray-400">Feels 32°C</span>
              </div>
            </div>

            {/* 4 Parameter Metric Boxes - Modified to 2x2 Grid with larger spacing[cite: 14] */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-center">
                <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1.5 mb-1">
                  <Wind className="h-4 w-4 text-gray-400" /> Wind Speed
                </span>
                <p className="text-[15px] font-bold text-[#0a1b35]">24 knots (SW)</p>
                <span className="text-[10px] text-amber-600 font-bold mt-1">Breezy & Gusty</span>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-center">
                <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1.5 mb-1">
                  <Waves className="h-4 w-4 text-gray-400" /> Wave Swell
                </span>
                <p className="text-[15px] font-bold text-[#0a1b35]">2.5m – 3.1m</p>
                <span className="text-[10px] text-orange-600 font-bold mt-1">Moderate Sea</span>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-center">
                <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1.5 mb-1">
                  <Eye className="h-4 w-4 text-gray-400" /> Visibility
                </span>
                <p className="text-[15px] font-bold text-[#0a1b35]">4.5 NM</p>
                <span className="text-[10px] text-emerald-600 font-bold mt-1">Fair Horizon</span>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-center">
                <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1.5 mb-1">
                  <Thermometer className="h-4 w-4 text-gray-400" /> Sea Surface
                </span>
                <p className="text-[15px] font-bold text-[#0a1b35]">27.4°C</p>
                <span className="text-[10px] text-emerald-600 font-bold mt-1">PFZ Favorable</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span>Barometric Pressure: <strong className="text-gray-700">1008.2 hPa</strong></span>
            <span>Tide State: <strong className="text-emerald-700">Incoming Flood (+1.8m)</strong></span>
          </div>
        </div>

        {/* Horizontal Right Card: Fishing Advisory & Intelligence Recommendations */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Fish className="h-4 w-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-[#0a1b35] uppercase tracking-wider">Fishing Advisory & Recommendations</h3>
              </div>
              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded"> Agent Engine</span>
            </div>

            {/* User GPS Coordinate Display */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-red-500 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Current GPS Station</p>
                  <p className="text-sm font-mono font-bold text-[#0a1b35]">{userCoordinates.lat}, {userCoordinates.lon}</p>
                </div>
              </div>
              <span className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded font-semibold text-gray-600">{userCoordinates.sector}</span>
            </div>

            {/* Suitability Verdict */}
            <div className="border border-emerald-200 bg-emerald-50/70 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] uppercase font-extrabold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  SAFETY ASSESSMENT: SUITABLE (WITH CAUTION)
                </span>
              </div>
              <p className="text-[12px] text-emerald-950 leading-relaxed">
                Tide and swell permit small-to-mid commercial vessels to venture out. Recommended window avoids afternoon squall surge.
              </p>
            </div>

            {/* Optimal Day/Time & Hotspot Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-gray-700 mb-1">
                  <Clock className="h-3.5 w-3.5 text-blue-600" />
                  <span className="font-bold text-[11px]">Optimal Fishing Window</span>
                </div>
                <p className="font-bold text-[#0a1b35] text-[12px]">Tomorrow · 04:30 AM – 08:30 AM</p>
                <p className="text-[10.5px] text-gray-500 mt-1">Lowest swell (1.4m) + favorable incoming flood tide current.</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-gray-700 mb-1">
                  <Compass className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="font-bold text-[11px]">Peak Fishing Hotspot (PFZ)</span>
                </div>
                <p className="font-bold text-[#0a1b35] text-[12px]">Sector 4B (18.84° N, 72.58° E)</p>
                <p className="text-[10.5px] text-gray-500 mt-1">High Chlorophyll bloom (1.8 mg/m³) at 34m depth shelf.</p>
              </div>
            </div>

            {/* Crowded Peak Fishing Time Zones */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5">
              <Users className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-900">Crowded Fleet Congestion: 05:00 AM – 07:15 AM</p>
                <p className="text-[11px] text-amber-700 mt-1 leading-relaxed">
                  Heavy vessel density (~48 commercial craft). Depart prior to 04:15 AM or position toward western boundary.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. SUGGESTED OPERATIONAL INQUIRIES (NATURAL LANGUAGE INTERFACE)           */}
      {/* ========================================================================= */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-emerald-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Suggested Operational Inquiries (Natural Language Interface)
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {ISRO_QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => navigate("agent-chat")}
              className="text-left p-3 rounded-lg border border-gray-100 bg-gray-50/70 hover:bg-emerald-50/50 hover:border-emerald-200 transition group flex flex-col justify-between"
            >
              <p className="text-xs text-gray-700 group-hover:text-emerald-900 font-medium">
                "{q.text}"
              </p>
              <span className="text-[10px] text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                Ask Agent <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. 3 PILLARS: PFZ, SAFE ROUTE NAVIGATION, HAZARDS & GEOFENCING           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* 1. Potential Fishing Zones (PFZ) Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                24 Active Sectors
              </span>
            </div>
            <h3 className="text-base font-bold text-[#0a1b35]">Potential Fishing Zones (PFZ)</h3>
            <p className="text-xs text-gray-500 mt-1">
              Correlated chlorophyll blooms and Sea Surface Temperature (SST) gradients derived from satellite imagery.
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px]">Optimal Depth</span>
                <span className="font-semibold text-gray-700">30 - 45 Meters</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Pelagic Density</span>
                <span className="font-semibold text-emerald-600">High Concentration</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("pfz")}
            className="mt-5 w-full py-2 bg-gray-50 hover:bg-[#0a1b35] text-[#0a1b35] hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-gray-200 hover:border-[#0a1b35]"
          >
            Explore PFZ Vectors <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* 2. Safe Route Navigation Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-blue-300 transition group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Route className="h-5 w-5" />
              </div>
              <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-semibold">
                Swell & Wave Optimized
              </span>
            </div>
            <h3 className="text-base font-bold text-[#0a1b35]">Safe Route Navigation</h3>
            <p className="text-xs text-gray-500 mt-1">
              Dynamic multi-waypoint navigation minimizing fuel burn while avoiding shoals, cyclonic wind vectors, and heavy seas.
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px]">Avg Sea State</span>
                <span className="font-semibold text-gray-700">2.5 m (Moderate)</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Fuel Economy</span>
                <span className="font-semibold text-blue-600">~12% Efficiency</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("routes")}
            className="mt-5 w-full py-2 bg-gray-50 hover:bg-[#0a1b35] text-[#0a1b35] hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-gray-200 hover:border-[#0a1b35]"
          >
            Calculate Safe Corridor <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* 3. Hazards & Geofencing Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-red-300 transition group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <span className="text-xs bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-semibold">
                3 Urgent Advisories
              </span>
            </div>
            <h3 className="text-base font-bold text-[#0a1b35]">Hazards & Geofencing</h3>
            <p className="text-xs text-gray-500 mt-1">
              Real-time monitoring of international maritime boundaries, cyclonic depressions, and coastal wave hazards.
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px]">IMBL Boundary</span>
                <span className="font-semibold text-emerald-600">Clear (42 NM Away)</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Squall / High Wave</span>
                <span className="font-semibold text-amber-600">Odisha & Gujarat</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("alerts")}
            className="mt-5 w-full py-2 bg-gray-50 hover:bg-[#0a1b35] text-[#0a1b35] hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-gray-200 hover:border-[#0a1b35]"
          >
            Review Active Alerts <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 7. LIVE OPERATIONAL FEEDS: HAZARD ADVISORIES & AGENT TELEMETRY            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Priority Warnings Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#0a1b35] uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Real-Time Hazard Advisories
            </h3>
            <button 
              onClick={() => navigate("alerts")}
              className="text-xs text-emerald-600 font-semibold hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-red-100 bg-red-50/60 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold shrink-0 mt-0.5">
                CYCLONE ALERT
              </span>
              <div>
                <h4 className="text-xs font-bold text-gray-800">Bay of Bengal (Odisha Coast)</h4>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  Deep depression intensifying. Wind speeds exceeding 55 km/h. Small craft advised not to venture out.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-amber-100 bg-amber-50/60 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-[10px] font-bold shrink-0 mt-0.5">
                HIGH SWELL
              </span>
              <div>
                <h4 className="text-xs font-bold text-gray-800">Arabian Sea (Off Mumbai & Konkan)</h4>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  Swell surge forecasted between 3.2m - 4.1m during high tide windows. Exercise operational caution.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Autonomous Agent Telemetry */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#0a1b35] uppercase tracking-wider flex items-center gap-2">
              <Bot className="h-4 w-4 text-blue-600" />
              Autonomous Agent Telemetry
            </h3>
            <span className="text-[11px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-semibold">
              4 Specialized Agents Online
            </span>
          </div>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-gray-800">Geospatial Agent</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-500 text-[11px]">IMBL boundary & zone geofencing check</span>
              </div>
              <span className="text-[10px] text-gray-400">09:30 AM</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-gray-800">Weather Agent</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-500 text-[11px]">IMD Radar sync & precipitation matrix update</span>
              </div>
              <span className="text-[10px] text-gray-400">08:20 AM</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-gray-800">Ocean Analytics Agent</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-500 text-[11px]">SST & chlorophyll gradient re-computation</span>
              </div>
              <span className="text-[10px] text-gray-400">07:55 AM</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}