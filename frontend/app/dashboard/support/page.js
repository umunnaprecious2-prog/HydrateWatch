"use client";

import { useState } from "react";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import Sidebar from "@/src/components/Sidebar";
import Header from "@/src/components/Header";
import BottomNav from "@/src/components/BottomNav";
import Footer from "@/src/components/Footer";
import {
  HelpCircle,
  Book,
  MessageSquare,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Server,
  Database,
  Wifi,
  Clock,
  FileText,
  Video,
  Zap,
  Shield,
  Search,
  ChevronDown,
  ChevronRight,
  Send
} from "lucide-react";

// Help documentation sections
const helpTopics = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Zap,
    articles: [
      { title: "Introduction to HydrateWatch", href: "/docs#overview" },
      { title: "Understanding Operating Modes", href: "/docs#modes" },
      { title: "Your First Login", href: "/docs#first-login" },
      { title: "Dashboard Tour", href: "/docs#dashboard-tour" }
    ]
  },
  {
    id: "features",
    title: "Features & Tools",
    icon: FileText,
    articles: [
      { title: "Dashboard Overview", href: "/docs#dashboard-tour" },
      { title: "Sensor Tracking", href: "/dashboard/tracking" },
      { title: "Report Generation", href: "/docs#reporting" },
      { title: "Data Upload & Simulation", href: "/docs#simulation" }
    ]
  },
  {
    id: "data-upload",
    title: "Data Upload Guide",
    icon: Server,
    articles: [
      { title: "Supported File Formats", href: "/docs#file-formats" },
      { title: "Data Structure Requirements", href: "/docs#data-structure" },
      { title: "Running a Simulation", href: "/docs#running-simulation" },
      { title: "Troubleshooting Uploads", href: "#upload-issues" }
    ]
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: AlertTriangle,
    articles: [
      { title: "Connection Issues", href: "#connection" },
      { title: "Data Not Loading", href: "#data-issues" },
      { title: "Upload Errors", href: "#upload-issues" },
      { title: "Account & Access", href: "#account" }
    ]
  },
  {
    id: "api",
    title: "API Documentation",
    icon: Book,
    articles: [
      { title: "API Overview", href: "/docs/api" },
      { title: "Authentication", href: "/docs/api#authentication" },
      { title: "Endpoints Reference", href: "/docs/api#endpoints" },
      { title: "Rate Limits", href: "/docs/api#rate-limits" }
    ]
  }
];

// System health status
const systemServices = [
  { name: "API Gateway", status: "operational", latency: "24ms" },
  { name: "Sensor Data Pipeline", status: "operational", latency: "156ms" },
  { name: "Database Cluster", status: "operational", latency: "12ms" },
  { name: "Authentication Service", status: "operational", latency: "89ms" },
  { name: "Notification Service", status: "operational", latency: "45ms" }
];

