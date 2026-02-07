"use client";

import { useState } from "react";
import {
  X,
  Thermometer,
  Gauge,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Zap,
  Activity,
  Eye
} from "lucide-react";
import { useMode } from "@/src/contexts/ModeContext";
import api from "@/src/lib/api";

export default function AddReadingModal({ isOpen, onClose, onSuccess }) {
  const { mode } = useMode();
  const [formData, setFormData] = useState({
    temperature: "",
    pressure: "",
    flowRate: "",
    timestamp: new Date().toISOString().slice(0, 16),
    notes: ""
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [generatedReading, setGeneratedReading] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    // Temperature validation
    const temp = parseFloat(formData.temperature);
    if (!formData.temperature) {
      newErrors.temperature = "Temperature is required";
    } else if (isNaN(temp)) {
      newErrors.temperature = "Must be a valid number";
    } else if (temp < -50 || temp > 150) {
      newErrors.temperature = "Must be between -50°C and 150°C";
    }

    // Pressure validation
    const pressure = parseFloat(formData.pressure);
    if (!formData.pressure) {
      newErrors.pressure = "Pressure is required";
    } else if (isNaN(pressure)) {
      newErrors.pressure = "Must be a valid number";
    } else if (pressure < 0 || pressure > 500) {
      newErrors.pressure = "Must be between 0 and 500 bar";
    }

    // Flow rate validation (optional but must be valid if provided)
    if (formData.flowRate) {
      const flow = parseFloat(formData.flowRate);
      if (isNaN(flow)) {
        newErrors.flowRate = "Must be a valid number";
      } else if (flow < 0) {
        newErrors.flowRate = "Cannot be negative";
      }
    }

    // Timestamp validation
    if (!formData.timestamp) {
      newErrors.timestamp = "Timestamp is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    setSubmitResult(null);

    try {
      const payload = {
        mode: mode,
        temperature: parseFloat(formData.temperature),
        pressure: parseFloat(formData.pressure),
        flow_rate: formData.flowRate ? parseFloat(formData.flowRate) : 0
      };

      const response = await api.post("/sensors/add", payload);
      console.log("Sensor reading added:", response.data);

      setSubmitResult({
        type: "success",
        message: `Reading added successfully! Hydrate Risk: ${response.data.hydrate_risk?.toFixed(1) || 0}%`
      });

      // Trigger dashboard refresh
      if (onSuccess) {
        onSuccess();
      }

      // Reset form after success
      setTimeout(() => {
        setFormData({
          temperature: "",
          pressure: "",
          flowRate: "",
          timestamp: new Date().toISOString().slice(0, 16),
          notes: ""
        });
        setSubmitResult(null);
        setGeneratedReading(null);
        setShowPreview(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Failed to add reading:", error);
      setSubmitResult({
        type: "error",
        message: error.response?.data?.detail || "Failed to add reading"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
    // Clear generated reading when user modifies form
    if (generatedReading) {
      setGeneratedReading(null);
      setShowPreview(false);
    }
  };

  // Generate random reading based on mode
  const handleGenerateReading = () => {
    const generated = {
      temperature: mode === 'offshore'
        ? (Math.random() * 6 + 2).toFixed(2) // 2-8°C for offshore
        : (Math.random() * 20 + 15).toFixed(2), // 15-35°C for onshore
      pressure: mode === 'offshore'
        ? (Math.random() * 150 + 150).toFixed(2) // 150-300 bar for offshore
        : (Math.random() * 60 + 20).toFixed(2), // 20-80 bar for onshore
      flowRate: mode === 'offshore'
        ? (Math.random() * 1500 + 500).toFixed(2) // 500-2000 m³/h for offshore
        : (Math.random() * 400 + 100).toFixed(2), // 100-500 m³/h for onshore
      timestamp: new Date().toISOString().slice(0, 16),
      hydrateRisk: mode === 'offshore'
        ? (Math.random() * 40).toFixed(2) // 0-40% for offshore normal
        : (Math.random() * 30).toFixed(2), // 0-30% for onshore normal
    };

    setGeneratedReading(generated);
    setShowPreview(true);
    setFormData({
      temperature: generated.temperature,
      pressure: generated.pressure,
      flowRate: generated.flowRate,
      timestamp: generated.timestamp,
      notes: `Auto-generated ${mode} reading`
    });
    setErrors({});
  };

  // Apply generated reading to form
  const applyGeneratedReading = () => {
    if (generatedReading) {
      setShowPreview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Container - allows scrolling */}
      <div className="min-h-full flex items-center justify-center p-4">
        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Add Sensor Reading</h2>
            <p className="text-primary-100 mt-0.5">
              Manual entry for <span className="font-medium capitalize">{mode}</span> mode
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Generate Reading Button */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleGenerateReading}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
            >
              <Zap className="w-5 h-5" />
              Generate Reading
            </button>
          </div>

          {/* Generated Reading Preview */}
          {showPreview && generatedReading && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">Generated Reading Preview</h4>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium capitalize">
                  {mode} Mode
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    Temperature
                  </div>
                  <p className="text-lg font-bold text-gray-900">{generatedReading.temperature}°C</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Gauge className="w-4 h-4 text-blue-500" />
                    Pressure
                  </div>
                  <p className="text-lg font-bold text-gray-900">{generatedReading.pressure} bar</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Activity className="w-4 h-4 text-purple-500" />
                    Flow Rate
                  </div>
                  <p className="text-lg font-bold text-gray-900">{generatedReading.flowRate} m³/h</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    Hydrate Risk
                  </div>
                  <p className={`text-lg font-bold ${
                    parseFloat(generatedReading.hydrateRisk) > 30 ? 'text-amber-600' : 'text-green-600'
                  }`}>
                    {generatedReading.hydrateRisk}%
                  </p>
                </div>
              </div>

              <p className="text-sm text-green-700">
                Values have been populated in the form below. Click "Add Reading" to save.
              </p>
            </div>
          )}

          {/* Temperature */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <Thermometer className="w-4 h-4 text-primary-500" />
              Temperature (°C) *
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.temperature}
              onChange={(e) => handleChange("temperature", e.target.value)}
              placeholder="Enter temperature"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-900 bg-white ${
                errors.temperature
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-300 focus:ring-primary-200 focus:border-primary-400"
              }`}
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            />
            {errors.temperature && (
              <p className="mt-1 text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.temperature}
              </p>
            )}
          </div>

          {/* Pressure */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <Gauge className="w-4 h-4 text-primary-500" />
              Pressure (bar) *
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.pressure}
              onChange={(e) => handleChange("pressure", e.target.value)}
              placeholder="Enter pressure"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-900 bg-white ${
                errors.pressure
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-300 focus:ring-primary-200 focus:border-primary-400"
              }`}
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            />
            {errors.pressure && (
              <p className="mt-1 text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.pressure}
              </p>
            )}
          </div>

          {/* Flow Rate */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              Flow Rate (m³/h)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.flowRate}
              onChange={(e) => handleChange("flowRate", e.target.value)}
              placeholder="Enter flow rate (optional)"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-900 bg-white ${
                errors.flowRate
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-300 focus:ring-primary-200 focus:border-primary-400"
              }`}
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            />
            {errors.flowRate && (
              <p className="mt-1 text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.flowRate}
              </p>
            )}
          </div>

          {/* Timestamp */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <Clock className="w-4 h-4 text-primary-500" />
              Timestamp *
            </label>
            <input
              type="datetime-local"
              value={formData.timestamp}
              onChange={(e) => handleChange("timestamp", e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-900 bg-white ${
                errors.timestamp
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-300 focus:ring-primary-200 focus:border-primary-400"
              }`}
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            />
            {errors.timestamp && (
              <p className="mt-1 text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.timestamp}
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="text-gray-700 font-medium mb-2 block">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Optional notes about this reading"
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all resize-none text-gray-900 bg-white"
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            />
          </div>

          {/* Submit Result */}
          {submitResult && (
            <div className={`p-4 rounded-xl flex items-center gap-3 ${
              submitResult.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}>
              {submitResult.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
              <p className={submitResult.type === "success" ? "text-green-800" : "text-red-800"}>
                {submitResult.message}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                submitting
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/25"
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Reading"
              )}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
