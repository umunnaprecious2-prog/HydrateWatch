"use client";

import { useState } from "react";
import { useMode } from "@/src/contexts/ModeContext";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import Sidebar from "@/src/components/Sidebar";
import Header from "@/src/components/Header";
import BottomNav from "@/src/components/BottomNav";
import Footer from "@/src/components/Footer";
import {
  FileText,
  Download,
  Calendar,
  Filter,
  FileSpreadsheet,
  File,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Ship,
  Factory,
  BarChart3,
  PieChart,
  Activity,
  X
} from "lucide-react";

// Sample report history
const reportHistory = [
  {
    id: 1,
    name: "Weekly Hydrate Risk Summary",
    type: "risk_summary",
    dateRange: "Jan 14 - Jan 21, 2026",
    generatedAt: "2026-01-21T10:30:00Z",
    format: "PDF",
    size: "2.4 MB",
    status: "completed"
  },
  {
    id: 2,
    name: "Sensor Performance Report",
    type: "sensor_performance",
    dateRange: "Jan 1 - Jan 21, 2026",
    generatedAt: "2026-01-20T14:15:00Z",
    format: "CSV",
    size: "1.8 MB",
    status: "completed"
  },
  {
    id: 3,
    name: "Monthly Operations Summary",
    type: "operations",
    dateRange: "Dec 1 - Dec 31, 2025",
    generatedAt: "2026-01-02T09:00:00Z",
    format: "PDF",
    size: "4.2 MB",
    status: "completed"
  }
];

const reportTypes = [
  {
    id: "risk_summary",
    name: "Hydrate Risk Summary",
    description: "Comprehensive analysis of hydrate formation risk over selected period",
    icon: AlertTriangle,
    color: "amber",
    metrics: ["Peak risk levels", "Risk duration analysis", "Threshold breach events"]
  },
  {
    id: "sensor_performance",
    name: "Sensor Performance",
    description: "Sensor uptime, accuracy, and calibration status report",
    icon: Activity,
    color: "blue",
    metrics: ["Sensor availability", "Data quality score", "Calibration status"]
  },
  {
    id: "operations",
    name: "Operations Summary",
    description: "Overall operational metrics including production and alerts",
    icon: BarChart3,
    color: "green",
    metrics: ["Production efficiency", "Alert response times", "Maintenance activities"]
  },
  {
    id: "trend_analysis",
    name: "Trend Analysis",
    description: "Long-term trend analysis for predictive insights",
    icon: TrendingUp,
    color: "purple",
    metrics: ["Temperature trends", "Pressure patterns", "Seasonal variations"]
  }
];

const colorClasses = {
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", iconBg: "bg-amber-100" },
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", iconBg: "bg-blue-100" },
  green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", iconBg: "bg-green-100" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", iconBg: "bg-purple-100" }
};

