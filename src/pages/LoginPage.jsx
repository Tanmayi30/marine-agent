import React, { useState } from "react";
import { 
  AlertTriangle, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Waves, 
  ArrowRight, 
  Bot, 
  Compass, 
  Route, 
  ChevronLeft 
} from "lucide-react";

export default function LandingAndLoginPage({ onLogin }) {
  
  const [view, setView] = useState("home");

  
  const [email, setEmail] = useState("commander@sagarmitra.ai");
  const [password, setPassword] = useState("sagarmitra123");
  const [error, setError] = useState("");

 
  const submit = (e) => {
    e.preventDefault();
    if (email === "commander@sagarmitra.ai" && password === "sagarmitra123") {
      setError("");
      onLogin(); 
    } else {
      setError("Invalid demo credentials. Use the credentials shown below.");
    }
  };

  //  LOGIN PAGE
  
  if (view === "login") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        
        {/* Back to Home Button */}
        <div className="w-full max-w-5xl mb-4">
          <button 
            onClick={() => setView("home")}
            className="flex items-center gap-1.5 text-gray-500 hover:text-[#0a1b35] transition font-medium text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
        
        <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          
          <div className="hidden lg:flex bg-[#0a1b35] text-white p-10 flex-col justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                  <Waves className="w-8 h-8 text-[#11663F]" />
                </div>
                <div>
                  <p className="text-xs text-blue-200 tracking-widest">GOVERNMENT OF INDIA</p>
                  <h1 className="text-2xl font-bold">SAGARMITRA AI</h1>
                </div>
              </div>
              <p className="mt-10 text-3xl font-bold leading-tight">Marine intelligence for safer seas.</p>
              <p className="mt-4 text-blue-100 text-sm leading-6">
                A unified operational dashboard for ocean intelligence, AI agents, fishing zones, warnings and maritime route safety.
              </p>
            </div>
            <div className="space-y-3 text-sm text-blue-100">
              <div className="flex gap-3"><ShieldCheck className="w-5 h-5 text-green-300" />Multi-agent marine analysis</div>
              <div className="flex gap-3"><ShieldCheck className="w-5 h-5 text-green-300" />Real-time warning workflow</div>
              <div className="flex gap-3"><ShieldCheck className="w-5 h-5 text-green-300" />Spatial and ocean intelligence</div>
            </div>
          </div>

          <div className="p-7 sm:p-10">
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-lg bg-[#0a1b35] flex items-center justify-center">
                <Waves className="text-white" />
              </div>
              <div>
                <p className="text-[9px] text-gray-400">GOVERNMENT OF INDIA</p>
                <h2 className="font-bold text-[#0a1b35]">SAGARMITRA AI</h2>
              </div>
            </div>
            
            <p className="text-xs font-bold text-[#11663F] uppercase tracking-widest">Secure Access</p>
            <h2 className="text-3xl font-bold text-[#0a1b35] mt-2">Sign in to Portal</h2>
            <p className="text-sm text-gray-500 mt-2">Access the marine intelligence command dashboard.</p>
            
            <form onSubmit={submit} className="mt-8 space-y-5">
              <label className="block">
                <span className="text-sm font-semibold text-gray-700">Official Email</span>
                <div className="mt-2 flex items-center border border-gray-300 rounded-lg px-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <input 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="w-full px-3 py-3 outline-none text-sm" 
                  />
                </div>
              </label>
              
              <label className="block">
                <span className="text-sm font-semibold text-gray-700">Password</span>
                <div className="mt-2 flex items-center border border-gray-300 rounded-lg px-3">
                  <Lock className="w-4 h-4 text-gray-400" />
                  <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    className="w-full px-3 py-3 outline-none text-sm" 
                  />
                </div>
              </label>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-xs flex gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
              
              <button className="w-full bg-[#11663F] hover:bg-[#0e5131] text-white rounded-lg py-3 font-bold text-sm transition">
                Sign In
              </button>
            </form>
            
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-xs font-bold text-[#0a1b35]">DEMO LOGIN</p>
              <p className="text-xs text-gray-600 mt-1">Email: commander@sagarmitra.ai</p>
              <p className="text-xs text-gray-600">Password: sagarmitra123</p>
            </div>
            
            <p className="text-[10px] text-gray-400 mt-6 text-center">Prototype only • Authentication is simulated locally</p>
          </div>
        </div>
      </div>
    );
  }

  // HOME / LANDING PAGE
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-[#11663F] selection:text-white">
      
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
         
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0a1b35] rounded-xl flex items-center justify-center shadow-sm">
              <Waves className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-[9px] text-gray-500 tracking-widest font-bold">GOVERNMENT OF INDIA</p>
              <h1 className="text-lg font-extrabold text-[#0a1b35] leading-tight">SAGARMITRA AI</h1>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <a href="#features" className="hover:text-[#11663F] transition">Features</a>
            <a href="#about" className="hover:text-[#11663F] transition">About</a>
            <a href="#contact" className="hover:text-[#11663F] transition">Contact</a>
          </div>

         
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView("login")}
              className="text-sm font-bold text-[#0a1b35] hover:text-[#11663F] transition hidden sm:block"
            >
               Login
            </button>
            <button 
              onClick={onLogin}
              className="bg-[#11663F] hover:bg-[#0e5131] text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-green-900/20 transition flex items-center gap-2"
            >
              Access Portal <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
          
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-xs font-bold mb-6">
                <ShieldCheck className="w-4 h-4" />
                ISRO Earth Observation Integrated
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0a1b35] leading-[1.1] tracking-tight mb-6">
                Agentic AI-Powered <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#11663F] to-emerald-500">
                  Marine Intelligence.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                Empowering marine operations with conversational intelligence. 
                SagarMitra autonomously correlates satellite Earth Observation data, INCOIS ocean analytics, and IMD weather feeds to provide explainable, context-aware maritime recommendations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onLogin}
                  className="bg-[#0a1b35] hover:bg-[#152e55] text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-xl shadow-blue-900/20 transition flex items-center justify-center gap-2"
                >
                  Launch Decision Dashboard <ArrowRight className="w-4 h-4" />
                </button>
                <button className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-8 py-3.5 rounded-xl text-sm font-bold transition flex items-center justify-center">
                  Read Technical Docs
                </button>
              </div>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-[#11663F]" />
                </div>
                <h3 className="text-lg font-bold text-[#0a1b35] mb-2">Conversational AI</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Access and reason over complex marine information using natural language queries in multiple regional languages.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <Compass className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-[#0a1b35] mb-2">PFZ Intelligence</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Autonomously correlates satellite chlorophyll and Sea Surface Temperature gradients to locate Potential Fishing Zones.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                  <Route className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-[#0a1b35] mb-2">Safe Routing</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Dynamic multi-waypoint navigation minimizing fuel burn while actively avoiding high swells and hazard zones.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-[#0a1b35] mb-2">Hazards & Geofencing</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Proactive alerts for cyclonic activity and geofencing notifications for International Maritime Boundaries.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#0a1b35] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to initiate your marine operations?</h2>
              <p className="text-blue-200 text-sm">Access the multi-agent decision support platform now.</p>
            </div>
            <button 
              onClick={() => setView("login")}
              className="bg-[#11663F] hover:bg-emerald-500 text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-green-900/40 transition shrink-0"
            >
              Sign In to SagarMitra
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <Waves className="w-4 h-4 text-gray-400" />
            <span>SagarMitra AI Platform © 2026. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#11663F]">Privacy Policy</a>
            <a href="#" className="hover:text-[#11663F]">Terms of Service</a>
            <a href="#" className="hover:text-[#11663F]">Guidelines</a>
          </div>
        </div>
      </footer>

    </div>
  );
}