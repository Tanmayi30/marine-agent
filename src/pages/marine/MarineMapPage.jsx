import React, { useEffect, useRef, useState } from "react";
import { Card } from "../../components/ui/UI";
import { MOCK_PFZ } from "../../data/mockData";

export default function MarineMapPage() {
  const mapRef = useRef(null);
  const [layers, setLayers] = useState({ pfz: true, alerts: true });

  useEffect(() => {
    let map;
    let script;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const init = () => {
      if (!window.L || mapRef.current) return;
      map = window.L.map("marine-map").setView([18.922, 72.835], 5);
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap contributors" }).addTo(map);

      if (layers.pfz) {
        MOCK_PFZ.forEach(p => window.L.circleMarker([p.lat, p.lng], { color: "#11663F", fillColor: "#11663F", fillOpacity: 0.55, radius: 8 }).addTo(map).bindPopup(`<b>PFZ Zone ${p.id}</b><br>SST: ${p.sst}<br>Chlorophyll: ${p.chloro}<br>Score: ${p.score}/100`));
      }
      if (layers.alerts) {
        window.L.circleMarker([15.0, 70.0], { color: "#dc2626", fillColor: "#dc2626", fillOpacity: 0.55, radius: 12 }).addTo(map).bindPopup("<b>High Wave Alert</b><br>Severity: High");
      }
      mapRef.current = map;
    };

    if (window.L) init();
    else {
      script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = init;
      document.body.appendChild(script);
    }

    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
      document.head.removeChild(link);
      if (script && document.body.contains(script)) document.body.removeChild(script);
    };
  }, [layers]); 

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-[#0a1b35]">Marine Map</h1>
        <p className="text-sm text-gray-500 mt-1">Interactive spatial intelligence across the Indian coastline.</p>
      </header>
      <Card className="p-0 h-[calc(100vh-12rem)] min-h-[500px] relative">
        <div id="marine-map" className="w-full h-full rounded-xl z-0" />
        <div className="absolute top-4 right-4 z-[400] bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-52">
          <h4 className="font-bold text-sm text-[#0a1b35] mb-3">Map Layers</h4>
          <label className="flex items-center gap-2 text-sm text-gray-700 mb-2"><input type="checkbox" checked={layers.pfz} onChange={e => setLayers(v => ({ ...v, pfz: e.target.checked }))} /> PFZ Zones</label>
          <label className="flex items-center gap-2 text-sm text-gray-700 mb-2"><input type="checkbox" checked={layers.alerts} onChange={e => setLayers(v => ({ ...v, alerts: e.target.checked }))} /> Active Alerts</label>
        </div>
      </Card>
    </div>
  );
}