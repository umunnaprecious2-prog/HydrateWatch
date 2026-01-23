"use client";

import { useMode } from "@/src/contexts/ModeContext";
import { Ship, Factory, FlaskConical, Play, Waves, Thermometer } from "lucide-react";

export default function ModeSelector() {
  const { mode, setMode, simulationMode, setSimulationMode, demoMode, setDemoMode } = useMode();

  const modeConfig = {
    offshore: {
      icon: Ship,
      title: "Offshore",
      description: "High-pressure, low-temperature subsea pipeline conditions",
      accent: "blue",
      bgActive: "bg-blue-50",
      borderActive: "border-blue-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    onshore: {
      icon: Factory,
      title: "Onshore",
      description: "Ambient temperature with operational flow control",
      accent: "green",
      bgActive: "bg-green-50",
      borderActive: "border-green-500",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex flex-col gap-6">
        {/* Mode Cards */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Operating Environment
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(modeConfig).map(([key, config]) => {
              const Icon = config.icon;
              const isActive = mode === key;
              return (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                    isActive
                      ? `${config.bgActive} ${config.borderActive} shadow-sm`
                      : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {isActive && (
                    <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${config.iconBg.replace('100', '500')}`}></div>
                  )}
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isActive ? config.iconBg : "bg-gray-200"
                    }`}>
                      <Icon className={`w-5 h-5 ${isActive ? config.iconColor : "text-gray-500"}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isActive ? "text-gray-900" : "text-gray-700"}`}>
                        {config.title}
                      </h3>
                      <p className={`text-xs mt-0.5 ${isActive ? "text-gray-600" : "text-gray-500"}`}>
                        {config.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Simulation Controls */}
        <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="simulation-mode"
                checked={simulationMode}
                onChange={(e) => setSimulationMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-500 transition-colors"></div>
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
            </div>
            <div className="flex items-center gap-2">
              <FlaskConical className={`w-4 h-4 ${simulationMode ? "text-primary-500" : "text-gray-400"}`} />
              <div>
                <span className="text-sm font-medium text-gray-700">Simulation Mode</span>
                <p className="text-xs text-gray-500">Use uploaded data for analysis</p>
              </div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="demo-mode"
                checked={demoMode}
                onChange={(e) => setDemoMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-500 transition-colors"></div>
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
            </div>
            <div className="flex items-center gap-2">
              <Play className={`w-4 h-4 ${demoMode ? "text-primary-500" : "text-gray-400"}`} />
              <div>
                <span className="text-sm font-medium text-gray-700">Demo Mode</span>
                <p className="text-xs text-gray-500">Generate sample sensor readings</p>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