// FAQ items
const faqItems = [
  {
    question: "What is hydrate formation and why is it dangerous?",
    answer: "Hydrate formation occurs when water and natural gas combine under high pressure and low temperature conditions, creating ice-like crystals that can block pipelines. This can lead to production shutdowns, equipment damage, and safety hazards. HydrateWatch helps monitor conditions that lead to hydrate formation so you can take preventive action."
  },
  {
    question: "How does HydrateWatch calculate risk levels?",
    answer: "HydrateWatch uses real-time temperature, pressure, and flow rate data combined with thermodynamic models to calculate the probability of hydrate formation. Risk levels are categorized as Low (<40%), Moderate (40-70%), and High (>70%). The risk gauge on your dashboard shows the current overall risk with a confidence percentage."
  },
  {
    question: "What's the difference between Offshore and Onshore modes?",
    answer: "Offshore mode is optimized for subsea pipeline conditions with high pressure (150-300 bar) and low temperatures (2-8°C). Onshore mode is configured for surface facilities with ambient temperatures (15-35°C) and lower pressures (20-80 bar). The mode affects risk thresholds and calculation parameters. You can switch modes using the Mode Selector on the dashboard."
  },
  {
    question: "What file formats can I upload for simulation?",
    answer: "HydrateWatch accepts CSV, JSON, Excel (.xlsx, .xls), and structured TXT files up to 10MB. Your data must include timestamp, temperature (°C), pressure (bar), and flow_rate (m³/h) columns. Optional fields include sensor_id and location. See the Documentation for detailed format examples."
  },
  {
    question: "How do I run a simulation with my own data?",
    answer: "To run a simulation: 1) Select your operating mode (Offshore/Onshore), 2) Enable Simulation Mode in the Mode Selector, 3) Upload your data file in the Simulation Control Panel, 4) Click 'Upload File' to process. The dashboard will display results based on your uploaded data."
  },
  {
    question: "How often is sensor data updated?",
    answer: "Sensor data is updated every 5 seconds by default. You can configure the refresh interval in Settings. Historical data is retained for 90 days with 1-minute resolution. You can also enable Demo Mode to see sample readings without connecting to live sensors."
  },
  {
    question: "How do I generate and export reports?",
    answer: "Navigate to the Reporting page from the sidebar. Select a date range, choose a report type (Risk Summary, Sensor Performance, Operations Summary, or Trend Analysis), and select your preferred export format (PDF, CSV, or Excel). Click 'Generate Report' to create and download your report."
  },
  {
    question: "What do the different sensor status colors mean?",
    answer: "Green (Active) = Sensor is operating normally. Amber (Warning) = Readings are approaching threshold limits. Red (Critical) = Readings exceed safe thresholds, immediate attention needed. Gray (Offline) = Sensor is not transmitting data."
  }
];

