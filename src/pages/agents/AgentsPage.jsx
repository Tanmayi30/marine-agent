import React from "react";
import { ChevronRight } from "lucide-react";
import { MOCK_AGENTS } from "../../data/mockData";

export default function AgentsPage({ openAgent }) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[#0a1b35]">AI Marine Agents</h1>
        <p className="text-sm text-gray-500 mt-1">Select an agent to initiate specialized analysis or a multi-agent workflow.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MOCK_AGENTS.map(agent => (
          <button key={agent.id} onClick={() => openAgent(agent)}
            className="text-left bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-[#11663F] hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-lg bg-[#0a1b35]/5 flex items-center justify-center mb-4 group-hover:bg-[#11663F]">
              <agent.icon className="h-6 w-6 text-[#0a1b35] group-hover:text-white" />
            </div>
            <h3 className="font-bold text-gray-900">{agent.name}</h3>
            <p className="text-xs text-gray-500 mt-2 min-h-10">{agent.desc}</p>
            <div className="flex justify-between items-center mt-5">
              <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" /> Systems Online
              </span>
              <span className="text-xs text-[#11663F] font-bold flex items-center gap-1">CHAT <ChevronRight className="h-3 w-3" /></span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}