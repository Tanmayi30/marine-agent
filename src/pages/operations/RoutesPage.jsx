import React from "react";
import { Route, ShieldAlert } from "lucide-react";
import { Card } from "../../components/ui/UI";

export default function RoutesPage({ navigate }) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[#0a1b35]">Safe Route Planner</h1>
        <p className="text-sm text-gray-500 mt-1">AI-assisted routing designed to avoid hazards and restricted zones.</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Plan Journey">
          <div className="p-5 space-y-4">
            <label className="block text-xs font-bold text-gray-600">Origin Port
              <input defaultValue="Mumbai Port" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </label>
            <label className="block text-xs font-bold text-gray-600">Destination
              <input defaultValue="Zone Sector 1 (PFZ)" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </label>
            <label className="block text-xs font-bold text-gray-600">Vessel Type
              <select className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Small Fishing Boat (&lt; 20m)</option><option>Medium Trawler</option><option>Commercial Carrier</option>
              </select>
            </label>
            <button className="w-full bg-[#11663F] text-white py-2.5 rounded-lg font-bold">Calculate Routes</button>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {[
            { type: "Safest", time: "4h 15m", dist: "48 NM", risk: "Low (12%)", desc: "Avoids deep wave troughs and follows the safer coastal shelf.", cls: "text-green-700 border-green-200" },
            { type: "Fastest", time: "3h 30m", dist: "42 NM", risk: "Moderate (45%)", desc: "Direct vector with minor current-shear exposure.", cls: "text-orange-700 border-gray-200" },
            { type: "Balanced", time: "3h 50m", dist: "45 NM", risk: "Low (20%)", desc: "Optimal safety and travel-time balance. AI recommended.", cls: "text-[#11663F] border-[#11663F]/40 bg-green-50/30" }
          ].map((rt, i) => (
            <Card key={i} className={`border ${rt.cls}`}>
              <div className="p-5">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold">{rt.type} Route {i === 2 && "(Recommended)"}</h3>
                  <span className="font-mono text-gray-700">{rt.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{rt.desc}</p>
                <div className="flex gap-6 mt-4 text-sm">
                  <span className="flex items-center gap-2"><Route className="h-4 w-4" />{rt.dist}</span>
                  <span className="flex items-center gap-2"><ShieldAlert className="h-4 w-4" />Risk: {rt.risk}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => navigate("map")} className="flex-1 bg-[#0a1b35] text-white py-2 rounded-lg text-xs font-bold">Preview on Map</button>
                  <button className="flex-1 border border-gray-300 py-2 rounded-lg text-xs font-bold text-gray-700">Export GeoJSON</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}