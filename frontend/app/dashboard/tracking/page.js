"use client";

import { useState, useEffect } from "react";
import { useMode } from "@/src/contexts/ModeContext";
import { useSensorData } from "@/src/hooks/useSensorData";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import Sidebar from "@/src/components/Sidebar";
import Header from "@/src/components/Header";
import BottomNav from "@/src/components/BottomNav";
import Footer from "@/src/components/Footer";
import {
  Activity,
  Thermometer,
  Gauge,
  Droplets,
  Wind,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Search,
  Filter,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";

// Sensor definitions with mode-specific interpretations
const sensorDefinitions = {
  temperature: {
    id: "TEMP-001",
    name: "Temperature Sensor",
    unit: "°C",
    icon: Thermometer,
    color: "blue",
    offshore: {
      normalRange: "2°C - 8°C",
      description: "Subsea pipeline temperature monitoring. Critical for hydrate formation zone detection.",
      warningThreshold: 5,
      criticalThreshold: 3
    },
    onshore: {
      normalRange: "15°C - 35°C",
      description: "Ambient temperature monitoring at processing facility.",
      warningThreshold: 20,
      criticalThreshold: 15
    }
  },
  pressure: {
    id: "PRES-001",
    name: "Pressure Sensor",
    unit: "bar",
    icon: Gauge,
    color: "purple",
    offshore: {
      normalRange: "150 - 300 bar",
      description: "High-pressure subsea pipeline monitoring for hydrate equilibrium analysis.",
      warningThreshold: 250,
      criticalThreshold: 280
    },
    onshore: {
      normalRange: "20 - 80 bar",
      description: "Processing facility pressure monitoring with flow control integration.",
      warningThreshold: 60,
      criticalThreshold: 75
    }
  },
  flow_rate: {
    id: "FLOW-001",
    name: "Flow Rate Sensor",
    unit: "m³/h",
    icon: Wind,
    color: "green",
    offshore: {
      normalRange: "500 - 2000 m³/h",
      description: "Subsea flow measurement critical for production optimization and blockage detection.",
      warningThreshold: 600,
      criticalThreshold: 400
    },
    onshore: {
      normalRange: "100 - 500 m³/h",
      description: "Processing throughput monitoring for operational efficiency.",
      warningThreshold: 150,
      criticalThreshold: 100
    }
  },
  hydrate_risk: {
    id: "HYDR-001",
    name: "Hydrate Risk Calculator",
    unit: "%",
    icon: Droplets,
    color: "amber",
    offshore: {
      normalRange: "< 40%",
      description: "Real-time hydrate formation probability based on P-T conditions and water content.",
      warningThreshold: 40,
      criticalThreshold: 70
    },
    onshore: {
      normalRange: "< 30%",
      description: "Hydrate risk assessment for surface facilities and export pipelines.",
      warningThreshold: 30,
      criticalThreshold: 50
    }
  }
};

const colorClasses = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", iconBg: "bg-blue-100" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", iconBg: "bg-purple-100" },
  green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", iconBg: "bg-green-100" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", iconBg: "bg-amber-100" }
};

