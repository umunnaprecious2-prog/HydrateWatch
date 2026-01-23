"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Droplet,
  Play,
  Monitor,
  Gauge,
  Activity,
  BarChart3,
  Bell,
  Shield,
  Clock,
  Users,
  Zap
} from "lucide-react";

export default function DemoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">HydrateWatch</span>
            </Link>
            <Link
              href="/login"
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium text-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <Play className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Interactive Demo</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Experience </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">HydrateWatch</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              See how our AI-powered platform helps prevent costly pipeline blockages with real-time monitoring and predictive analytics.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Demo Preview */}
            <div className="space-y-6">
              {/* Live Demo Card */}
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/10 p-6 overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-400">Demo Mode</span>
                    </div>
                  </div>

                  {/* Mini Dashboard Preview */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Gauge className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs text-gray-400">Risk Index</span>
                      </div>
                      <div className="text-2xl font-bold text-white">0.23</div>
                      <div className="text-xs text-emerald-400">Low Risk</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-gray-400">Temperature</span>
                      </div>
                      <div className="text-2xl font-bold text-white">15.2°C</div>
                      <div className="text-xs text-gray-400">Normal</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-gray-400">Flow Rate</span>
                      </div>
                      <div className="text-2xl font-bold text-white">850 m³/h</div>
                      <div className="text-xs text-emerald-400">Optimal</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-gray-400">Alerts</span>
                      </div>
                      <div className="text-2xl font-bold text-white">0</div>
                      <div className="text-xs text-emerald-400">All Clear</div>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    <Monitor className="w-5 h-5" />
                    Try Live Dashboard
                  </Link>
                </div>
              </div>

              {/* Features List */}
              <div className="bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/5 p-6">
                <h3 className="text-lg font-bold text-white mb-4">What You'll See</h3>
                <ul className="space-y-3">
                  {[
                    { icon: Gauge, text: "Real-time risk index calculation" },
                    { icon: Activity, text: "Live sensor data monitoring" },
                    { icon: Shield, text: "AI-powered predictions" },
                    { icon: Bell, text: "Instant alert notifications" },
                    { icon: BarChart3, text: "Interactive analytics dashboard" },
                    { icon: Clock, text: "Historical data analysis" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-sm">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Request Demo Form */}
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/10 p-8">
                {!submitted ? (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-2">Request a Personalized Demo</h2>
                    <p className="text-gray-400 mb-6">Get a tailored walkthrough with our team</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Work Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Your Role</label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                        >
                          <option value="" className="bg-[#12121a]">Select your role</option>
                          <option value="engineer" className="bg-[#12121a]">Engineer</option>
                          <option value="manager" className="bg-[#12121a]">Operations Manager</option>
                          <option value="executive" className="bg-[#12121a]">Executive</option>
                          <option value="researcher" className="bg-[#12121a]">Researcher</option>
                          <option value="other" className="bg-[#12121a]">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Message (Optional)</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                          placeholder="Tell us about your use case..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                      >
                        Request Demo <ArrowRight className="w-5 h-5" />
                      </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/5">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                          <span>No commitment</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                          <span>Free consultation</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Demo Request Received!</h2>
                    <p className="text-gray-400 mb-6">
                      Thank you for your interest in HydrateWatch. Our team will contact you within 24 hours to schedule your personalized demo.
                    </p>
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                    >
                      Explore Dashboard <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 text-center">
            <p className="text-gray-500 mb-6">Trusted by leading energy companies worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-500">Active Sensors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-gray-500">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-500">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-500">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
