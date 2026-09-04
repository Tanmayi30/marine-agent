import React from "react";
import { Card, Badge } from "../../components/ui/UI";

export default function GeofencePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[#0a1b35]">Geofencing & Restricted Areas</h1>
        <p className="text-sm text-gray-500 mt-1">Maritime boundaries, protected areas and operational exclusion zones.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[
          ["Naval Firing Zone Alpha", "Active Restriction", "Military", "20 NM Radius"],
          ["Gulf of Kutch Marine Park", "Protected Area", "Conservation", "No Fishing"],
          ["International Maritime Boundary", "Warning Zone", "Border", "5 NM Buffer"]
        ].map(([name, status, type, range], i) => (
          <Card key={i} className="border-l-4 border-l-[#0a1b35]">
            <div className="p-5">
              <h3 className="font-bold text-gray-900">{name}</h3>
              <Badge severity="Critical" className="mt-3">{status}</Badge>
              <div className="text-sm text-gray-600 mt-4 space-y-2">
                <p>Type: <b className="text-gray-900">{type}</b></p>
                <p>Restriction: <b className="text-gray-900">{range}</b></p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}