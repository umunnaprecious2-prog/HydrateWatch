"use client";

import { useState } from "react";
import {
  X,
  HelpCircle,
  Book,
  MessageCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  Zap,
  Shield,
  BarChart2,
  Settings,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  Info,
  Clock,
  Target,
  TrendingUp,
  Bell,
  Gauge,
  Thermometer,
  Droplets
} from "lucide-react";

// Detailed guide content with steps, tips, and illustrations
const guideContent = {
  1: {
    title: "Understanding Dashboard Metrics",
    icon: BarChart2,
    category: "basics",
    estimatedTime: "5 min read",
    description: "Learn how to read and interpret the key performance indicators on your dashboard.",
    sections: [
      {
        title: "Overview",
        content: "The HydrateWatch dashboard provides real-time monitoring of critical parameters that affect hydrate formation in your pipeline systems. Understanding these metrics is essential for maintaining safe and efficient operations."
      },
      {
        title: "Key Metrics Explained",
        type: "list",
        items: [
          {
            icon: Gauge,
            title: "Risk Level Indicator",
            description: "The primary metric showing current hydrate formation risk. Ranges from 0-100%, with color coding: Green (0-30% Safe), Yellow (31-60% Caution), Red (61-100% Critical)."
          },
          {
            icon: Thermometer,
            title: "Temperature Reading",
            description: "Current pipeline temperature in Celsius or Fahrenheit. Lower temperatures increase hydrate formation risk. The safe zone is typically above 20°C (68°F)."
          },
          {
            icon: TrendingUp,
            title: "Pressure Gauge",
            description: "Pipeline pressure in PSI or Bar. Higher pressures combined with low temperatures significantly increase hydrate risk. Normal operating range is 500-2000 PSI."
          },
          {
            icon: Droplets,
            title: "Water Content",
            description: "Percentage of water in the gas stream. Higher water content means more potential for hydrate formation. Target is below 7 lbs/MMSCF."
          }
        ]
      },
      {
        title: "Reading the Risk Chart",
        content: "The main chart displays historical risk levels over time. You can hover over any point to see exact values. The chart supports zooming and panning for detailed analysis.",
        tip: "Use the time range selector to view data from the last hour, day, week, or custom range."
      },
      {
        title: "Alert Thresholds",
        type: "table",
        headers: ["Level", "Risk Range", "Action Required"],
        rows: [
          ["Safe", "0-30%", "Normal operations, continue monitoring"],
          ["Caution", "31-60%", "Increase monitoring frequency, prepare mitigation"],
          ["Warning", "61-80%", "Activate prevention measures, notify team"],
          ["Critical", "81-100%", "Immediate action required, emergency protocols"]
        ]
      },
      {
        title: "Best Practices",
        type: "checklist",
        items: [
          "Check the dashboard at least every 30 minutes during operations",
          "Set up automated alerts for risk levels above 50%",
          "Review historical trends weekly to identify patterns",
          "Compare readings across multiple sensors for accuracy",
          "Document any anomalies in the system log"
        ]
      }
    ]
  },
  2: {
    title: "Running Simulations",
    icon: Zap,
    category: "simulation",
    estimatedTime: "8 min read",
    description: "Step-by-step guide to uploading data and running hydrate behavior simulations.",
    sections: [
      {
        title: "Overview",
        content: "The simulation feature allows you to predict hydrate formation behavior under various conditions. This is valuable for planning operations, testing scenarios, and training personnel."
      },
      {
        title: "Preparing Your Data",
        type: "steps",
        items: [
          {
            step: 1,
            title: "Gather Required Data",
            description: "Collect temperature, pressure, and composition data. Ensure timestamps are in ISO 8601 format (YYYY-MM-DDTHH:mm:ss)."
          },
          {
            step: 2,
            title: "Format Your File",
            description: "Save data as CSV or JSON. Required columns: timestamp, temperature, pressure. Optional: flow_rate, water_content, gas_composition."
          },
          {
            step: 3,
            title: "Validate Data Quality",
            description: "Check for missing values, outliers, and ensure units are consistent throughout the dataset."
          }
        ]
      },
      {
        title: "File Format Examples",
        type: "code",
        language: "csv",
        code: `timestamp,temperature,pressure,flow_rate
2024-01-15T08:00:00,25.5,1500,850
2024-01-15T08:05:00,24.8,1520,860
2024-01-15T08:10:00,23.2,1480,840`
      },
      {
        title: "Running a Simulation",
        type: "steps",
        items: [
          {
            step: 1,
            title: "Open Simulation Panel",
            description: "Click the 'Simulation' button in the main navigation or press Ctrl+S."
          },
          {
            step: 2,
            title: "Upload Your Data",
            description: "Drag and drop your file or click 'Browse' to select. The system will validate the format automatically."
          },
          {
            step: 3,
            title: "Configure Parameters",
            description: "Select the simulation mode (Offshore/Onshore), set the time range, and adjust any advanced parameters if needed."
          },
          {
            step: 4,
            title: "Start Simulation",
            description: "Click 'Run Simulation' and wait for processing. Progress will be shown in real-time."
          },
          {
            step: 5,
            title: "Analyze Results",
            description: "Review the predicted risk levels, view the timeline visualization, and export results if needed."
          }
        ]
      },
      {
        title: "Simulation Parameters",
        type: "table",
        headers: ["Parameter", "Default", "Description"],
        rows: [
          ["Mode", "Offshore", "Pipeline environment type"],
          ["Inhibitor", "MEG", "Hydrate inhibitor type"],
          ["Time Step", "5 min", "Simulation interval"],
          ["Prediction Window", "24 hours", "Future prediction range"]
        ]
      },
      {
        title: "Tips for Accurate Simulations",
        type: "checklist",
        items: [
          "Use at least 24 hours of historical data for best results",
          "Ensure sensor calibration is up to date",
          "Run multiple scenarios with different parameters",
          "Compare simulation results with actual outcomes to refine models",
          "Save successful simulation configurations as templates"
        ]
      }
    ]
  },
  3: {
    title: "Risk Assessment Guide",
    icon: Shield,
    category: "safety",
    estimatedTime: "6 min read",
    description: "Understanding hydrate risk levels and recommended actions for each threshold.",
    sections: [
      {
        title: "Overview",
        content: "Hydrate risk assessment is critical for safe pipeline operations. This guide explains how risks are calculated and what actions to take at each level."
      },
      {
        title: "How Risk is Calculated",
        content: "The risk level is determined by a combination of factors including temperature, pressure, water content, flow rate, and historical patterns. Our algorithm uses the following formula:",
        type: "formula",
        formula: "Risk = f(T, P, W, F) × Historical Factor × Seasonal Adjustment"
      },
      {
        title: "Risk Factors",
        type: "list",
        items: [
          {
            icon: Thermometer,
            title: "Temperature (40% weight)",
            description: "Below hydrate equilibrium temperature significantly increases risk. Each degree below equilibrium adds approximately 5-8% to the risk score."
          },
          {
            icon: TrendingUp,
            title: "Pressure (30% weight)",
            description: "Higher pressures promote hydrate formation. Risk increases logarithmically above 1000 PSI."
          },
          {
            icon: Droplets,
            title: "Water Content (20% weight)",
            description: "Free water availability is essential for hydrate formation. Above 7 lbs/MMSCF dramatically increases risk."
          },
          {
            icon: Gauge,
            title: "Flow Rate (10% weight)",
            description: "Lower flow rates allow more time for hydrate nucleation. Stagnant conditions are highest risk."
          }
        ]
      },
      {
        title: "Risk Level Actions",
        type: "alerts",
        items: [
          {
            level: "safe",
            title: "Safe (0-30%)",
            description: "Normal operating conditions. Continue standard monitoring procedures.",
            actions: ["Monitor dashboard regularly", "Maintain normal operations", "Log readings for trends"]
          },
          {
            level: "caution",
            title: "Caution (31-60%)",
            description: "Elevated risk detected. Increased vigilance required.",
            actions: ["Increase monitoring frequency to every 15 minutes", "Verify inhibitor injection rates", "Alert on-call personnel", "Prepare mitigation equipment"]
          },
          {
            level: "warning",
            title: "Warning (61-80%)",
            description: "High risk of hydrate formation. Active intervention needed.",
            actions: ["Activate continuous monitoring", "Increase inhibitor injection", "Consider flow rate adjustments", "Notify management", "Prepare for potential shutdown"]
          },
          {
            level: "critical",
            title: "Critical (81-100%)",
            description: "Imminent hydrate formation. Emergency response required.",
            actions: ["Initiate emergency protocols", "Maximum inhibitor injection", "Consider controlled shutdown", "Deploy field teams", "Document all actions for review"]
          }
        ]
      },
      {
        title: "Prevention Strategies",
        type: "checklist",
        items: [
          "Maintain pipeline temperature above hydrate equilibrium",
          "Ensure adequate inhibitor injection at all times",
          "Monitor for water accumulation points",
          "Regular pigging to remove water and deposits",
          "Install heating at high-risk locations",
          "Maintain minimum flow rates during operations"
        ]
      }
    ]
  },
  4: {
    title: "Configuring Alerts",
    icon: Settings,
    category: "settings",
    estimatedTime: "4 min read",
    description: "Set up custom alert thresholds and notification preferences.",
    sections: [
      {
        title: "Overview",
        content: "Alerts keep you informed of critical changes in system status. Properly configured alerts can prevent incidents and reduce response times."
      },
      {
        title: "Accessing Alert Settings",
        type: "steps",
        items: [
          {
            step: 1,
            title: "Open Settings",
            description: "Click the gear icon in the top right corner or press Ctrl+,"
          },
          {
            step: 2,
            title: "Navigate to Alerts",
            description: "Select 'Alerts & Notifications' from the sidebar menu."
          },
          {
            step: 3,
            title: "Configure Thresholds",
            description: "Set custom thresholds for each metric and risk level."
          }
        ]
      },
      {
        title: "Alert Types",
        type: "list",
        items: [
          {
            icon: Bell,
            title: "In-App Notifications",
            description: "Pop-up alerts within the dashboard. Always enabled for critical alerts."
          },
          {
            icon: MessageCircle,
            title: "Email Notifications",
            description: "Sent to registered email addresses. Configure frequency and severity thresholds."
          },
          {
            icon: Zap,
            title: "SMS Alerts",
            description: "Text messages for urgent situations. Recommended for Warning and Critical levels only."
          },
          {
            icon: ExternalLink,
            title: "Webhook Integration",
            description: "Send alerts to external systems like Slack, Teams, or custom APIs."
          }
        ]
      },
      {
        title: "Recommended Thresholds",
        type: "table",
        headers: ["Metric", "Warning", "Critical", "Notes"],
        rows: [
          ["Risk Level", "60%", "80%", "Primary alert trigger"],
          ["Temperature", "22°C", "18°C", "Below equilibrium temp"],
          ["Pressure", "1800 PSI", "2200 PSI", "High pressure zone"],
          ["Rate of Change", "5%/min", "10%/min", "Rapid deterioration"]
        ]
      },
      {
        title: "Alert Escalation",
        content: "Configure escalation rules to notify additional personnel if alerts are not acknowledged within a set time period. This ensures critical situations are never missed.",
        tip: "Set escalation time to 5 minutes for critical alerts and 15 minutes for warnings."
      },
      {
        title: "Best Practices",
        type: "checklist",
        items: [
          "Don't set thresholds too low - alert fatigue reduces effectiveness",
          "Test your alert configuration regularly",
          "Keep contact information up to date",
          "Document alert responses in the system log",
          "Review and adjust thresholds based on operational experience"
        ]
      }
    ]
  }
};