function SupportContent() {
  const [expandedTopic, setExpandedTopic] = useState("getting-started");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    priority: "normal"
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    setContactForm({ subject: "", message: "", priority: "normal" });
  };

  const allOperational = systemServices.every(s => s.status === "operational");

  return (
    <div className="flex min-h-screen bg-dashboard-bg">
      <Sidebar systemHealth={92} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
              <p className="text-sm text-gray-500 mt-1">
                Documentation, troubleshooting, and contact support
              </p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation, FAQs, and help articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <a href="/docs" className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Book className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">User Guide</h3>
                    <p className="text-xs text-gray-500">Complete documentation</p>
                  </div>
                </div>
              </a>
              <a href="/docs#simulation" className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                    <Server className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Data Upload</h3>
                    <p className="text-xs text-gray-500">File formats & structure</p>
                  </div>
                </div>
              </a>
              <a href="#contact" className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Contact Support</h3>
                    <p className="text-xs text-gray-500">Get help from our team</p>
                  </div>
                </div>
              </a>
              <a href="#status" className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">System Status</h3>
                    <p className="text-xs text-gray-500">Service health & uptime</p>
                  </div>
                </div>
              </a>
            </div>

            {/* Quick Start Guide */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
              <h2 className="text-lg font-semibold mb-4">Quick Start Guide</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-2">
                    <span className="font-bold">1</span>
                  </div>
                  <h3 className="font-medium mb-1">Select Mode</h3>
                  <p className="text-white/80 text-xs">Choose Offshore or Onshore based on your operations</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-2">
                    <span className="font-bold">2</span>
                  </div>
                  <h3 className="font-medium mb-1">Monitor Dashboard</h3>
                  <p className="text-white/80 text-xs">View KPIs, risk gauge, and sensor charts</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-2">
                    <span className="font-bold">3</span>
                  </div>
                  <h3 className="font-medium mb-1">Upload Data</h3>
                  <p className="text-white/80 text-xs">CSV, JSON, Excel, or TXT files up to 10MB</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-2">
                    <span className="font-bold">4</span>
                  </div>
                  <h3 className="font-medium mb-1">Generate Reports</h3>
                  <p className="text-white/80 text-xs">Export in PDF, CSV, or Excel format</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Documentation Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Help Topics */}
                <div id="docs" className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Documentation</h2>
                  <div className="space-y-2">
                    {helpTopics.map((topic) => {
                      const Icon = topic.icon;
                      const isExpanded = expandedTopic === topic.id;

                      return (
                        <div key={topic.id} className="border border-gray-100 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                <Icon className="w-4 h-4 text-gray-600" />
                              </div>
                              <span className="font-medium text-gray-900">{topic.title}</span>
                            </div>
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                          {isExpanded && (
                            <div className="px-4 pb-4">
                              <ul className="space-y-1 pl-11">
                                {topic.articles.map((article, idx) => (
                                  <li key={idx}>
                                    <a
                                      href={article.href}
                                      className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                                    >
                                      <FileText className="w-4 h-4" />
                                      {article.title}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-2">
                    {faqItems.map((faq, idx) => {
                      const isExpanded = expandedFaq === idx;

                      return (
                        <div key={idx} className="border border-gray-100 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                          >
                            <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </button>
                          {isExpanded && (
                            <div className="px-4 pb-4">
                              <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Contact Form */}
                <div id="contact" className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h2>

                  {formSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Message Sent</h3>
                      <p className="text-sm text-gray-500 mt-1">Our support team will respond within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input
                          type="text"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          placeholder="Brief description of your issue"
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select
                          value={contactForm.priority}
                          onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="low">Low - General inquiry</option>
                          <option value="normal">Normal - Issue affecting work</option>
                          <option value="high">High - System not functioning</option>
                          <option value="critical">Critical - Production impacted</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Describe your issue or question in detail..."
                          rows={4}
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        Send Message
                      </button>
                    </form>
                  )}

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-600 mb-3">Or reach us directly:</p>
                    <div className="flex flex-wrap gap-4">
                      <a href="mailto:support@hydratewatch.com" className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700">
                        <Mail className="w-4 h-4" />
                        support@hydratewatch.com
                      </a>
                      <a href="tel:+18005554839" className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700">
                        <Phone className="w-4 h-4" />
                        +1 (800) 555-HYDRATE
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* System Status */}
                <div id="status" className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                      allOperational
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${allOperational ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                      {allOperational ? 'All Operational' : 'Degraded'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {systemServices.map((service, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            service.status === 'operational' ? 'bg-green-500' : 'bg-amber-500'
                          }`}></div>
                          <span className="text-sm text-gray-700">{service.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{service.latency}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Last checked</span>
                      <span>Just now</span>
                    </div>
                  </div>
                </div>

                {/* Version Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Version Information</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Application</span>
                      <span className="text-sm font-medium text-gray-900">v2.4.1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">API Version</span>
                      <span className="text-sm font-medium text-gray-900">v1.3.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Updated</span>
                      <span className="text-sm font-medium text-gray-900">Jan 15, 2026</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Environment</span>
                      <span className="text-sm font-medium text-gray-900">Production</span>
                    </div>
                  </div>

                  <a
                    href="/releases"
                    className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    View Release Notes
                  </a>
                </div>

                {/* Quick Resources */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources</h2>
                  <div className="space-y-2">
                    <a href="/docs" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <Book className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-700">User Guide & Documentation</span>
                      <ExternalLink className="w-4 h-4 text-gray-300 ml-auto" />
                    </a>
                    <a href="/docs/api" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <Video className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-700">API Reference</span>
                      <ExternalLink className="w-4 h-4 text-gray-300 ml-auto" />
                    </a>
                    <a href="/releases" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-700">Release Notes</span>
                      <ExternalLink className="w-4 h-4 text-gray-300 ml-auto" />
                    </a>
                    <a href="/data-protection" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <Shield className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-700">Security & Data Protection</span>
                      <ExternalLink className="w-4 h-4 text-gray-300 ml-auto" />
                    </a>
                  </div>
                </div>
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

export default function SupportPage() {
  return (
    <ProtectedRoute>
      <SupportContent />
    </ProtectedRoute>
  );
}
