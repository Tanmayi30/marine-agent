import React from "react";
import { Download } from "lucide-react";
import { Card } from "../../components/ui/UI";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[#0a1b35]">Reports & Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">Generate operational intelligence reports from multi-agent analysis.</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Generate New Report">
          <div className="p-5 space-y-4">
            <label className="block text-xs font-bold text-gray-600">Report Type
              <select className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Daily Marine Intelligence</option><option>PFZ Analysis</option><option>Weather & Hazard Summary</option>
              </select>
            </label>
            <label className="block text-xs font-bold text-gray-600">Region
              <select className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>All India Coastline</option><option>Arabian Sea</option><option>Bay of Bengal</option>
              </select>
            </label>
            <button className="w-full bg-[#11663F] text-white py-2.5 rounded-lg font-bold flex items-center justify-center gap-2">
              <Download className="h-4 w-4" /> Generate AI Report
            </button>
          </div>
        </Card>
        <div className="space-y-4">
          {[
            ["Weekly Hazard Summary", "20 Aug - 27 Aug 2026", "red"],
            ["PFZ Historical Analysis", "August 2026", "green"],
            ["Marine Operational Brief", "27 Aug 2026", "blue"]
          ].map(([title, date, tone], i) => (
            <Card key={i}>
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${tone === "red" ? "bg-red-50 text-red-700" : tone === "green" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>
                    <Download className="h-5 w-5" />
                  </div>
                  <div><h4 className="font-bold text-sm text-gray-900">{title}</h4><p className="text-xs text-gray-500 mt-1">{date}</p></div>
                </div>
                <button className="text-[#11663F]"><Download className="h-5 w-5" /></button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}