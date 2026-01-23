"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Database,
  FileUp,
  Gauge,
  LineChart,
  MapPin,
  Shield,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  Droplet,
  Eye,
  FlaskConical,
  Layers,
  Lock,
  Radio,
  Settings,
  Target,
  Wrench,
  Play,
  Sparkles,
  ChevronRight,
  Globe,
  Cpu,
  Bell,
  PieChart
} from "lucide-react";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Navigation - Glassmorphism */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl blur opacity-30"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">HydrateWatch</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</a>
              <a href="#solutions" className="text-sm text-gray-400 hover:text-white transition-colors">Solutions</a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="group relative px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium text-sm overflow-hidden transition-all hover:shadow-lg hover:shadow-cyan-500/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            {/* Animated Orbs */}
            <div className="relative mb-8 flex justify-center">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse shadow-lg shadow-cyan-400/30" style={{ animationDelay: '0.4s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" style={{ animationDelay: '0.6s' }}></div>
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0.8s' }}></div>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">Real-Time </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Hydrate</span>
              <br />
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">Risk Intelligence</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Prevent costly pipeline blockages with advanced AI monitoring.
              Get real-time predictions, instant alerts, and actionable insights for your oil & gas operations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/login"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl font-semibold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/demo"
                className="group px-8 py-4 bg-white/5 text-white rounded-2xl font-semibold text-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" /> Get Demo
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">99.9%</div>
                <div className="text-sm text-gray-500 mt-1">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">&lt;100ms</div>
                <div className="text-sm text-gray-500 mt-1">Alert Latency</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-gray-500 mt-1">Active Sensors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-gray-500 mt-1">Monitoring</div>
              </div>
            </div>
          </div>

          {/* Hero Dashboard Preview - 3D Style Card */}
          <div className="relative max-w-5xl mx-auto">
            {/* Glow effects */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>

            {/* Main Dashboard Card */}
            <div className="relative bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl">
              {/* Browser-like header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-lg border border-white/5">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">Live Monitoring</span>
                </div>
              </div>

              {/* Bento Grid Dashboard */}
              <div className="grid grid-cols-12 gap-4">
                {/* Risk Gauge - Large */}
                <div className="col-span-12 md:col-span-4 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-5 border border-white/5 group hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Risk Index</span>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium">Low</span>
                  </div>
                  <div className="relative flex items-center justify-center py-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#1f1f2e" strokeWidth="8" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="url(#gaugeGradient)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="188" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-4xl font-bold text-white">0.23</span>
                      <span className="text-xs text-gray-500">Risk Score</span>
                    </div>
                  </div>
                </div>

                {/* Mini Stats Grid */}
                <div className="col-span-12 md:col-span-8 grid grid-cols-2 gap-4">
                  {/* Pressure */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-4 border border-white/5 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                        <Gauge className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-xs text-gray-400">Pressure</span>
                    </div>
                    <div className="text-2xl font-bold text-white">42.5 <span className="text-sm text-gray-500 font-normal">bar</span></div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-emerald-400">
                      <TrendingUp className="w-3 h-3" />
                      <span>+2.3% from avg</span>
                    </div>
                  </div>

                  {/* Temperature */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-4 border border-white/5 hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <Activity className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-xs text-gray-400">Temperature</span>
                    </div>
                    <div className="text-2xl font-bold text-white">15.2 <span className="text-sm text-gray-500 font-normal">°C</span></div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Normal range</span>
                    </div>
                  </div>

                  {/* Flow Rate */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-4 border border-white/5 hover:border-purple-500/30 transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-xs text-gray-400">Flow Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-white">850 <span className="text-sm text-gray-500 font-normal">m³/h</span></div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-emerald-400">
                      <TrendingUp className="w-3 h-3" />
                      <span>Optimal flow</span>
                    </div>
                  </div>

                  {/* Active Alerts */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-4 border border-white/5 hover:border-emerald-500/30 transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                        <Bell className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-xs text-gray-400">Alerts</span>
                    </div>
                    <div className="text-2xl font-bold text-white">0 <span className="text-sm text-gray-500 font-normal">active</span></div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>All systems normal</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Powerful Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Everything You Need to </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Stay Protected</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Advanced monitoring capabilities designed for the demanding requirements of oil & gas operations
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Large Feature - Real-time Monitoring */}
            <div className="col-span-12 md:col-span-7 group">
              <div className="h-full bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/5 p-8 hover:border-cyan-500/30 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/15 transition-all"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Radio className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Real-Time Sensor Monitoring</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Continuous monitoring of pressure, temperature, and flow rate from IoT sensors with sub-second updates. Never miss a critical change in your pipeline conditions.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1.5 bg-white/5 rounded-lg text-xs text-gray-300 border border-white/5">Live Data</span>
                    <span className="px-3 py-1.5 bg-white/5 rounded-lg text-xs text-gray-300 border border-white/5">Multi-Sensor</span>
                    <span className="px-3 py-1.5 bg-white/5 rounded-lg text-xs text-gray-300 border border-white/5">IoT Integration</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Feature - AI Risk Index */}
            <div className="col-span-12 md:col-span-5 group">
              <div className="h-full bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/5 p-8 hover:border-purple-500/30 transition-all relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/15 transition-all"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Cpu className="w-7 h-7 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">AI-Powered Risk Index</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Machine learning algorithms analyze patterns and predict hydrate formation risk with confidence scores.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-purple-400">
                    <Sparkles className="w-4 h-4" />
                    <span>Predictive Analytics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Features Row */}
            <div className="col-span-12 md:col-span-4 group">
              <div className="h-full bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/5 p-6 hover:border-blue-500/30 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileUp className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">CSV Simulation</h3>
                <p className="text-sm text-gray-400">Upload historical data to simulate scenarios and validate predictions.</p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 group">
              <div className="h-full bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/5 p-6 hover:border-emerald-500/30 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Multi-Site Support</h3>
                <p className="text-sm text-gray-400">Offshore and onshore modes with location-specific configurations.</p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 group">
              <div className="h-full bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/5 p-6 hover:border-amber-500/30 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-amber-500/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Bell className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Smart Alerts</h3>
                <p className="text-sm text-gray-400">Instant notifications when risk levels exceed thresholds.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <Settings className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Simple Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">How </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">HydrateWatch </span>
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Four simple steps from data collection to actionable insights
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, icon: Database, title: "Connect Sensors", desc: "Integrate IoT sensors or upload CSV data for analysis", color: "cyan" },
              { step: 2, icon: Cpu, title: "AI Analysis", desc: "Advanced algorithms process and analyze the data", color: "purple" },
              { step: 3, icon: Target, title: "Risk Prediction", desc: "Generate risk scores with confidence levels", color: "blue" },
              { step: 4, icon: LineChart, title: "Visualize", desc: "Interactive dashboards with real-time updates", color: "emerald" }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/20 to-transparent z-0"></div>
                )}
                <div className="relative bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/5 p-6 hover:border-white/10 transition-all h-full">
                  <div className={`w-12 h-12 bg-${item.color}-500/10 rounded-xl flex items-center justify-center mb-4 relative`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section id="solutions" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Why HydrateWatch</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Solve Critical </span>
              <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">Challenges</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Hydrate formation poses severe operational and financial risks. Here's how we help.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Problem Cards */}
            <div className="group">
              <div className="h-full bg-gradient-to-br from-red-950/30 to-[#0d0d14] rounded-3xl border border-red-500/10 p-8 hover:border-red-500/30 transition-all">
                <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <Lock className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Pipeline Blockages</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  Hydrate plugs can completely obstruct flow in subsea pipelines, requiring costly intervention.
                </p>
                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Early detection prevents 95% of blockages</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="h-full bg-gradient-to-br from-orange-950/30 to-[#0d0d14] rounded-3xl border border-orange-500/10 p-8 hover:border-orange-500/30 transition-all">
                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <Clock className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Production Downtime</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  Unplanned shutdowns result in significant production losses and revenue impact.
                </p>
                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Reduce unplanned downtime by 80%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="h-full bg-gradient-to-br from-yellow-950/30 to-[#0d0d14] rounded-3xl border border-yellow-500/10 p-8 hover:border-yellow-500/30 transition-all">
                <div className="w-14 h-14 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <DollarSign className="w-7 h-7 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">High Costs</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  Each hydrate incident can cost over $1M in repairs, lost production, and emergency response.
                </p>
                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save millions with predictive insights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Built For You</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Trusted by </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Industry Leaders</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/5 p-8 hover:border-cyan-500/20 transition-all group">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wrench className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Oil & Gas Engineers</h3>
              <p className="text-gray-400 text-sm mb-6">Field engineers and operations managers monitoring offshore platforms and subsea pipelines.</p>
              <ul className="space-y-3">
                {["Real-time monitoring", "Instant alerts", "Mobile access"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/5 p-8 hover:border-purple-500/20 transition-all group">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FlaskConical className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Researchers</h3>
              <p className="text-gray-400 text-sm mb-6">Academic and industrial researchers studying hydrate formation and prevention strategies.</p>
              <ul className="space-y-3">
                {["Simulation tools", "Data export", "Advanced analytics"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/5 p-8 hover:border-blue-500/20 transition-all group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Energy Companies</h3>
              <p className="text-gray-400 text-sm mb-6">Enterprise teams managing multi-site operations requiring centralized monitoring.</p>
              <ul className="space-y-3">
                {["Multi-site dashboard", "Compliance tracking", "Custom reporting"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Values Section */}
      <section id="about-us" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <Target className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Who We Are</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Our </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Purpose</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Driving innovation in pipeline safety through cutting-edge technology and unwavering commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Vision */}
            <div className="group">
              <div className="h-full bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/5 p-8 hover:border-cyan-500/30 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[60px] group-hover:bg-cyan-500/20 transition-all"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Eye className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                  <p className="text-gray-400 leading-relaxed">
                    To become the global standard in predictive pipeline monitoring, creating a world where hydrate-related incidents are completely preventable through intelligent technology.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="group">
              <div className="h-full bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/5 p-8 hover:border-purple-500/30 transition-all relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/20 transition-all"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Target className="w-7 h-7 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                  <p className="text-gray-400 leading-relaxed">
                    To empower oil and gas operators with AI-driven insights that prevent costly hydrate formations, reduce downtime, and ensure operational safety across all environments.
                  </p>
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="group">
              <div className="h-full bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/5 p-8 hover:border-blue-500/30 transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-all"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Shield className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Values</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>Innovation & Excellence</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>Safety First</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>Customer Success</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>Environmental Responsibility</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-[40px] blur-2xl"></div>

            <div className="relative bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-[32px] border border-white/10 p-12 md:p-16 text-center overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-gray-300">Start Today</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Ready to Protect Your </span>
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Pipeline?</span>
                </h2>

                <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
                  Join industry leaders using HydrateWatch to prevent blockages, reduce downtime, and ensure operational safety.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                  <Link
                    href="/login"
                    className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl font-semibold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-[1.02]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <Link
                    href="/demo"
                    className="px-10 py-4 bg-white/5 text-white rounded-2xl font-semibold text-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    Request Demo
                  </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">HydrateWatch</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Enterprise-grade hydrate formation monitoring and prediction for oil & gas operations worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/releases" className="hover:text-white transition-colors">Releases</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/data-protection" className="hover:text-white transition-colors">Data Protection</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 HydrateWatch. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
