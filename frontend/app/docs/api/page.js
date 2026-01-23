"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Book,
  Code,
  Key,
  Server,
  Shield,
  Clock,
  ChevronDown,
  ChevronRight,
  Copy,
  CheckCircle,
  ExternalLink,
  Zap,
  Database,
  Activity,
  FileText,
  AlertTriangle
} from "lucide-react";

export default function ApiReferencePage() {
  const [copiedCode, setCopiedCode] = useState(null);
  const [expandedEndpoint, setExpandedEndpoint] = useState("get-readings");

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const endpoints = [
    {
      id: "get-readings",
      method: "GET",
      path: "/api/v1/readings",
      title: "Get Sensor Readings",
      description: "Retrieve sensor readings with optional filtering by date range, sensor ID, and pagination.",
      params: [
        { name: "start_date", type: "string", required: false, description: "Start date (ISO 8601 format)" },
        { name: "end_date", type: "string", required: false, description: "End date (ISO 8601 format)" },
        { name: "sensor_id", type: "string", required: false, description: "Filter by sensor ID" },
        { name: "limit", type: "integer", required: false, description: "Number of results (default: 100, max: 1000)" },
        { name: "offset", type: "integer", required: false, description: "Pagination offset" },
      ],
      response: `{
  "data": [
    {
      "id": "reading-001",
      "timestamp": "2026-01-15T10:30:00Z",
      "sensor_id": "SENS-001",
      "temperature": 4.2,
      "pressure": 185.5,
      "flow_rate": 1250.3,
      "risk_level": 0.35
    }
  ],
  "pagination": {
    "total": 1523,
    "limit": 100,
    "offset": 0
  }
}`
    },
    {
      id: "post-reading",
      method: "POST",
      path: "/api/v1/readings",
      title: "Create Reading",
      description: "Submit a new sensor reading manually.",
      params: [
        { name: "sensor_id", type: "string", required: true, description: "Sensor identifier" },
        { name: "temperature", type: "number", required: true, description: "Temperature in Celsius" },
        { name: "pressure", type: "number", required: true, description: "Pressure in bar" },
        { name: "flow_rate", type: "number", required: true, description: "Flow rate in m³/h" },
        { name: "timestamp", type: "string", required: false, description: "Reading timestamp (defaults to now)" },
      ],
      response: `{
  "id": "reading-002",
  "timestamp": "2026-01-15T10:35:00Z",
  "sensor_id": "SENS-001",
  "temperature": 4.3,
  "pressure": 186.2,
  "flow_rate": 1248.7,
  "risk_level": 0.38,
  "created_at": "2026-01-15T10:35:00Z"
}`
    },
    {
      id: "get-sensors",
      method: "GET",
      path: "/api/v1/sensors",
      title: "List Sensors",
      description: "Get a list of all configured sensors with their current status.",
      params: [
        { name: "status", type: "string", required: false, description: "Filter by status (active, warning, critical, offline)" },
        { name: "location", type: "string", required: false, description: "Filter by location" },
      ],
      response: `{
  "data": [
    {
      "id": "SENS-001",
      "name": "Pipeline Section A - Inlet",
      "location": "Pipeline Section A",
      "status": "active",
      "last_reading": "2026-01-15T10:30:00Z",
      "current_values": {
        "temperature": 4.2,
        "pressure": 185.5,
        "flow_rate": 1250.3
      }
    }
  ],
  "total": 12
}`
    },
    {
      id: "get-risk",
      method: "GET",
      path: "/api/v1/risk/current",
      title: "Get Current Risk Level",
      description: "Get the current overall hydrate risk assessment.",
      params: [
        { name: "mode", type: "string", required: false, description: "Operating mode (offshore, onshore)" },
      ],
      response: `{
  "risk_level": 0.42,
  "risk_category": "moderate",
  "confidence": 0.89,
  "mode": "offshore",
  "factors": {
    "temperature_factor": 0.35,
    "pressure_factor": 0.48,
    "flow_factor": 0.22
  },
  "recommendation": "Monitor closely. Consider preventive measures if conditions persist.",
  "timestamp": "2026-01-15T10:30:00Z"
}`
    },
    {
      id: "post-upload",
      method: "POST",
      path: "/api/v1/upload",
      title: "Upload Data File",
      description: "Upload a CSV or JSON file containing sensor readings for batch processing or simulation.",
      params: [
        { name: "file", type: "file", required: true, description: "Data file (CSV, JSON, XLSX, TXT)" },
        { name: "mode", type: "string", required: false, description: "Processing mode (simulation, import)" },
      ],
      response: `{
  "upload_id": "upload-abc123",
  "filename": "sensor_data_jan.csv",
  "file_size": 245678,
  "records_processed": 1523,
  "status": "completed",
  "summary": {
    "date_range": {
      "start": "2026-01-01T00:00:00Z",
      "end": "2026-01-15T23:59:59Z"
    },
    "sensors_detected": 4,
    "avg_risk_level": 0.38
  }
}`
    },
    {
      id: "get-reports",
      method: "GET",
      path: "/api/v1/reports",
      title: "List Reports",
      description: "Get a list of generated reports.",
      params: [
        { name: "type", type: "string", required: false, description: "Report type (risk, performance, operations, trend)" },
        { name: "start_date", type: "string", required: false, description: "Filter by creation date" },
      ],
      response: `{
  "data": [
    {
      "id": "report-001",
      "type": "risk",
      "title": "Hydrate Risk Summary - January 2026",
      "created_at": "2026-01-15T12:00:00Z",
      "format": "pdf",
      "download_url": "/api/v1/reports/report-001/download"
    }
  ],
  "total": 15
}`
    },
    {
      id: "post-report",
      method: "POST",
      path: "/api/v1/reports/generate",
      title: "Generate Report",
      description: "Generate a new report based on specified parameters.",
      params: [
        { name: "type", type: "string", required: true, description: "Report type" },
        { name: "start_date", type: "string", required: true, description: "Report period start" },
        { name: "end_date", type: "string", required: true, description: "Report period end" },
        { name: "format", type: "string", required: false, description: "Output format (pdf, csv, xlsx)" },
      ],
      response: `{
  "id": "report-002",
  "type": "risk",
  "status": "processing",
  "estimated_completion": "2026-01-15T12:05:00Z",
  "webhook_url": "/api/v1/reports/report-002/status"
}`
    },
  ];

  const getMethodColor = (method) => {
    switch (method) {
      case "GET": return "bg-green-100 text-green-700";
      case "POST": return "bg-blue-100 text-blue-700";
      case "PUT": return "bg-amber-100 text-amber-700";
      case "DELETE": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Documentation
            </Link>
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-primary-500" />
              <span className="font-semibold text-gray-900">API Reference</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center">
              <Server className="w-7 h-7 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HydrateWatch API Reference</h1>
              <p className="text-gray-500">Version 1.3.0 | RESTful API</p>
            </div>
          </div>
          <p className="text-gray-600">
            The HydrateWatch API allows you to programmatically access sensor data, risk assessments,
            and reporting functionality. Use this API to integrate HydrateWatch with your existing systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
                <nav className="space-y-1">
                  <a href="#authentication" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                    Authentication
                  </a>
                  <a href="#rate-limits" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                    Rate Limits
                  </a>
                  <a href="#errors" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                    Error Handling
                  </a>
                  <a href="#endpoints" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                    Endpoints
                  </a>
                </nav>
              </div>

              {/* Base URL */}
              <div className="bg-gray-900 rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-2">Base URL</p>
                <code className="text-green-400 text-sm">https://api.hydratewatch.com/v1</code>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Authentication */}
            <section id="authentication" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Key className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Authentication</h2>
              </div>

              <p className="text-gray-600 mb-4">
                All API requests require authentication using an API key. Include your API key in the
                request header:
              </p>

              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-xs">Header</span>
                  <button
                    onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY', 'auth')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === 'auth' ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <code className="text-green-400 text-sm">Authorization: Bearer YOUR_API_KEY</code>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-800 font-medium">Keep your API key secure</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Never expose your API key in client-side code or public repositories.
                      API keys can be generated and managed in your account settings.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Rate Limits */}
            <section id="rate-limits" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Rate Limits</h2>
              </div>

              <p className="text-gray-600 mb-4">
                API requests are rate limited to ensure fair usage and system stability.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Plan</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Requests/Minute</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Requests/Day</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-600">Standard</td>
                      <td className="py-3 px-4 text-gray-600">60</td>
                      <td className="py-3 px-4 text-gray-600">10,000</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-600">Professional</td>
                      <td className="py-3 px-4 text-gray-600">120</td>
                      <td className="py-3 px-4 text-gray-600">50,000</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-600">Enterprise</td>
                      <td className="py-3 px-4 text-gray-600">300</td>
                      <td className="py-3 px-4 text-gray-600">Unlimited</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-500 text-sm mt-4">
                Rate limit headers are included in all API responses:
                <code className="bg-gray-100 px-2 py-1 rounded ml-2">X-RateLimit-Remaining</code>
              </p>
            </section>

            {/* Error Handling */}
            <section id="errors" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Error Handling</h2>
              </div>

              <p className="text-gray-600 mb-4">
                The API uses standard HTTP status codes and returns error details in JSON format.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-mono">200</span>
                  <span className="text-gray-600 text-sm">Success - Request completed successfully</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-mono">400</span>
                  <span className="text-gray-600 text-sm">Bad Request - Invalid parameters</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-mono">401</span>
                  <span className="text-gray-600 text-sm">Unauthorized - Invalid or missing API key</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-mono">429</span>
                  <span className="text-gray-600 text-sm">Too Many Requests - Rate limit exceeded</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-mono">500</span>
                  <span className="text-gray-600 text-sm">Server Error - Internal server error</span>
                </div>
              </div>

              <div className="mt-4 bg-gray-900 rounded-lg p-4">
                <p className="text-gray-400 text-xs mb-2">Error Response Example</p>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid date format for start_date",
    "details": {
      "parameter": "start_date",
      "expected": "ISO 8601 format",
      "received": "15-01-2026"
    }
  }
}`}
                </pre>
              </div>
            </section>

            {/* Endpoints */}
            <section id="endpoints" className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">API Endpoints</h2>

              {endpoints.map((endpoint) => (
                <div key={endpoint.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setExpandedEndpoint(expandedEndpoint === endpoint.id ? null : endpoint.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-mono font-medium ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                      <code className="text-gray-700 text-sm">{endpoint.path}</code>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-sm hidden sm:block">{endpoint.title}</span>
                      {expandedEndpoint === endpoint.id ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {expandedEndpoint === endpoint.id && (
                    <div className="border-t border-gray-100 p-4 space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">{endpoint.title}</h4>
                        <p className="text-gray-600 text-sm">{endpoint.description}</p>
                      </div>

                      {endpoint.params.length > 0 && (
                        <div>
                          <h5 className="font-medium text-gray-800 mb-2 text-sm">Parameters</h5>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-200">
                                  <th className="text-left py-2 px-3 font-medium text-gray-700">Name</th>
                                  <th className="text-left py-2 px-3 font-medium text-gray-700">Type</th>
                                  <th className="text-left py-2 px-3 font-medium text-gray-700">Required</th>
                                  <th className="text-left py-2 px-3 font-medium text-gray-700">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {endpoint.params.map((param) => (
                                  <tr key={param.name} className="border-b border-gray-50">
                                    <td className="py-2 px-3 font-mono text-primary-600 text-xs">{param.name}</td>
                                    <td className="py-2 px-3 text-gray-500 text-xs">{param.type}</td>
                                    <td className="py-2 px-3">
                                      {param.required ? (
                                        <span className="text-red-600 text-xs">Required</span>
                                      ) : (
                                        <span className="text-gray-400 text-xs">Optional</span>
                                      )}
                                    </td>
                                    <td className="py-2 px-3 text-gray-600 text-xs">{param.description}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-800 text-sm">Response Example</h5>
                          <button
                            onClick={() => copyToClipboard(endpoint.response, endpoint.id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {copiedCode === endpoint.id ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-xs">{endpoint.response}</pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </section>

            {/* SDK & Libraries */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">SDKs & Libraries</h2>
              </div>

              <p className="text-gray-600 mb-4">
                Official client libraries are available for popular programming languages:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">Python</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
                  </div>
                  <code className="text-xs text-gray-500 mt-1 block">pip install hydratewatch</code>
                </a>
                <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">JavaScript</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
                  </div>
                  <code className="text-xs text-gray-500 mt-1 block">npm install @hydratewatch/sdk</code>
                </a>
                <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">C# / .NET</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
                  </div>
                  <code className="text-xs text-gray-500 mt-1 block">Install-Package HydrateWatch</code>
                </a>
              </div>
            </section>

            {/* Need Help */}
            <section className="bg-primary-50 border border-primary-200 rounded-xl p-6">
              <h3 className="font-semibold text-primary-900 mb-2">Need Help?</h3>
              <p className="text-primary-800 text-sm mb-4">
                If you have questions about the API or need assistance with integration,
                our developer support team is here to help.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard/support" className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
                  Contact Support
                </Link>
                <Link href="/docs" className="px-4 py-2 bg-white text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors">
                  View Documentation
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