function ReportsContent() {
  const { mode } = useMode();
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [exportFormat, setExportFormat] = useState("pdf");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [showValidationError, setShowValidationError] = useState(false);

  const handleGenerateReport = (reportType) => {
    if (!dateFrom || !dateTo) {
      setShowValidationError(true);
      setTimeout(() => setShowValidationError(false), 3000);
      return;
    }
    setShowValidationError(false);
    setIsGenerating(true);
    setSelectedReport(reportType);

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // Generate mock report data
      const mockReport = {
        id: Date.now(),
        name: reportType.name,
        type: reportType.id,
        dateRange: `${new Date(dateFrom).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(dateTo).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
        generatedAt: new Date().toISOString(),
        format: exportFormat.toUpperCase(),
        size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
        mode: mode,
        metrics: reportType.metrics,
        status: "completed",
        // Mock summary data based on report type
        summary: {
          totalRecords: Math.floor(Math.random() * 1000 + 500),
          avgRisk: (Math.random() * 30 + 10).toFixed(1),
          peakRisk: (Math.random() * 40 + 35).toFixed(1),
          alertCount: Math.floor(Math.random() * 20 + 5),
          uptime: (Math.random() * 5 + 95).toFixed(1)
        }
      };
      setGeneratedReport(mockReport);
    }, 2000);
  };

  const clearGeneratedReport = () => {
    setGeneratedReport(null);
    setSelectedReport(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex min-h-screen bg-dashboard-bg">
      <Sidebar systemHealth={92} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reporting</h1>
              <p className="text-sm text-gray-500 mt-1">
                Generate and export operational reports with mode-specific summaries
              </p>
            </div>

            {/* Mode Context Banner */}
            <div className={`rounded-xl p-4 border ${
              mode === 'offshore'
                ? 'bg-blue-50 border-blue-200'
                : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center gap-3">
                {mode === 'offshore' ? (
                  <Ship className="w-6 h-6 text-blue-600" />
                ) : (
                  <Factory className="w-6 h-6 text-green-600" />
                )}
                <div>
                  <h3 className={`font-semibold ${mode === 'offshore' ? 'text-blue-800' : 'text-green-800'}`}>
                    {mode === 'offshore' ? 'Offshore' : 'Onshore'} Environment Reports
                  </h3>
                  <p className={`text-sm ${mode === 'offshore' ? 'text-blue-700' : 'text-green-700'}`}>
                    {mode === 'offshore'
                      ? 'Reports will include subsea pressure-temperature analysis and deepwater risk metrics.'
                      : 'Reports will include ambient condition analysis and surface facility metrics.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Date Range & Export Options */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
                  <select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="csv">CSV Spreadsheet</option>
                    <option value="xlsx">Excel Workbook</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg w-full">
                    {exportFormat === 'pdf' && <File className="w-4 h-4" />}
                    {exportFormat === 'csv' && <FileSpreadsheet className="w-4 h-4" />}
                    {exportFormat === 'xlsx' && <FileSpreadsheet className="w-4 h-4" />}
                    <span>{exportFormat.toUpperCase()} Export</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Validation Error Message */}
            {showValidationError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-800 font-medium">Please select both a start and end date before generating a report.</p>
              </div>
            )}

            {/* Generated Report Preview - Shows after successful generation */}
            {generatedReport && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-800">Report Generated Successfully</h3>
                      <p className="text-green-700">Your report is ready for download</p>
                    </div>
                  </div>
                  <button
                    onClick={clearGeneratedReport}
                    className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-green-600" />
                  </button>
                </div>

                {/* Report Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-white rounded-lg p-3 border border-green-100">
                    <p className="text-xs text-gray-500 mb-1">Report Type</p>
                    <p className="font-semibold text-gray-900">{generatedReport.name}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-100">
                    <p className="text-xs text-gray-500 mb-1">Date Range</p>
                    <p className="font-semibold text-gray-900 text-sm">{generatedReport.dateRange}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-100">
                    <p className="text-xs text-gray-500 mb-1">Mode</p>
                    <p className="font-semibold text-gray-900 capitalize">{generatedReport.mode}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-100">
                    <p className="text-xs text-gray-500 mb-1">Format</p>
                    <p className="font-semibold text-gray-900">{generatedReport.format} ({generatedReport.size})</p>
                  </div>
                </div>

                {/* Report Summary Metrics */}
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <h4 className="font-semibold text-gray-900 mb-3">Report Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">{generatedReport.summary.totalRecords}</p>
                      <p className="text-xs text-gray-500">Total Records</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{generatedReport.summary.avgRisk}%</p>
                      <p className="text-xs text-gray-500">Avg Risk</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-amber-600">{generatedReport.summary.peakRisk}%</p>
                      <p className="text-xs text-gray-500">Peak Risk</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">{generatedReport.summary.alertCount}</p>
                      <p className="text-xs text-gray-500">Alerts</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{generatedReport.summary.uptime}%</p>
                      <p className="text-xs text-gray-500">Uptime</p>
                    </div>
                  </div>
                </div>

                {/* Included Metrics */}
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <p className="text-xs text-gray-500 mb-2">Metrics Included</p>
                  <div className="flex flex-wrap gap-2">
                    {generatedReport.metrics.map((metric, idx) => (
                      <span key={idx} className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">
                        <CheckCircle className="w-3 h-3 mr-1" /> {metric}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={clearGeneratedReport}
                    className="flex-1 py-3 px-4 rounded-xl font-medium bg-white border border-green-200 text-green-700 hover:bg-green-50 transition-colors"
                  >
                    Generate Another
                  </button>
                  <button className="flex-1 py-3 px-4 rounded-xl font-medium bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Report
                  </button>
                </div>
              </div>
            )}

            {/* Report Types */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Reports</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTypes.map((report) => {
                  const Icon = report.icon;
                  const colors = colorClasses[report.color];

                  return (
                    <div
                      key={report.id}
                      className={`bg-white rounded-xl shadow-sm border ${colors.border} p-5 hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.iconBg}`}>
                          <Icon className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{report.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{report.description}</p>

                          {/* Metrics included */}
                          <div className="mt-3">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Includes:</p>
                            <div className="flex flex-wrap gap-1">
                              {report.metrics.map((metric, idx) => (
                                <span key={idx} className="inline-flex px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                  {metric}
                                </span>
                              ))}
                            </div>
                          </div>

                          <button
                            onClick={() => handleGenerateReport(report)}
                            disabled={isGenerating}
                            className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              isGenerating && selectedReport?.id === report.id
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : `${colors.bg} ${colors.text} hover:opacity-80`
                            }`}
                          >
                            {isGenerating && selectedReport?.id === report.id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                                Generating...
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4" />
                                Generate Report
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {reportHistory.length} reports
                </span>
              </div>

              <div className="space-y-3">
                {reportHistory.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                        {report.format === 'PDF' ? (
                          <File className="w-5 h-5 text-red-500" />
                        ) : (
                          <FileSpreadsheet className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{report.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500">{report.dateRange}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-gray-500">Generated</p>
                        <p className="text-xs font-medium text-gray-700">{formatDate(report.generatedAt)}</p>
                      </div>
                      <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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

export default function ReportsPage() {
  return (
    <ProtectedRoute>
      <ReportsContent />
    </ProtectedRoute>
  );
}