// Extended FAQ with expandable answers
const faqContent = [
  {
    id: 1,
    question: "What is hydrate risk and why does it matter?",
    answer: "Hydrate risk measures the probability of gas hydrate formation in pipelines. Gas hydrates are ice-like crystalline structures that form when water and natural gas combine under high pressure and low temperature conditions. High risk levels can lead to pipeline blockages, equipment damage, and operational shutdowns. In severe cases, hydrate plugs can cause safety hazards and significant financial losses. Monitoring and managing hydrate risk is essential for safe, efficient pipeline operations.",
    related: ["How is risk calculated?", "What causes hydrate formation?"]
  },
  {
    id: 2,
    question: "How often is sensor data updated?",
    answer: "Sensor data is polled every 5 seconds in real-time mode, providing near-instantaneous updates to your dashboard. This frequency ensures you can respond quickly to changing conditions. Historical data is stored in our database and can be accessed for trend analysis spanning hours, days, weeks, or months. You can adjust the display refresh rate in Settings if needed, though we recommend keeping it at 5 seconds for optimal monitoring.",
    related: ["Can I change the update frequency?", "How long is data stored?"]
  },
  {
    id: 3,
    question: "What file formats are supported for simulation?",
    answer: "HydrateWatch supports CSV (Comma-Separated Values) and JSON (JavaScript Object Notation) file formats for simulation data upload. Your files must contain at minimum these columns: timestamp (ISO 8601 format), temperature (in Celsius), and pressure (in PSI). Optional columns include flow_rate, water_content, gas_composition, and inhibitor_rate. Maximum file size is 50MB, and we recommend using at least 24 hours of data for accurate simulations.",
    related: ["What columns are required?", "How large can my file be?"]
  },
  {
    id: 4,
    question: "How do I switch between Offshore and Onshore modes?",
    answer: "Use the Mode Selector panel on the dashboard to switch between operational modes. Click the toggle or dropdown labeled 'Environment Mode' and select either Offshore or Onshore. Each mode applies different risk calculation parameters optimized for that environment. Offshore mode accounts for marine conditions, subsea temperatures, and typical deepwater pressures. Onshore mode uses parameters suited for land-based operations with different ambient conditions.",
    related: ["What's different between modes?", "Can I create custom modes?"]
  },
  {
    id: 5,
    question: "How is the risk percentage calculated?",
    answer: "The risk percentage is calculated using a proprietary algorithm that weighs multiple factors: Temperature accounts for 40% (distance from hydrate equilibrium temperature), Pressure accounts for 30% (relationship to critical pressure points), Water Content accounts for 20% (available water for hydrate formation), and Flow Rate accounts for 10% (time available for nucleation). These are combined with historical factors and seasonal adjustments to produce the final risk score.",
    related: ["Can I see the calculation details?", "How accurate is the prediction?"]
  },
  {
    id: 6,
    question: "What should I do when risk reaches critical levels?",
    answer: "When risk reaches critical levels (81-100%), you should: 1) Initiate emergency protocols as defined by your organization, 2) Increase hydrate inhibitor injection to maximum safe levels, 3) Consider adjusting flow rates or implementing controlled shutdown if safe, 4) Deploy field teams to high-risk locations, 5) Notify all relevant personnel and management, 6) Document all actions taken with timestamps. Never ignore critical alerts - the cost of prevention is always less than the cost of a hydrate plug.",
    related: ["What are emergency protocols?", "How do I increase inhibitor injection?"]
  },
  {
    id: 7,
    question: "Can I export my data and reports?",
    answer: "Yes! HydrateWatch supports multiple export options. For reports, you can export as PDF (for official documentation), Excel (.xlsx for data analysis), or CSV (for system integration). Real-time and historical data can be exported via the Export button on any chart or table. You can also set up automated report delivery via email. API access is available for Enterprise customers who need to integrate data with external systems.",
    related: ["What export formats are available?", "Is there an API?"]
  },
  {
    id: 8,
    question: "How do I add additional users to my account?",
    answer: "To add users, you need Administrator privileges. Go to Settings > User Management > Add User. Enter the new user's email address, select their role (Viewer, Operator, or Administrator), and assign them to appropriate sensor groups. They'll receive an email invitation to set up their account. You can manage user permissions, reset passwords, and deactivate accounts from the same panel.",
    related: ["What user roles are available?", "How do I remove a user?"]
  }
];

