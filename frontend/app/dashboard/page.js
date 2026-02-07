"use client";

import { useState, useEffect } from "react";
import { useSensorData } from "@/src/hooks/useSensorData";
import { useMode } from "@/src/contexts/ModeContext";
import KpiCards from "@/src/components/KpiCards";
import SensorChart from "@/src/components/SensorChart";
import RiskGauge from "@/src/components/RiskGauge";
import ModeSelector from "@/src/components/ModeSelector";
import FileUpload from "@/src/components/FileUpload";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import Sidebar from "@/src/components/Sidebar";
import Header from "@/src/components/Header";
import TasksList from "@/src/components/TasksList";
import DataTable from "@/src/components/DataTable";
import BottomNav from "@/src/components/BottomNav";
import SystemStatusSummary from "@/src/components/SystemStatusSummary";
import Footer from "@/src/components/Footer";
import api from "@/src/lib/api";
import { AlertTriangle, RefreshCw, LogIn, Ship, Factory } from "lucide-react";

function DashboardContent() {
  const { data, loading, error, refetch } = useSensorData(5000);
  const { mode } = useMode();
  const [historyData, setHistoryData] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Calculate system health based on hydrate risk
  const systemHealth = data?.hydrate_risk
    ? Math.max(0, 100 - data.hydrate_risk)
    : 92;

  useEffect(() => {
    if (!mode) return;

    const fetchHistory = async () => {
      try {
        const response = await api.get(`/sensors/history/${mode}`);
        setHistoryData(response.data || []);
      } catch (err) {
        console.error("Error fetching history:", err);
        setHistoryData([]);
      }
    };

    fetchHistory();
  }, [mode]);

  useEffect(() => {
    if (data && data.hydrate_risk) {
      const risk = data.hydrate_risk;
      const timestamp = new Date().toLocaleString();

      if (risk > 70) {
        setAlerts((prev) => [
          { level: "high", message: `Critical hydrate risk: ${risk}%`, time: timestamp },
          ...prev.slice(0, 4),
        ]);
      } else if (risk > 40) {
        setAlerts((prev) => [
          { level: "medium", message: `Moderate hydrate risk: ${risk}%`, time: timestamp },
          ...prev.slice(0, 4),
        ]);
      }
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-dashboard-bg">
        <Sidebar systemHealth={systemHealth} />
        <div className="flex-1 flex flex-col">
          <Header onDataRefresh={refetch} />
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              <p className="mt-4 text-gray-500">Loading dashboard...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-dashboard-bg">
      <Sidebar systemHealth={systemHealth} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onDataRefresh={refetch} />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            {/* Page Title - Mode Aware */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Hydrate Risk Dashboard — <span className="capitalize">{mode}</span>
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {mode === 'offshore'
                    ? "Real-time monitoring under high-pressure, low-temperature subsea conditions."
                    : "Real-time monitoring influenced by ambient temperature and operational control."}
                </p>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                mode === 'offshore'
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-green-50 border-green-200'
              }`}>
                {mode === 'offshore' ? (
                  <Ship className="w-5 h-5 text-blue-600" />
                ) : (
                  <Factory className="w-5 h-5 text-green-600" />
                )}
                <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                  mode === 'offshore' ? 'bg-blue-500' : 'bg-green-500'
                }`}></div>
                <span className={`text-sm font-medium ${
                  mode === 'offshore' ? 'text-blue-700' : 'text-green-700'
                }`}>
                  {mode === 'offshore' ? 'Offshore Mode Active' : 'Onshore Mode Active'}
                </span>
              </div>
            </div>

            {/* Mode Selector */}
            <ModeSelector />

            {/* Professional Error Alert */}
            {error && (
              <div className={`rounded-xl p-4 border ${
                error.includes('401') || error.includes('auth')
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    error.includes('401') || error.includes('auth')
                      ? 'bg-amber-100'
                      : 'bg-red-100'
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      error.includes('401') || error.includes('auth')
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      error.includes('401') || error.includes('auth')
                        ? 'text-amber-800'
                        : 'text-red-800'
                    }`}>
                      {error.includes('401') || error.includes('auth')
                        ? 'Session Expired'
                        : 'Data Connection Issue'}
                    </h3>
                    <p className={`text-sm mt-1 ${
                      error.includes('401') || error.includes('auth')
                        ? 'text-amber-700'
                        : 'text-red-700'
                    }`}>
                      {error.includes('401') || error.includes('auth')
                        ? 'Your session has expired. Please re-authenticate to continue monitoring.'
                        : 'Unable to retrieve sensor data. This may be a temporary connection issue.'}
                    </p>
                    <p className={`text-xs mt-2 ${
                      error.includes('401') || error.includes('auth')
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }`}>
                      <strong>Suggested action:</strong> {error.includes('401') || error.includes('auth')
                        ? 'Click below to sign in again with your credentials.'
                        : 'Check your network connection or try refreshing the page.'}
                    </p>
                    <button
                      onClick={() => error.includes('401') || error.includes('auth')
                        ? window.location.href = '/login'
                        : window.location.reload()
                      }
                      className={`mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        error.includes('401') || error.includes('auth')
                          ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {error.includes('401') || error.includes('auth') ? (
                        <>
                          <LogIn className="w-4 h-4" />
                          Re-authenticate
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4" />
                          Retry Connection
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* System Status Summary */}
            <SystemStatusSummary data={data} error={error} loading={loading} />

            {/* Simulation Input - File Upload - CENTERED */}
            <div className="flex justify-center">
              <div className="w-full max-w-3xl">
                <FileUpload onUploadSuccess={refetch} />
              </div>
            </div>

            {/* KPI Cards - Temperature, Pressure, Hydrate Risk, Flow Rate */}
            <KpiCards data={data} />

            {/* Charts Row - Sensor Chart and Risk Gauge */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SensorChart data={historyData} type="sensor" />
              <RiskGauge risk={data?.hydrate_risk} />
            </div>

            {/* Tasks and Alerts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TasksList />

              {/* Recent Alerts */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Alerts</h2>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {alerts.length} alerts
                  </span>
                </div>
                {alerts.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">No alerts - system running smoothly</p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {alerts.map((alert, index) => (
                      <li
                        key={index}
                        className={`p-3 rounded-lg border transition-all hover:shadow-sm ${
                          alert.level === "high"
                            ? "bg-red-50 border-red-200"
                            : alert.level === "medium"
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-green-50 border-green-200"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                            alert.level === "high"
                              ? "bg-red-500"
                              : alert.level === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}></div>
                          <div className="flex-1">
                            <p
                              className={`text-sm font-medium ${
                                alert.level === "high"
                                  ? "text-red-800"
                                  : alert.level === "medium"
                                  ? "text-yellow-800"
                                  : "text-green-800"
                              }`}
                            >
                              {alert.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Data Table */}
            <DataTable />

            {/* Bottom padding for mobile nav */}
            <div className="h-20 lg:hidden"></div>
          </div>
        </main>

        {/* Footer - visible on desktop */}
        <div className="hidden lg:block">
          <Footer />
        </div>

        {/* Bottom Navigation for Mobile/Tablet */}
        <BottomNav />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
