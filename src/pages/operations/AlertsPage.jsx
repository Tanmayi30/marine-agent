import React from "react";
import { AlertTriangle } from "lucide-react";
import { Card, Badge } from "../../components/ui/UI";
import { MOCK_ALERTS } from "../../data/mockData";

export default function AlertsPage({ navigate }) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[#0a1b35]">Warnings & Alerts</h1>
        <p className="text-sm text-gray-500 mt-1">Prioritized marine hazard notifications and operational guidance.</p>
      </header>
      <div className="space-y-4">
        {MOCK_ALERTS.map(alert => (
          <Card key={alert.id} className={`border-l-4 ${alert.severity === "Critical" ? "border-l-red-600" : alert.severity === "High" ? "border-l-orange-500" : alert.severity === "Moderate" ? "border-l-yellow-500" : "border-l-green-500"}`}>
            <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex gap-4">
                <AlertTriangle className={`h-6 w-6 mt-1 shrink-0 ${alert.severity === "Critical" ? "text-red-600" : alert.severity === "High" ? "text-orange-500" : "text-yellow-500"}`} />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-gray-900">{alert.type} — {alert.location}</h3>
                    <Badge severity={alert.severity}>{alert.severity}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{alert.desc}</p>
                  <p className="text-xs text-gray-400 mt-2">Issued: {alert.date}, {alert.time}</p>
                </div>
              </div>
              <button onClick={() => navigate("map")} className="bg-gray-100 hover:bg-gray-200 text-[#0a1b35] px-4 py-2 rounded-lg text-sm font-semibold shrink-0">Focus on Map</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}