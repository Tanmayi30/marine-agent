import React, { useState } from "react";
import { Bell, CheckCircle2, ExternalLink, LogOut, Menu, Search, User, Waves, X } from "lucide-react";
import { NAV_ITEMS } from "../../data/mockData";

export default function AppLayout({ currentPage, navigate, children, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a1b35] text-white transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-200 flex flex-col`}>
        <div className="h-24 px-4 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-12 bg-white rounded flex items-center justify-center">
            <Waves className="text-[#11663F]" />
          </div>
          <div>
            <p className="text-[9px] text-gray-300 tracking-wider">GOVERNMENT OF INDIA</p>
            <p className="text-sm font-bold mt-1">SAGARMITRA AI</p>
            <p className="text-[10px] text-blue-200">Marine Intelligence Portal</p>
          </div>
          <button className="lg:hidden ml-auto" onClick={() => setMobileOpen(false)}>
            <X />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => { navigate(item.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${currentPage === item.id || (item.id === "agents" && currentPage === "agent-chat") ? "bg-[#11663F] text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"}`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-6 px-2">
            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-2">Quick Links</p>
            {["INCOIS Portal", "IMD Weather", "Coast Guard Help"].map(x => (
              <a key={x} href="#" onClick={e => e.preventDefault()} className="flex items-center justify-between text-xs text-gray-300 py-2">
                {x}<ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </nav>
        
        {/* BOTTOM LEFT: Profile & Logout */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between bg-white/5 rounded-lg p-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Commander Desk</p>
                <p className="text-[10px] text-green-300 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />Systems Online
                </p>
              </div>
            </div>
            
            {/* LOGOUT BUTTON 1 (Bottom Left) */}
            <button
              onClick={onLogout}
              title="Log Out"
              className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-1 min-w-0 flex flex-col">
        
        {/* TOP HEADER */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3 flex-1">
            <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu />
            </button>
            <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full max-w-md">
              <Search className="h-4 w-4 text-gray-400 mr-2" />
              <input placeholder="Search coordinates, vessels, alerts..." className="bg-transparent outline-none text-sm w-full" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="hidden sm:block border border-gray-300 rounded px-2 py-1 text-xs font-bold text-[#11663F]">English</button>
            <button className="relative">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] flex items-center justify-center">3</span>
            </button>
            
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#0a1b35] text-white flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div className="hidden sm:block pr-2">
                <p className="text-[10px] text-gray-400">Welcome,</p>
                <p className="text-xs font-bold text-[#0a1b35]">Cmdr. Desk</p>
              </div>
              
              {/* LOGOUT BUTTON 2 (Top Right) */}
              <button
                onClick={onLogout}
                title="Log Out"
                className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>

          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
      
      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}
    </div>
  );
}