export default function HelpPanel({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("guides");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  if (!isOpen) return null;

  const tabs = [
    { id: "guides", label: "Quick Guides", icon: Book },
    { id: "faq", label: "FAQ", icon: MessageCircle },
  ];

  const guides = [
    {
      id: 1,
      icon: BarChart2,
      title: "Understanding Dashboard Metrics",
      description: "Learn how to read and interpret the key performance indicators on your dashboard.",
      category: "basics"
    },
    {
      id: 2,
      icon: Zap,
      title: "Running Simulations",
      description: "Step-by-step guide to uploading data and running hydrate behavior simulations.",
      category: "simulation"
    },
    {
      id: 3,
      icon: Shield,
      title: "Risk Assessment Guide",
      description: "Understanding hydrate risk levels and recommended actions for each threshold.",
      category: "safety"
    },
    {
      id: 4,
      icon: Settings,
      title: "Configuring Alerts",
      description: "Set up custom alert thresholds and notification preferences.",
      category: "settings"
    },
  ];

  const filteredGuides = guides.filter(g =>
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFaqs = faqContent.filter(f =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Guide Detail View Component
  const GuideDetailView = ({ guideId }) => {
    const guide = guideContent[guideId];
    if (!guide) return null;

    const Icon = guide.icon;

    return (
      <div className="flex flex-col h-full">
        {/* Guide Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setSelectedGuide(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{guide.title}</h3>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {guide.estimatedTime}
              </span>
              <span className="px-2 py-0.5 bg-gray-100 rounded text-xs uppercase">{guide.category}</span>
            </div>
          </div>
        </div>

        {/* Guide Content */}
        <div className="space-y-6 overflow-y-auto flex-1 pr-2">
          {guide.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-primary-500" />
                {section.title}
              </h4>

              {/* Regular content */}
              {section.content && (
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              )}

              {/* Tip box */}
              {section.tip && (
                <div className="flex gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800">{section.tip}</p>
                </div>
              )}

              {/* List with icons */}
              {section.type === "list" && (
                <div className="space-y-3">
                  {section.items.map((item, i) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <ItemIcon className="w-4 h-4 text-primary-600" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900">{item.title}</h5>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Steps */}
              {section.type === "steps" && (
                <div className="space-y-3">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center flex-shrink-0 font-semibold">
                        {item.step}
                      </div>
                      <div className="flex-1 pt-1">
                        <h5 className="font-medium text-gray-900">{item.title}</h5>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Table */}
              {section.type === "table" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        {section.headers.map((header, i) => (
                          <th key={i} className="px-3 py-2 text-left font-medium text-gray-700 border-b">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.rows.map((row, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          {row.map((cell, j) => (
                            <td key={j} className="px-3 py-2 text-gray-600">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Checklist */}
              {section.type === "checklist" && (
                <div className="space-y-2">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Code block */}
              {section.type === "code" && (
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100 font-mono">{section.code}</pre>
                </div>
              )}

              {/* Formula */}
              {section.type === "formula" && (
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <code className="text-sm font-mono text-gray-800">{section.formula}</code>
                </div>
              )}

              {/* Alerts */}
              {section.type === "alerts" && (
                <div className="space-y-3">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-lg border ${
                        item.level === "safe"
                          ? "bg-green-50 border-green-200"
                          : item.level === "caution"
                            ? "bg-yellow-50 border-yellow-200"
                            : item.level === "warning"
                              ? "bg-orange-50 border-orange-200"
                              : "bg-red-50 border-red-200"
                      }`}
                    >
                      <h5 className={`font-semibold ${
                        item.level === "safe"
                          ? "text-green-800"
                          : item.level === "caution"
                            ? "text-yellow-800"
                            : item.level === "warning"
                              ? "text-orange-800"
                              : "text-red-800"
                      }`}>
                        {item.title}
                      </h5>
                      <p className="text-sm text-gray-700 mt-1">{item.description}</p>
                      <div className="mt-2 space-y-1">
                        {item.actions.map((action, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                            <ChevronRight className="w-4 h-4" />
                            {action}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Panel Container */}
      <div className="min-h-full flex items-center justify-center p-4">
        {/* Panel */}
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Help Center</h2>
              <p className="text-blue-100">Documentation & Support</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Show guide detail view */}
        {selectedGuide ? (
          <div className="flex-1 overflow-hidden p-6">
            <GuideDetailView guideId={selectedGuide} />
          </div>
        ) : (
          <>
            {/* Search */}
            <div className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for help..."
                  className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="px-6 py-2 border-b border-gray-100 flex gap-2 flex-shrink-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-primary-500 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Guides Tab */}
              {activeTab === "guides" && (
                <div className="space-y-3">
                  {filteredGuides.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No guides found matching "{searchQuery}"
                    </div>
                  ) : (
                    filteredGuides.map((guide) => {
                      const Icon = guide.icon;
                      return (
                        <button
                          key={guide.id}
                          onClick={() => setSelectedGuide(guide.id)}
                          className="w-full p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50/50 transition-all text-left flex items-start gap-4"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{guide.title}</h4>
                            <p className="text-gray-500 mt-0.5">{guide.description}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                        </button>
                      );
                    })
                  )}
                </div>
              )}

              {/* FAQ Tab */}
              {activeTab === "faq" && (
                <div className="space-y-3">
                  {filteredFaqs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No FAQs found matching "{searchQuery}"
                    </div>
                  ) : (
                    filteredFaqs.map((faq) => (
                      <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <h4 className="font-medium text-gray-900 text-left">{faq.question}</h4>
                          {expandedFaq === faq.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        {expandedFaq === faq.id && (
                          <div className="px-4 pb-4 border-t border-gray-100">
                            <p className="text-gray-600 mt-3 leading-relaxed">{faq.answer}</p>
                            {faq.related && (
                              <div className="mt-4">
                                <p className="text-sm text-gray-500 mb-2">Related questions:</p>
                                <div className="flex flex-wrap gap-2">
                                  {faq.related.map((related, i) => (
                                    <span key={i} className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer">
                                      {related}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
          <p className="text-gray-500">
            Need more help? Contact support
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <ExternalLink className="w-4 h-4" />
            Open Documentation
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
