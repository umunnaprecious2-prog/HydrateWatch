"use client";

import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Sparkles,
  Bug,
  Wrench,
  Shield,
  Zap,
  Calendar,
  Tag,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

export default function ReleaseNotesPage() {
  const releases = [
    {
      version: "2.4.1",
      date: "January 15, 2026",
      type: "patch",
      current: true,
      highlights: [
        "Improved simulation control panel with step-by-step workflow",
        "Enhanced file upload validation and error messages",
        "Better mobile responsiveness across all pages"
      ],
      changes: {
        features: [
          "Added support for Excel (.xlsx, .xls) and TXT file uploads",
          "New simulation control panel with clear step indicators",
          "Enhanced operations toolbar with better alignment",
          "Comprehensive documentation and help center"
        ],
        improvements: [
          "Improved file validation feedback with clearer messages",
          "Better date navigation in the header",
          "Enhanced KPI card trend indicators",
          "Optimized sensor chart rendering performance"
        ],
        fixes: [
          "Fixed notification badge not updating correctly",
          "Resolved mode selector state persistence issue",
          "Fixed report generation date range picker",
          "Corrected sensor status color indicators"
        ]
      }
    },
    {
      version: "2.4.0",
      date: "December 20, 2025",
      type: "minor",
      current: false,
      highlights: [
        "New sensor tracking page with real-time status",
        "Enhanced reporting capabilities with multiple export formats",
        "Improved risk calculation algorithms"
      ],
      changes: {
        features: [
          "Comprehensive sensor tracking dashboard",
          "Multi-format report export (PDF, CSV, Excel)",
          "Real-time sensor status indicators",
          "New contacts directory for operational support"
        ],
        improvements: [
          "Faster risk calculation engine (40% improvement)",
          "Enhanced chart visualization with zoom capabilities",
          "Better offline mode handling",
          "Improved alert categorization"
        ],
        fixes: [
          "Fixed timezone handling in historical data",
          "Resolved memory leak in chart components",
          "Fixed pagination in sensor list",
          "Corrected unit conversion errors"
        ],
        security: [
          "Updated authentication token handling",
          "Enhanced API rate limiting",
          "Improved session management"
        ]
      }
    },
    {
      version: "2.3.2",
      date: "November 15, 2025",
      type: "patch",
      current: false,
      highlights: [
        "Critical security updates",
        "Performance optimizations for large datasets"
      ],
      changes: {
        improvements: [
          "Optimized database queries for large datasets",
          "Reduced initial page load time by 25%",
          "Better caching for frequently accessed data"
        ],
        fixes: [
          "Fixed data export timeout issues",
          "Resolved chart rendering on Safari",
          "Fixed filter persistence between sessions"
        ],
        security: [
          "Patched XSS vulnerability in search input",
          "Updated dependencies with security fixes",
          "Enhanced input validation"
        ]
      }
    },
    {
      version: "2.3.0",
      date: "October 1, 2025",
      type: "minor",
      current: false,
      highlights: [
        "Simulation mode for historical data analysis",
        "New demo mode for training and testing",
        "Enhanced mobile experience"
      ],
      changes: {
        features: [
          "Simulation mode with file upload capability",
          "Demo mode with sample data generation",
          "Mobile-optimized bottom navigation",
          "New system health widget in sidebar"
        ],
        improvements: [
          "Redesigned dashboard layout",
          "Better touch interactions on mobile",
          "Improved accessibility (WCAG 2.1 compliance)",
          "Enhanced loading states and skeleton screens"
        ],
        fixes: [
          "Fixed graph tooltip positioning",
          "Resolved print layout issues",
          "Fixed keyboard navigation in modals"
        ]
      }
    },
    {
      version: "2.2.0",
      date: "August 15, 2025",
      type: "minor",
      current: false,
      highlights: [
        "Offshore and Onshore operating modes",
        "Mode-specific risk thresholds and calculations"
      ],
      changes: {
        features: [
          "Offshore operating mode with subsea parameters",
          "Onshore operating mode with surface facility parameters",
          "Mode-aware risk calculation engine",
          "Dynamic threshold adjustments based on mode"
        ],
        improvements: [
          "Better visual differentiation between modes",
          "Improved mode switching UX",
          "Enhanced documentation for mode differences"
        ],
        fixes: [
          "Fixed incorrect pressure unit display",
          "Resolved data sync issues between modes"
        ]
      }
    },
    {
      version: "2.1.0",
      date: "June 1, 2025",
      type: "minor",
      current: false,
      highlights: [
        "Advanced reporting and analytics",
        "API version 1.3.0 release"
      ],
      changes: {
        features: [
          "Four new report types (Risk, Performance, Operations, Trend)",
          "Scheduled report generation",
          "Custom date range selection",
          "API v1.3.0 with new endpoints"
        ],
        improvements: [
          "Faster report generation",
          "Better PDF formatting",
          "Enhanced data visualization in reports"
        ]
      }
    },
    {
      version: "2.0.0",
      date: "March 1, 2025",
      type: "major",
      current: false,
      highlights: [
        "Complete UI redesign",
        "New dashboard architecture",
        "Improved performance and reliability"
      ],
      changes: {
        features: [
          "Completely redesigned user interface",
          "New dashboard with KPI cards and risk gauge",
          "Real-time data updates",
          "Interactive sensor charts",
          "Modern notification system"
        ],
        improvements: [
          "50% faster page load times",
          "Reduced memory usage",
          "Better browser compatibility",
          "Improved error handling"
        ],
        breaking: [
          "API v1.x endpoints deprecated (migration guide available)",
          "New authentication flow required",
          "Updated data export format"
        ]
      }
    }
  ];

  const getVersionBadgeColor = (type) => {
    switch (type) {
      case "major": return "bg-purple-100 text-purple-700";
      case "minor": return "bg-blue-100 text-blue-700";
      case "patch": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case "features": return <Sparkles className="w-4 h-4 text-purple-500" />;
      case "improvements": return <Zap className="w-4 h-4 text-blue-500" />;
      case "fixes": return <Bug className="w-4 h-4 text-amber-500" />;
      case "security": return <Shield className="w-4 h-4 text-red-500" />;
      case "breaking": return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Wrench className="w-4 h-4 text-gray-500" />;
    }
  };

  const getChangeLabel = (type) => {
    switch (type) {
      case "features": return "New Features";
      case "improvements": return "Improvements";
      case "fixes": return "Bug Fixes";
      case "security": return "Security";
      case "breaking": return "Breaking Changes";
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center">
              <FileText className="w-7 h-7 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Release Notes</h1>
              <p className="text-gray-500">HydrateWatch version history and changelog</p>
            </div>
          </div>
          <p className="text-gray-600">
            Stay up to date with the latest features, improvements, and fixes in HydrateWatch.
            We release updates regularly to improve your experience and add new capabilities.
          </p>
        </div>

        {/* Current Version Highlight */}
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-primary-600" />
            <span className="font-semibold text-primary-900">Current Version</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-primary-700">v2.4.1</span>
            <span className="text-primary-600">Released January 15, 2026</span>
          </div>
        </div>

        {/* Release List */}
        <div className="space-y-6">
          {releases.map((release) => (
            <div
              key={release.version}
              className={`bg-white rounded-xl shadow-sm border ${
                release.current ? "border-primary-200" : "border-gray-100"
              } overflow-hidden`}
            >
              {/* Release Header */}
              <div className={`p-6 ${release.current ? "bg-primary-50/50" : ""}`}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-5 h-5 text-gray-400" />
                    <span className="text-xl font-bold text-gray-900">v{release.version}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVersionBadgeColor(release.type)}`}>
                    {release.type}
                  </span>
                  {release.current && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Current
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <Calendar className="w-4 h-4" />
                  {release.date}
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  {release.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Changes */}
              <div className="border-t border-gray-100 p-6">
                <div className="space-y-6">
                  {Object.entries(release.changes).map(([type, items]) => (
                    <div key={type}>
                      <div className="flex items-center gap-2 mb-3">
                        {getChangeIcon(type)}
                        <h4 className="font-semibold text-gray-800">{getChangeLabel(type)}</h4>
                        <span className="text-gray-400 text-sm">({items.length})</span>
                      </div>
                      <ul className="space-y-2 ml-6">
                        {items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0 mt-2"></span>
                            <span className={`text-sm ${type === "breaking" ? "text-red-700" : "text-gray-600"}`}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe Section */}
        <div className="mt-8 bg-gray-900 rounded-xl p-6 text-center">
          <h3 className="font-semibold text-white mb-2">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to receive notifications about new releases and important updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button className="px-6 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <Link href="/docs" className="hover:text-primary-600 transition-colors">Documentation</Link>
          <span>|</span>
          <Link href="/docs/api" className="hover:text-primary-600 transition-colors">API Reference</Link>
          <span>|</span>
          <Link href="/dashboard/support" className="hover:text-primary-600 transition-colors">Support</Link>
        </div>
      </main>
    </div>
  );
}