function TrackingContent() {
  const { data, loading, error } = useSensorData(5000);
  const { mode } = useMode();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const systemHealth = data?.hydrate_risk
    ? Math.max(0, 100 - data.hydrate_risk)
    : 92;

  useEffect(() => {
    if (data) {
      setLastRefresh(new Date());
    }
  }, [data]);

  const getSensorStatus = (sensorKey, value) => {
    if (!value && value !== 0) return { status: "offline", label: "Offline" };

    const config = sensorDefinitions[sensorKey][mode];
    if (!config) return { status: "active", label: "Active" };

    if (sensorKey === "hydrate_risk") {
      if (value >= config.criticalThreshold) return { status: "critical", label: "Critical" };
      if (value >= config.warningThreshold) return { status: "warning", label: "Warning" };
      return { status: "active", label: "Normal" };
    }

    // For temperature - lower is more critical in offshore
    if (sensorKey === "temperature" && mode === "offshore") {
      if (value <= config.criticalThreshold) return { status: "critical", label: "Critical" };
      if (value <= config.warningThreshold) return { status: "warning", label: "Warning" };
      return { status: "active", label: "Normal" };
    }

    // For pressure and flow - higher/lower thresholds
    if (value >= config.criticalThreshold) return { status: "warning", label: "Warning" };
    return { status: "active", label: "Normal" };
  };

  const getTrend = (sensorKey) => {
    // Simulated trend based on current values
    const randomTrend = Math.random();
    if (randomTrend > 0.6) return { direction: "up", icon: TrendingUp, color: "text-green-500" };
    if (randomTrend > 0.3) return { direction: "stable", icon: Minus, color: "text-gray-400" };
    return { direction: "down", icon: TrendingDown, color: "text-red-500" };
  };

  const statusClasses = {
    active: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
    warning: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
    critical: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
    offline: { bg: "bg-gray-100", text: "text-gray-500", dot: "bg-gray-400" }
  };

  const sensors = Object.entries(sensorDefinitions).map(([key, sensor]) => {
    const value = data?.[key];
    const statusInfo = getSensorStatus(key, value);
    const trend = getTrend(key);
    const modeConfig = sensor[mode];

    return {
      key,
      ...sensor,
      value,
      status: statusInfo.status,
      statusLabel: statusInfo.label,
      trend,
      modeConfig
    };
  });

  const filteredSensors = sensors.filter(sensor => {
    const matchesSearch = sensor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sensor.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sensor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = sensors.filter(s => s.status === "active").length;
  const warningCount = sensors.filter(s => s.status === "warning" || s.status === "critical").length;

  return (
    <div className="flex min-h-screen bg-dashboard-bg">
      <Sidebar systemHealth={systemHealth} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sensor Tracking</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Live sensor monitoring with mode-specific interpretation ({mode} environment)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Last update: {lastRefresh.toLocaleTimeString()}</span>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>

            {/* Status Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
                    <p className="text-sm text-gray-500">Active Sensors</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{warningCount}</p>
                    <p className="text-sm text-gray-500">Alerts Active</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{sensors.length}</p>
                    <p className="text-sm text-gray-500">Total Sensors</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search sensors by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="warning">Warning</option>
                    <option value="critical">Critical</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sensor Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredSensors.map((sensor) => {
                const Icon = sensor.icon;
                const TrendIcon = sensor.trend.icon;
                const colors = colorClasses[sensor.color];
                const statusStyle = statusClasses[sensor.status];

                return (
                  <div
                    key={sensor.key}
                    className={`bg-white rounded-xl shadow-sm border ${colors.border} p-5 hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors.iconBg}`}>
                          <Icon className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{sensor.name}</h3>
                          <p className="text-xs text-gray-500">{sensor.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}></span>
                          {sensor.statusLabel}
                        </span>
                      </div>
                    </div>

                    {/* Current Value */}
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Current Reading</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {sensor.value !== undefined ? sensor.value.toFixed(1) : '—'}
                          <span className="text-lg font-normal text-gray-500 ml-1">{sensor.unit}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendIcon className={`w-5 h-5 ${sensor.trend.color}`} />
                        <span className="text-xs text-gray-500 capitalize">{sensor.trend.direction}</span>
                      </div>
                    </div>

                    {/* Mode-specific Info */}
                    <div className={`rounded-lg p-3 ${colors.bg}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-600">Normal Range ({mode})</span>
                        <span className={`text-xs font-semibold ${colors.text}`}>{sensor.modeConfig.normalRange}</span>
                      </div>
                      <p className="text-xs text-gray-600">{sensor.modeConfig.description}</p>
                    </div>

                    {/* Last Reading Time */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">Last reading</span>
                      <span className="text-xs text-gray-600 font-medium">
                        {loading ? 'Updating...' : 'Just now'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredSensors.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No sensors found</h3>
                <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
              </div>
            )}

            {/* Footer spacing for mobile */}
            <div className="h-20 lg:hidden"></div>
          </div>
        </main>

        <div className="hidden lg:block">
          <Footer />
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <ProtectedRoute>
      <TrackingContent />
    </ProtectedRoute>
  );
}
