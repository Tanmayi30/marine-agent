import React from "react";
import { Card, Badge } from "../../components/ui/UI";
import { MOCK_PFZ } from "../../data/mockData";

export default function PFZPage({ navigate }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1b35]">Potential Fishing Zones</h1>
          <p className="text-sm text-gray-500 mt-1">High-productivity zones derived from oceanographic indicators.</p>
        </div>
        <button className="bg-[#11663F] text-white px-4 py-2 rounded-lg text-sm font-bold">Run Fresh Scan</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {MOCK_PFZ.map(pfz => (
          <Card key={pfz.id}>
            <div className="p-5">
              <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                <div>
                  <h3 className="font-bold text-[#0a1b35]">Zone Sector {pfz.id}</h3>
                  <p className="text-xs text-gray-500 mt-1">{pfz.lat}°N, {pfz.lng}°E</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#11663F]">{pfz.score}</p>
                  <p className="text-[10px] text-gray-500 uppercase">Productivity</p>
                </div>
              </div>
              <div className="space-y-3 py-4 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Distance</span><b>{pfz.dist}</b></div>
                <div className="flex justify-between"><span className="text-gray-500">SST</span><b>{pfz.sst}</b></div>
                <div className="flex justify-between"><span className="text-gray-500">Chlorophyll</span><b>{pfz.chloro}</b></div>
                <div className="flex justify-between items-center"><span className="text-gray-500">Confidence</span><Badge severity={pfz.confidence === "High" ? "Low" : "default"}>{pfz.confidence}</Badge></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => navigate("map")} className="flex-1 bg-[#0a1b35] text-white py-2 rounded-lg text-xs font-bold">View Map</button>
                <button onClick={() => navigate("routes")} className="flex-1 border border-[#0a1b35] text-[#0a1b35] py-2 rounded-lg text-xs font-bold">Plan Route</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}