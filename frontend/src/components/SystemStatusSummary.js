"use client";

import { Wifi, WifiOff, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function SystemStatusSummary({ data, error, loading }) {
  const isConnected = !error && !loading;
  const hydrateRisk = data?.hydrate_risk || 0;
  const lastUpdate = new Date().toUTCString().slice(0, -4) + " UTC";

  const getRiskLevel = (risk) => {
    if (risk >= 70) return { label: "High", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: AlertTriangle };
    if (risk >= 40) return { label: "Moderate", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: AlertTriangle };
    return { label: "Low", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: CheckCircle };
  };

  const riskStatus = getRiskLevel(hydrateRisk);
  const RiskIcon = riskStatus.icon;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Data Feed Status */}
        <div className={`flex items-center gap-3 p-3 rounded-lg ${isConnected ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isConnected ? "bg-green-100" : "bg-red-100"}`}>
            {isConnected ? (
              <Wifi className="w-5 h-5 text-green-600" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-600" />
            )}
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Data Feed</p>
            <p className={`text-sm font-semibold ${isConnected ? "text-green-700" : "text-red-700"}`}>
              {loading ? "Connecting..." : isConnected ? "Connected" : "Disconnected"}
            </p>
          </div>
        </div>

        {/* Current Hydrate Risk Level */}
        <div className={`flex items-center gap-3 p-3 rounded-lg ${riskStatus.bg} border ${riskStatus.border}`}>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${riskStatus.bg}`}>
            <RiskIcon className={`w-5 h-5 ${riskStatus.color}`} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Hydrate Risk</p>
            <p className={`text-sm font-semibold ${riskStatus.color}`}>
              {riskStatus.label} ({Number(hydrateRisk).toFixed(2)}%)
            </p>
          </div>
        </div>

        {/* Last Successful Update */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100">
            <Clock className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Last Update</p>
            <p className="text-sm font-semibold text-gray-700">
              {isConnected ? lastUpdate : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
