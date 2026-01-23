"use client";

import { useState } from "react";
import {
  Upload,
  File,
  X,
  CheckCircle,
  AlertCircle,
  Play,
  FileText,
  BarChart3,
  ChevronRight,
  Loader2
} from "lucide-react";
import { useMode } from "@/src/contexts/ModeContext";
import api from "@/src/lib/api";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [validationStatus, setValidationStatus] = useState(null);
  const { mode } = useMode();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    const validExtensions = [".csv", ".json"];
    const isValidExt = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB

    if (!isValidExt) {
      return { valid: false, error: "Invalid file type. Only CSV and JSON files are accepted." };
    }
    if (!isValidSize) {
      return { valid: false, error: "File size exceeds 10MB limit." };
    }
    return { valid: true, error: null };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validation = validateFile(file);

      if (validation.valid) {
        setSelectedFile(file);
        setValidationStatus({ valid: true, message: "File format validated successfully" });
        setMessage(null);
        setCurrentStep(2);
      } else {
        setValidationStatus({ valid: false, message: validation.error });
        setMessage({ type: "error", text: validation.error });
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validation = validateFile(file);

      if (validation.valid) {
        setSelectedFile(file);
        setValidationStatus({ valid: true, message: "File format validated successfully" });
        setMessage(null);
        setCurrentStep(2);
      } else {
        setValidationStatus({ valid: false, message: validation.error });
        setMessage({ type: "error", text: validation.error });
      }
    }
  };

  const handleRunSimulation = async () => {
    if (!selectedFile) {
      setMessage({ type: "error", text: "Please select a file first" });
      return;
    }

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage({ type: "success", text: response.data.message || "Simulation completed successfully" });
      setSimulationComplete(true);
      setCurrentStep(3);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.detail || "Failed to run simulation",
      });
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setMessage(null);
    setValidationStatus(null);
    setCurrentStep(1);
    setSimulationComplete(false);
  };

  const resetSimulation = () => {
    setSelectedFile(null);
    setMessage(null);
    setValidationStatus(null);
    setCurrentStep(1);
    setSimulationComplete(false);
  };

  const steps = [
    { number: 1, label: "Provide Input Data", icon: FileText },
    { number: 2, label: "Run Simulation", icon: Play },
    { number: 3, label: "Review Results", icon: BarChart3 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">Simulation Control Panel</h2>
        <p className="text-gray-300 mt-1">
          Configure and execute hydrate behavior simulations for{" "}
          <span className="text-primary-400 font-medium capitalize">{mode}</span> mode
        </p>
      </div>

      {/* Step Indicator */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isComplete = currentStep > step.number;

            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isComplete
                      ? "bg-green-500 text-white"
                      : isActive
                        ? "bg-primary-500 text-white ring-4 ring-primary-100"
                        : "bg-gray-200 text-gray-500"
                  }`}>
                    {isComplete ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <p className={`text-sm font-medium ${
                      isActive ? "text-gray-900" : isComplete ? "text-green-600" : "text-gray-500"
                    }`}>
                      Step {step.number}
                    </p>
                    <p className={`text-sm ${
                      isActive ? "text-gray-600" : "text-gray-400"
                    }`}>
                      {step.label}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className={`h-1 rounded-full transition-all ${
                      currentStep > step.number ? "bg-green-500" : "bg-gray-200"
                    }`}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {/* Step 1: Upload Area */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                dragActive
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-300 bg-gray-50 hover:border-primary-400 hover:bg-primary-50/50"
              }`}
            >
              <div className="space-y-3">
                <div className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center ${
                  dragActive ? "bg-primary-100" : "bg-gray-100"
                }`}>
                  <Upload className={`w-6 h-6 ${dragActive ? "text-primary-500" : "text-gray-400"}`} />
                </div>
                <div>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer"
                  >
                    <span className="text-primary-500 hover:text-primary-600 font-medium">
                      Click to upload
                    </span>
                    <span className="text-gray-600 pl-1">or drag and drop</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".csv,.json"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-gray-500">CSV or JSON files only (max 10MB)</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                <strong>Instructions:</strong> Upload sensor data to simulate hydrate behavior under the selected <span className="capitalize font-medium">{mode}</span> operating mode.
              </p>
            </div>
          </div>
        )}

        {/* Step 2: File Selected - Ready to Run */}
        {currentStep === 2 && selectedFile && (
          <div className="space-y-4">
            {/* File Info Card */}
            <div className="bg-gradient-to-r from-primary-50 to-primary-100/50 border border-primary-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center">
                    <File className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-gray-500">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearFile}
                  className="p-2 hover:bg-primary-200 rounded-lg transition-colors"
                  title="Remove file"
                >
                  <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </button>
              </div>
            </div>

            {/* Validation Status */}
            {validationStatus && (
              <div className={`flex items-center gap-3 p-3 rounded-lg ${
                validationStatus.valid
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}>
                {validationStatus.valid ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                )}
                <p className={`${validationStatus.valid ? "text-green-800" : "text-red-800"}`}>
                  {validationStatus.message}
                </p>
              </div>
            )}

            {/* Simulation Config Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-3">Simulation Configuration</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Operating Mode</p>
                  <p className="font-medium text-gray-900 capitalize">{mode}</p>
                </div>
                <div>
                  <p className="text-gray-500">Input File</p>
                  <p className="font-medium text-gray-900 truncate">{selectedFile.name}</p>
                </div>
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunSimulation}
              disabled={uploading}
              className={`w-full py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-3 ${
                uploading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/25"
              }`}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Running Simulation...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Run Simulation
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 3: Results */}
        {currentStep === 3 && simulationComplete && (
          <div className="space-y-4">
            {/* Success Message */}
            {message && message.type === "success" && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">Simulation Complete</h4>
                  <p className="text-green-700">{message.text}</p>
                </div>
              </div>
            )}

            {/* Results Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-3">Results Summary</h4>
              <p className="text-gray-600">
                Simulation data has been processed. View the updated dashboard metrics and charts to analyze hydrate behavior predictions.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={resetSimulation}
                className="flex-1 py-3 px-4 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Run New Simulation
              </button>
              <button
                className="flex-1 py-3 px-4 rounded-xl font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-5 h-5" />
                View Full Report
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {message && message.type === "error" && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-800">{message.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}
