"use client";

import { useState } from "react";
import {
  X,
  FileBarChart,
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader2,
  Download,
  Eye,
  ChevronRight
} from "lucide-react";
import { useMode } from "@/src/contexts/ModeContext";

export default function GenerateReportModal({ isOpen, onClose }) {
  const { mode } = useMode();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    reportType: "summary",
    dateFrom: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    dateTo: new Date().toISOString().split("T")[0],
    includeCharts: true,
    includeRawData: false,
    includeAlerts: true,
    format: "pdf"
  });
  const [generating, setGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState(null);

  if (!isOpen) return null;

  const reportTypes = [
    { id: "summary", label: "Summary Report", description: "Overview of key metrics and trends" },
    { id: "detailed", label: "Detailed Analysis", description: "In-depth analysis with all data points" },
    { id: "alerts", label: "Alerts Report", description: "Focus on warnings and critical events" },
    { id: "compliance", label: "Compliance Report", description: "Regulatory compliance summary" }
  ];

  const handleGenerate = async () => {
    setGenerating(true);
    setGenerationResult(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGenerationResult({
        type: "success",
        message: "Report generated successfully",
        fileName: `HydrateWatch_${formData.reportType}_${mode}_${formData.dateTo}.${formData.format}`
      });
      setStep(3);
    } catch (error) {
      setGenerationResult({ type: "error", message: "Failed to generate report" });
    } finally {
      setGenerating(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setGenerationResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal Container */}
      <div className="min-h-full flex items-center justify-center p-4">
        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <FileBarChart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Generate Report</h2>
              <p className="text-gray-300 mt-0.5">
                <span className="capitalize">{mode}</span> mode analysis
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-all ${
                  step === s
                    ? "bg-primary-500 text-white"
                    : step > s
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}>
                  {step > s ? <CheckCircle className="w-4 h-4" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-12 h-1 mx-1 rounded ${
                    step > s ? "bg-green-500" : "bg-gray-200"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Step 1: Configuration */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="font-semibold text-gray-900">Report Configuration</h3>

              {/* Report Type */}
              <div>
                <label className="text-gray-700 font-medium mb-2 block">Report Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {reportTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, reportType: type.id }))}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        formData.reportType === type.id
                          ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200"
                          : "border-gray-200 hover:border-primary-300"
                      }`}
                    >
                      <p className={`font-medium ${
                        formData.reportType === type.id ? "text-primary-700" : "text-gray-900"
                      }`}>
                        {type.label}
                      </p>
                      <p className="text-gray-500 mt-0.5">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Calendar className="w-4 h-4 text-primary-500" />
                  Date Range
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-gray-500 mb-1 block">From</label>
                    <input
                      type="date"
                      value={formData.dateFrom}
                      onChange={(e) => setFormData(prev => ({ ...prev, dateFrom: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 text-gray-900 bg-white"
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-500 mb-1 block">To</label>
                    <input
                      type="date"
                      value={formData.dateTo}
                      onChange={(e) => setFormData(prev => ({ ...prev, dateTo: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 text-gray-900 bg-white"
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 px-4 rounded-xl font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Preview & Options */}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="font-semibold text-gray-900">Report Options</h3>

              {/* Include Options */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.includeCharts}
                    onChange={(e) => setFormData(prev => ({ ...prev, includeCharts: e.target.checked }))}
                    className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Include Charts</p>
                    <p className="text-gray-500">Visual graphs and trend charts</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.includeRawData}
                    onChange={(e) => setFormData(prev => ({ ...prev, includeRawData: e.target.checked }))}
                    className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Include Raw Data</p>
                    <p className="text-gray-500">Detailed sensor readings table</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.includeAlerts}
                    onChange={(e) => setFormData(prev => ({ ...prev, includeAlerts: e.target.checked }))}
                    className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Include Alerts</p>
                    <p className="text-gray-500">Warning and alert history</p>
                  </div>
                </label>
              </div>

              {/* Format Selection */}
              <div>
                <label className="text-gray-700 font-medium mb-2 block">Export Format</label>
                <div className="flex gap-3">
                  {["pdf", "xlsx", "csv"].map((format) => (
                    <button
                      key={format}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, format }))}
                      className={`flex-1 py-3 px-4 rounded-xl border font-medium uppercase transition-all ${
                        formData.format === format
                          ? "border-primary-500 bg-primary-50 text-primary-700"
                          : "border-gray-200 text-gray-600 hover:border-primary-300"
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-2">Report Summary</h4>
                <div className="space-y-1 text-gray-600">
                  <p>Type: <span className="font-medium text-gray-900 capitalize">{formData.reportType}</span></p>
                  <p>Period: <span className="font-medium text-gray-900">{formData.dateFrom} to {formData.dateTo}</span></p>
                  <p>Mode: <span className="font-medium text-gray-900 capitalize">{mode}</span></p>
                  <p>Format: <span className="font-medium text-gray-900 uppercase">{formData.format}</span></p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    generating
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/25"
                  }`}
                >
                  {generating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileBarChart className="w-5 h-5" />
                      Generate Report
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Complete */}
          {step === 3 && generationResult && (
            <div className="space-y-5">
              {generationResult.type === "success" ? (
                <>
                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Report Ready</h3>
                    <p className="text-gray-600 mt-1">{generationResult.message}</p>
                  </div>

                  {/* Report Preview Card */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">Report Preview</h4>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">
                        Ready for Download
                      </span>
                    </div>

                    {/* Report Metadata */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Report Type</p>
                        <p className="font-medium text-gray-900 capitalize">{formData.reportType}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Operating Mode</p>
                        <p className="font-medium text-gray-900 capitalize">{mode}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Date Range</p>
                        <p className="font-medium text-gray-900 text-sm">{formData.dateFrom} - {formData.dateTo}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Format</p>
                        <p className="font-medium text-gray-900 uppercase">{formData.format}</p>
                      </div>
                    </div>

                    {/* Report Contents */}
                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">Report Contents</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.includeCharts && (
                          <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                            <CheckCircle className="w-3 h-3 mr-1" /> Charts & Graphs
                          </span>
                        )}
                        {formData.includeRawData && (
                          <span className="inline-flex items-center px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">
                            <CheckCircle className="w-3 h-3 mr-1" /> Raw Data
                          </span>
                        )}
                        {formData.includeAlerts && (
                          <span className="inline-flex items-center px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs font-medium">
                            <CheckCircle className="w-3 h-3 mr-1" /> Alert History
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Generated File Info */}
                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Generated File</p>
                      <p className="font-medium text-gray-900 text-sm break-all">{generationResult.fileName}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleClose}
                      className="flex-1 py-3 px-4 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-5 h-5" />
                      Preview
                    </button>
                    <button
                      className="flex-1 py-3 px-4 rounded-xl font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Generation Failed</h3>
                  <p className="text-gray-600 mt-1">{generationResult.message}</p>
                  <button
                    onClick={() => setStep(2)}
                    className="mt-4 py-3 px-6 rounded-xl font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
