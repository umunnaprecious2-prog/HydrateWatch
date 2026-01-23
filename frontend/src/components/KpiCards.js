"use client";

import { Thermometer, Gauge, AlertTriangle, Activity, TrendingUp, TrendingDown, Minus } from "lucide-react";

// Demo data when no real data is available
const demoData = {
  temperature: 15.4,
  pressure: 42.8,
  hydrate_risk: 35,
  flow_rate: 865.2
};

export default function KpiCards({ data }) {
  // Use demo data if no real data provided
  const displayData = data && (data.temperature || data.pressure || data.hydrate_risk || data.flow_rate)
    ? data
    : demoData;

  const isDemo = !data || (!data.temperature && !data.pressure && !data.hydrate_risk && !data.flow_rate);

  const kpis = [
    {
      label: "Temperature",
      value: displayData?.temperature ? `${Number(displayData.temperature).toFixed(2)}°C` : "N/A",
      icon: Thermometer,
      trend: { value: 1.20, direction: "down" },
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
      description: "Current pipeline temperature"
    },
    {
      label: "Pressure",
      value: displayData?.pressure ? `${Number(displayData.pressure).toFixed(2)} bar` : "N/A",
      icon: Gauge,
      trend: { value: 0.80, direction: "up" },
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
      description: "Operating pressure level"
    },
    {
      label: "Hydrate Risk",
      value: displayData?.hydrate_risk ? `${Number(displayData.hydrate_risk).toFixed(2)}%` : "N/A",
      icon: AlertTriangle,
      trend: { value: 5.20, direction: displayData?.hydrate_risk > 50 ? "up" : "down" },
      iconColor: displayData?.hydrate_risk > 70 ? "text-red-500" : displayData?.hydrate_risk > 40 ? "text-yellow-500" : "text-green-500",
      iconBg: displayData?.hydrate_risk > 70 ? "bg-red-100" : displayData?.hydrate_risk > 40 ? "bg-yellow-100" : "bg-green-100",
      description: "Formation probability"
    },
    {
      label: "Flow Rate",
      value: displayData?.flow_rate ? `${Number(displayData.flow_rate).toFixed(2)} m³/h` : "N/A",
      icon: Activity,
      trend: { value: 3.10, direction: "up" },
      iconColor: "text-purple-500",
      iconBg: "bg-purple-100",
      description: "Current flow volume"
    },
  ];

  const getTrendIcon = (direction) => {
    if (direction === "up") return <TrendingUp className="w-4 h-4" />;
    if (direction === "down") return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = (direction, label) => {
    if (label === "Hydrate Risk") {
      return direction === "up" ? "text-red-500" : "text-green-500";
    }
    return direction === "up" ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="space-y-3">
      {isDemo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <p className="text-blue-700 font-medium">Displaying demo data — Connect sensors for live readings</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${kpi.iconBg}`}>
                  <Icon className={`w-6 h-6 ${kpi.iconColor}`} />
                </div>
                {kpi.trend && (
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg font-medium ${
                    getTrendColor(kpi.trend.direction, kpi.label)
                  } ${
                    kpi.trend.direction === "up"
                      ? kpi.label === "Hydrate Risk" ? "bg-red-50" : "bg-green-50"
                      : kpi.label === "Hydrate Risk" ? "bg-green-50" : "bg-red-50"
                  }`}>
                    {getTrendIcon(kpi.trend.direction)}
                    <span>{kpi.trend.value}%</span>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <p className="text-gray-500 font-medium">{kpi.label}</p>
                <p className={`text-3xl font-bold mt-1 ${
                  kpi.label === "Hydrate Risk"
                    ? (displayData?.hydrate_risk > 70 ? "text-red-500" : displayData?.hydrate_risk > 40 ? "text-yellow-500" : "text-green-500")
                    : "text-gray-900"
                }`}>
                  {kpi.value}
                </p>
                <p className="text-gray-400 mt-1">{kpi.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
