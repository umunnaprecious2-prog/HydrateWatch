"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Book,
  Home,
  Activity,
  FileText,
  Upload,
  Settings,
  Users,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Play,
  Monitor,
  BarChart3,
  AlertTriangle,
  Droplets,
  Ship,
  Factory,
  FileSpreadsheet,
  CheckCircle,
  Info,
  Gauge,
  Bell,
  Search,
  Download,
  Calendar
} from "lucide-react";

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [expandedItems, setExpandedItems] = useState(["getting-started"]);

  const toggleExpand = (id) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const navigation = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Play,
      items: [
        { id: "overview", title: "Platform Overview" },
        { id: "first-login", title: "Your First Login" },
        { id: "dashboard-tour", title: "Dashboard Tour" },
        { id: "modes", title: "Understanding Operating Modes" },
      ]
    },
    {
      id: "navigation",
      title: "Navigating the App",
      icon: Monitor,
      items: [
        { id: "sidebar", title: "Sidebar Navigation" },
        { id: "header", title: "Top Action Bar" },
        { id: "mobile", title: "Mobile Navigation" },
      ]
    },
    {
      id: "features",
      title: "Core Features",
      icon: Activity,
      items: [
        { id: "kpi-cards", title: "KPI Cards" },
        { id: "risk-gauge", title: "Risk Gauge" },
        { id: "sensor-tracking", title: "Sensor Tracking" },
        { id: "alerts", title: "Alerts & Notifications" },
      ]
    },
    {
      id: "simulation",
      title: "Simulation & Data Upload",
      icon: Upload,
      items: [
        { id: "upload-overview", title: "Upload Overview" },
        { id: "file-formats", title: "Supported File Formats" },
        { id: "data-structure", title: "Data Structure Requirements" },
        { id: "running-simulation", title: "Running a Simulation" },
      ]
    },
    {
      id: "reporting",
      title: "Reports & Export",
      icon: FileText,
      items: [
        { id: "report-types", title: "Available Report Types" },
        { id: "generating-reports", title: "Generating Reports" },
        { id: "export-formats", title: "Export Formats" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <Book className="w-5 h-5 text-primary-500" />
              <span className="font-semibold text-gray-900">Documentation</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24">
              <nav className="space-y-1">
                {navigation.map((section) => {
                  const Icon = section.icon;
                  const isExpanded = expandedItems.includes(section.id);

                  return (
                    <div key={section.id}>
                      <button
                        onClick={() => {
                          toggleExpand(section.id);
                          setActiveSection(section.id);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === section.id
                            ? "bg-primary-50 text-primary-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span className="font-medium">{section.title}</span>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="ml-6 mt-1 space-y-1">
                          {section.items.map((item) => (
                            <a
                              key={item.id}
                              href={`#${item.id}`}
                              className="block px-3 py-1.5 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                            >
                              {item.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              {/* Title */}
              <div className="mb-8 pb-8 border-b border-gray-100">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">HydrateWatch User Guide</h1>
                <p className="text-gray-600">
                  Complete documentation for navigating and using the HydrateWatch hydrate monitoring platform.
                </p>
              </div>

              {/* Getting Started Section */}
              <section id="getting-started" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Play className="w-6 h-6 text-primary-500" />
                  Getting Started
                </h2>

                <div id="overview" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Platform Overview</h3>
                  <p className="text-gray-600 mb-4">
                    HydrateWatch is an enterprise-grade platform designed for real-time hydrate formation monitoring
                    and prediction in oil and gas operations. The platform helps you:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Monitor sensor data in real-time (temperature, pressure, flow rate)</li>
                    <li>Assess and predict hydrate formation risk levels</li>
                    <li>Run simulations using your operational data</li>
                    <li>Generate comprehensive reports for operational decisions</li>
                    <li>Receive alerts when conditions approach critical thresholds</li>
                  </ul>
                </div>

                <div id="first-login" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Your First Login</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <ol className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-medium">1</span>
                        <div>
                          <span className="font-medium text-gray-800">Navigate to the login page</span>
                          <p className="text-gray-600 text-sm mt-1">Go to the HydrateWatch login page and enter your credentials provided by your administrator.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-medium">2</span>
                        <div>
                          <span className="font-medium text-gray-800">Select your operating mode</span>
                          <p className="text-gray-600 text-sm mt-1">Choose between Offshore or Onshore mode based on your operational environment.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-medium">3</span>
                        <div>
                          <span className="font-medium text-gray-800">Explore the dashboard</span>
                          <p className="text-gray-600 text-sm mt-1">You'll land on the main dashboard showing KPI cards, risk gauge, and sensor data.</p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>

                <div id="dashboard-tour" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Dashboard Tour</h3>
                  <p className="text-gray-600 mb-4">The main dashboard is divided into several key areas:</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-gray-800">KPI Cards (Top)</span>
                      </div>
                      <p className="text-gray-600 text-sm">Display current temperature, pressure, hydrate risk percentage, and flow rate with trend indicators.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Gauge className="w-5 h-5 text-purple-500" />
                        <span className="font-medium text-gray-800">Risk Gauge</span>
                      </div>
                      <p className="text-gray-600 text-sm">Visual circular gauge showing overall hydrate risk level with confidence percentage.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-gray-800">Sensor Charts</span>
                      </div>
                      <p className="text-gray-600 text-sm">Historical trend charts showing sensor readings over time.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="w-5 h-5 text-amber-500" />
                        <span className="font-medium text-gray-800">Alerts Panel</span>
                      </div>
                      <p className="text-gray-600 text-sm">Recent alerts and notifications requiring attention.</p>
                    </div>
                  </div>
                </div>

                <div id="modes" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Understanding Operating Modes</h3>
                  <p className="text-gray-600 mb-4">
                    HydrateWatch supports two primary operating modes, each optimized for different operational environments:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Ship className="w-5 h-5 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-blue-900">Offshore Mode</h4>
                      </div>
                      <p className="text-blue-800 text-sm mb-3">Optimized for subsea pipeline conditions</p>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• High pressure range: 150-300 bar</li>
                        <li>• Low temperature range: 2-8°C</li>
                        <li>• Deep water operations</li>
                        <li>• Subsea production systems</li>
                      </ul>
                    </div>
                    <div className="p-5 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <Factory className="w-5 h-5 text-green-600" />
                        </div>
                        <h4 className="font-semibold text-green-900">Onshore Mode</h4>
                      </div>
                      <p className="text-green-800 text-sm mb-3">Configured for surface facility conditions</p>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Lower pressure range: 20-80 bar</li>
                        <li>• Ambient temperature: 15-35°C</li>
                        <li>• Surface processing facilities</li>
                        <li>• Onshore pipeline networks</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-800">
                        <strong>Tip:</strong> You can switch modes using the Mode Selector on the dashboard. The risk
                        calculations and threshold alerts will automatically adjust based on your selected mode.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Navigation Section */}
              <section id="navigation" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Monitor className="w-6 h-6 text-primary-500" />
                  Navigating the App
                </h2>

                <div id="sidebar" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Sidebar Navigation</h3>
                  <p className="text-gray-600 mb-4">
                    The left sidebar (visible on desktop) provides access to all main areas of the application:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Home className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="font-medium text-gray-800">Home (Dashboard)</span>
                        <p className="text-gray-500 text-sm">Main monitoring dashboard with KPIs and risk overview</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Activity className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="font-medium text-gray-800">Sensor Tracking</span>
                        <p className="text-gray-500 text-sm">Detailed view of all sensors with status and readings</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="font-medium text-gray-800">Reporting</span>
                        <p className="text-gray-500 text-sm">Generate and export operational reports</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Users className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="font-medium text-gray-800">Contacts</span>
                        <p className="text-gray-500 text-sm">Operational contacts and support team directory</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Settings className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="font-medium text-gray-800">Settings</span>
                        <p className="text-gray-500 text-sm">Account settings and preferences</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <HelpCircle className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="font-medium text-gray-800">Support</span>
                        <p className="text-gray-500 text-sm">Help center, FAQs, and contact support</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="header" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Action Bar</h3>
                  <p className="text-gray-600 mb-4">
                    The header bar provides quick access to common actions and system functions:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <span className="font-medium text-gray-800">Date Navigation</span>
                      <p className="text-gray-600 text-sm mt-1">Navigate between months to view historical data and trends.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <span className="font-medium text-gray-800">Add Reading</span>
                      <p className="text-gray-600 text-sm mt-1">Manually input sensor readings when automatic collection isn't available.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <span className="font-medium text-gray-800">Generate Report</span>
                      <p className="text-gray-600 text-sm mt-1">Quick access to create operational reports.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <span className="font-medium text-gray-800">Search / Help / Notifications / Profile</span>
                      <p className="text-gray-600 text-sm mt-1">Search content, access help, view alerts, and manage your account.</p>
                    </div>
                  </div>
                </div>

                <div id="mobile" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Mobile Navigation</h3>
                  <p className="text-gray-600 mb-4">
                    On mobile devices, the sidebar is replaced with a bottom navigation bar for easy thumb access.
                    The bottom nav includes quick links to Home, Tracking, Reports, and Settings.
                  </p>
                </div>
              </section>

              {/* Simulation & Data Upload Section */}
              <section id="simulation" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Upload className="w-6 h-6 text-primary-500" />
                  Simulation & Data Upload
                </h2>

                <div id="upload-overview" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Overview</h3>
                  <p className="text-gray-600 mb-4">
                    The Simulation Control Panel allows you to upload sensor data files to run hydrate risk simulations.
                    This is useful for:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Analyzing historical data for risk patterns</li>
                    <li>Planning operations with predictive modeling</li>
                    <li>Testing scenarios before field deployment</li>
                    <li>Importing data from external monitoring systems</li>
                  </ul>
                </div>

                <div id="file-formats" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Supported File Formats</h3>
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-5 mb-4">
                    <h4 className="font-semibold text-primary-900 mb-3">Accepted File Types</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-3 bg-white rounded-lg text-center">
                        <FileSpreadsheet className="w-6 h-6 text-green-600 mx-auto mb-1" />
                        <span className="text-sm font-medium text-gray-800">CSV</span>
                        <p className="text-xs text-gray-500">.csv</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg text-center">
                        <FileText className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                        <span className="text-sm font-medium text-gray-800">JSON</span>
                        <p className="text-xs text-gray-500">.json</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg text-center">
                        <FileSpreadsheet className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                        <span className="text-sm font-medium text-gray-800">Excel</span>
                        <p className="text-xs text-gray-500">.xlsx, .xls</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg text-center">
                        <FileText className="w-6 h-6 text-gray-600 mx-auto mb-1" />
                        <span className="text-sm font-medium text-gray-800">Text</span>
                        <p className="text-xs text-gray-500">.txt</p>
                      </div>
                    </div>
                    <p className="text-primary-800 text-sm mt-4">
                      <strong>Maximum file size:</strong> 10 MB
                    </p>
                  </div>
                </div>

                <div id="data-structure" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Structure Requirements</h3>
                  <p className="text-gray-600 mb-4">
                    Your data file must contain the following columns/fields for accurate simulation:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">Field Name</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">Type</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">Required</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 font-mono text-primary-600">timestamp</td>
                          <td className="px-4 py-3 text-gray-600">DateTime</td>
                          <td className="px-4 py-3"><CheckCircle className="w-4 h-4 text-green-500" /></td>
                          <td className="px-4 py-3 text-gray-600">ISO 8601 format (e.g., 2026-01-15T10:30:00Z)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-mono text-primary-600">temperature</td>
                          <td className="px-4 py-3 text-gray-600">Number</td>
                          <td className="px-4 py-3"><CheckCircle className="w-4 h-4 text-green-500" /></td>
                          <td className="px-4 py-3 text-gray-600">Temperature in Celsius (°C)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-mono text-primary-600">pressure</td>
                          <td className="px-4 py-3 text-gray-600">Number</td>
                          <td className="px-4 py-3"><CheckCircle className="w-4 h-4 text-green-500" /></td>
                          <td className="px-4 py-3 text-gray-600">Pressure in bar</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-mono text-primary-600">flow_rate</td>
                          <td className="px-4 py-3 text-gray-600">Number</td>
                          <td className="px-4 py-3"><CheckCircle className="w-4 h-4 text-green-500" /></td>
                          <td className="px-4 py-3 text-gray-600">Flow rate in m³/h</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-mono text-primary-600">sensor_id</td>
                          <td className="px-4 py-3 text-gray-600">String</td>
                          <td className="px-4 py-3 text-gray-400">Optional</td>
                          <td className="px-4 py-3 text-gray-600">Identifier for the sensor (e.g., "SENS-001")</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-mono text-primary-600">location</td>
                          <td className="px-4 py-3 text-gray-600">String</td>
                          <td className="px-4 py-3 text-gray-400">Optional</td>
                          <td className="px-4 py-3 text-gray-600">Sensor location description</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Example CSV Format:</h4>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm font-mono">
{`timestamp,temperature,pressure,flow_rate,sensor_id,location
2026-01-15T08:00:00Z,4.2,185.5,1250.3,SENS-001,Pipeline Section A
2026-01-15T08:05:00Z,4.1,186.2,1248.7,SENS-001,Pipeline Section A
2026-01-15T08:10:00Z,4.3,184.8,1251.2,SENS-001,Pipeline Section A
2026-01-15T08:00:00Z,5.8,175.3,980.5,SENS-002,Pipeline Section B
2026-01-15T08:05:00Z,5.9,175.1,982.1,SENS-002,Pipeline Section B`}
                      </pre>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Example JSON Format:</h4>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm font-mono">
{`{
  "readings": [
    {
      "timestamp": "2026-01-15T08:00:00Z",
      "temperature": 4.2,
      "pressure": 185.5,
      "flow_rate": 1250.3,
      "sensor_id": "SENS-001",
      "location": "Pipeline Section A"
    },
    {
      "timestamp": "2026-01-15T08:05:00Z",
      "temperature": 4.1,
      "pressure": 186.2,
      "flow_rate": 1248.7,
      "sensor_id": "SENS-001",
      "location": "Pipeline Section A"
    }
  ]
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div id="running-simulation" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Running a Simulation</h3>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <ol className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-medium">1</span>
                        <div>
                          <span className="font-medium text-gray-800">Select Operating Mode</span>
                          <p className="text-gray-600 text-sm mt-1">Choose Offshore or Onshore mode based on your data context.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-medium">2</span>
                        <div>
                          <span className="font-medium text-gray-800">Enable Simulation Mode</span>
                          <p className="text-gray-600 text-sm mt-1">Toggle the "Simulation Mode" switch in the Mode Selector.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-medium">3</span>
                        <div>
                          <span className="font-medium text-gray-800">Upload Your Data File</span>
                          <p className="text-gray-600 text-sm mt-1">Drag and drop or click to browse for your data file in the Simulation Control Panel.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-medium">4</span>
                        <div>
                          <span className="font-medium text-gray-800">Review Validation</span>
                          <p className="text-gray-600 text-sm mt-1">The system will validate your file format and display any errors or warnings.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-medium">5</span>
                        <div>
                          <span className="font-medium text-gray-800">Run Simulation</span>
                          <p className="text-gray-600 text-sm mt-1">Click "Upload File" to process your data. Results will appear in the dashboard.</p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* Reporting Section */}
              <section id="reporting" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary-500" />
                  Reports & Export
                </h2>

                <div id="report-types" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Report Types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <span className="font-medium text-gray-800">Hydrate Risk Summary</span>
                      </div>
                      <p className="text-gray-600 text-sm">Comprehensive risk analysis with trends, peaks, and recommendations.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-gray-800">Sensor Performance</span>
                      </div>
                      <p className="text-gray-600 text-sm">Sensor health, uptime, and data quality metrics.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-gray-800">Operations Summary</span>
                      </div>
                      <p className="text-gray-600 text-sm">Daily/weekly operational overview with key metrics.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className="w-5 h-5 text-purple-500" />
                        <span className="font-medium text-gray-800">Trend Analysis</span>
                      </div>
                      <p className="text-gray-600 text-sm">Long-term trend visualization and predictive insights.</p>
                    </div>
                  </div>
                </div>

                <div id="generating-reports" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Generating Reports</h3>
                  <ol className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="font-medium text-primary-600">1.</span>
                      Navigate to the <strong>Reporting</strong> page from the sidebar
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-medium text-primary-600">2.</span>
                      Select the <strong>date range</strong> for your report
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-medium text-primary-600">3.</span>
                      Choose the <strong>report type</strong> you need
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-medium text-primary-600">4.</span>
                      Select your preferred <strong>export format</strong>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-medium text-primary-600">5.</span>
                      Click <strong>"Generate Report"</strong> to create and download
                    </li>
                  </ol>
                </div>

                <div id="export-formats" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Export Formats</h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
                      <span className="font-medium text-red-800">PDF</span>
                      <p className="text-red-600 text-xs">Formatted reports</p>
                    </div>
                    <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                      <span className="font-medium text-green-800">CSV</span>
                      <p className="text-green-600 text-xs">Raw data export</p>
                    </div>
                    <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <span className="font-medium text-emerald-800">Excel</span>
                      <p className="text-emerald-600 text-xs">Spreadsheet format</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Reference */}
              <section className="mt-12 pt-8 border-t border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Reference</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/dashboard/support" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <HelpCircle className="w-6 h-6 text-primary-500 mb-2" />
                    <span className="font-medium text-gray-800 block">Help Center</span>
                    <p className="text-gray-500 text-sm">FAQs and troubleshooting</p>
                  </Link>
                  <Link href="/dashboard/contacts" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Users className="w-6 h-6 text-primary-500 mb-2" />
                    <span className="font-medium text-gray-800 block">Contact Support</span>
                    <p className="text-gray-500 text-sm">Get help from our team</p>
                  </Link>
                  <Link href="/docs/api" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Book className="w-6 h-6 text-primary-500 mb-2" />
                    <span className="font-medium text-gray-800 block">API Reference</span>
                    <p className="text-gray-500 text-sm">Technical documentation</p>
                  </Link>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
