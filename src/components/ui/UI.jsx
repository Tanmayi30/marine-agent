import React from "react";
import { ArrowUp } from "lucide-react";

export const Card = ({ children, className = "", title, action }) => (
  <div className={`bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden ${className}`}>
    {(title || action) && (
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-bold text-[#0a1b35] uppercase tracking-wider">{title}</h3>
        {action}
      </div>
    )}
    {children}
  </div>
);

export const Badge = ({ children, severity = "default", className = "" }) => {
  const styles = {
    Critical: "bg-red-50 text-red-700 border-red-200",
    High: "bg-orange-50 text-orange-700 border-orange-200",
    Moderate: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Low: "bg-green-50 text-green-700 border-green-200",
    default: "bg-blue-50 text-blue-700 border-blue-200"
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[severity] || styles.default} ${className}`}>
      {children}
    </span>
  );
};

export const StatCard = ({ title, value, sub, icon: Icon, iconClass = "text-[#11663F]", trend }) => (
  <Card className="p-4">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{title}</p>
        <p className="text-3xl font-bold text-[#0a1b35] mt-2">{value}</p>
        <p className={`text-xs mt-2 flex items-center gap-1 ${trend ? "text-[#11663F]" : "text-gray-500"}`}>
          {trend && <ArrowUp className="h-3 w-3" />}
          {sub}
        </p>
      </div>
      <div className={`w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center ${iconClass}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </Card>
);