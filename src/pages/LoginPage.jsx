import React, { useState } from "react";
import { AlertTriangle, Lock, Mail, ShieldCheck, Waves } from "lucide-react";

export default function LoginPage({ onLogin }) {
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        {/* Left Side - Branding */}
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

        {/* Right Side - Login Form */}
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
            
            <button className="w-full bg-[#11663F] hover:bg-[#0e5131] text-white rounded-lg py-3 font-bold text-sm">
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