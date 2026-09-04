import React from "react";
import { AreaChart, Area, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "../../components/ui/UI";
import { OCEAN_DATA } from "../../data/mockData";

export default function OceanIntelligencePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[#0a1b35]">Ocean Intelligence</h1>
        <p className="text-sm text-gray-500 mt-1">Sea surface temperature, wave dynamics and marine indicators.</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Sea Surface Temperature (°C)">
          <div className="h-80 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={OCEAN_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis domain={["dataMin - 0.5", "dataMax + 0.5"]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="sst" stroke="#11663F" fill="#11663F" fillOpacity={0.12} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Wave Height Forecast (meters)">
          <div className="h-80 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={OCEAN_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="wave" fill="#0a1b35" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}