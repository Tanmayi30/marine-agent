import React from "react";
import { Cpu, Fish, TriangleAlert, Waves } from "lucide-react";
import { 
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";
import { Card, StatCard, Badge } from "../../components/ui/UI";
import { WAVE_TREND, ALERT_DISTRIBUTION, MOCK_ALERTS } from "../../data/mockData";

export default function DashboardPage({ navigate }) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[#0a1b35]">Marine Intelligence Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time overview of marine conditions, AI insights and operational risks.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Active Alerts" value="12" sub="3 high-priority alerts" icon={TriangleAlert} iconClass="text-red-600" />
        <StatCard title="Detected PFZs" value="24" sub="5 new this week" icon={Fish} trend={true} />
        <StatCard title="Avg Sea State" value="2.5m" sub="Moderate operational risk" icon={Waves} iconClass="text-orange-500" />
        <StatCard title="Agents Active" value="8 / 8" sub="100% operational" icon={Cpu} trend={true} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2" title="Wave Height Trend — 7 Days"
          action={<button onClick={() => navigate("ocean")} className="text-xs font-semibold text-[#11663F]">Ocean Intelligence</button>}>
          <div className="h-72 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WAVE_TREND}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <Tooltip />
                <Line type="monotone" dataKey="wave" stroke="#11663F" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Alert Distribution">
          <div className="h-72 p-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ALERT_DISTRIBUTION} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} label>
                  {ALERT_DISTRIBUTION.map((_, i) => <Cell key={i} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card title="Recent AI Activity"
          action={<button onClick={() => navigate("agents")} className="text-xs font-semibold text-[#11663F]">View Agents</button>}>
          <div className="p-5 space-y-4">
            {[
              ["Geospatial Agent", "Updated coastal risk geometries from satellite imagery.", "09:30 AM"],
              ["Weather Agent", "Issued early warning for cyclonic circulation.", "08:20 AM"],
              ["Ocean Analytics Agent", "Recalculated PFZ boundaries; 3 zones upgraded.", "07:55 AM"],
              ["Planner Agent", "Optimized intelligence report workflow.", "07:45 AM"]
            ].map(([agent, desc, time], i) => (
              <div key={i} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-9 h-9 rounded-lg bg-[#0a1b35]/5 flex items-center justify-center shrink-0">
                  <Cpu className="h-4 w-4 text-[#0a1b35]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{agent}</p>
                  <p className="text-xs text-gray-500 mt-1">{desc}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Priority Warnings"
          action={<button onClick={() => navigate("alerts")} className="text-xs font-semibold text-red-600">View All</button>}>
          <div className="p-5 space-y-3">
            {MOCK_ALERTS.slice(0, 3).map(alert => (
              <div key={alert.id} className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge severity={alert.severity}>{alert.type}</Badge>
                  <span className="text-xs text-gray-400">{alert.time}</span>
                </div>
                <p className="text-sm font-bold text-gray-800 mt-2">{alert.location}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}