"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Droplet,
  Eye,
  Target,
  Shield,
  Users,
  Globe,
  Award,
  Zap,
  Heart,
  Lightbulb,
  Quote,
  Cpu,
  BookOpen
} from "lucide-react";

export default function AboutPage() {
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
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">About Us</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Pioneering the Future of </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Pipeline Safety</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              HydrateWatch was founded with a singular mission: to revolutionize how the oil and gas industry approaches hydrate formation prevention through innovative AI technology.
            </p>
          </div>

          {/* Our Story */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left - Quote & Origin */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative h-full bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/10 p-8 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                      <Quote className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Our Story</h2>
                  </div>

                  <div className="relative pl-4 border-l-2 border-cyan-500/30 mb-6">
                    <p className="text-gray-300 italic leading-relaxed">
                      "The industry would greatly benefit from a system capable of predicting hydrate formation both before and after it occurs—enabling proactive decisions rather than reactive interventions."
                    </p>
                    <p className="text-sm text-gray-500 mt-3">— Industry Professional, SPE NAICE Conference 2025</p>
                  </div>

                  <p className="text-gray-400 leading-relaxed">
                    This insight revealed a critical gap between hydrate theory and practical tools. HydrateWatch was created to bridge that gap.
                  </p>
                </div>
              </div>

              {/* Right - What We Built */}
              <div className="space-y-4">
                <div className="relative group">
                  <div className="bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-2xl border border-white/5 p-6 hover:border-purple-500/30 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Cpu className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Engineering Meets AI</h3>
                        <p className="text-sm text-gray-400">Built at the intersection of engineering knowledge, data analytics, and artificial intelligence to transform reactive monitoring into predictive workflows.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-2xl border border-white/5 p-6 hover:border-blue-500/30 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Eye className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Visibility & Insights</h3>
                        <p className="text-sm text-gray-400">Designed to support conscious decision-making with visibility into hydrate risk, simulations, and operational trends.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-2xl border border-white/5 p-6 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Grounded in Reality</h3>
                        <p className="text-sm text-gray-400">A commitment to applying technology thoughtfully—rooted in real industry needs, technical rigor, and continuous learning.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision, Mission, Values */}
          <div className="mb-20">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Vision */}
              <div className="group">
                <div className="h-full bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/5 p-8 hover:border-cyan-500/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[60px] group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 rounded-2xl flex items-center justify-center mb-6">
                      <Eye className="w-7 h-7 text-cyan-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                    <p className="text-gray-400 leading-relaxed">
                      To become the global standard in predictive pipeline monitoring, creating a world where hydrate-related incidents are completely preventable.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission */}
              <div className="group">
                <div className="h-full bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/5 p-8 hover:border-purple-500/30 transition-all relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/20 transition-all"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-2xl flex items-center justify-center mb-6">
                      <Target className="w-7 h-7 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                    <p className="text-gray-400 leading-relaxed">
                      To empower operators with AI-driven insights that prevent costly hydrate formations and ensure operational safety across all environments.
                    </p>
                  </div>
                </div>
              </div>

              {/* Values */}
              <div className="group">
                <div className="h-full bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/5 p-8 hover:border-blue-500/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-all"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl flex items-center justify-center mb-6">
                      <Heart className="w-7 h-7 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Our Values</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                        <span>Innovation First</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                        <span>Safety Always</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                        <span>Customer Success</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Why Choose HydrateWatch</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We combine deep industry expertise with cutting-edge technology to deliver unmatched value.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Lightbulb, title: "Innovation", desc: "Cutting-edge AI algorithms trained on millions of data points" },
                { icon: Shield, title: "Reliability", desc: "99.9% uptime with enterprise-grade infrastructure" },
                { icon: Globe, title: "Global Reach", desc: "Supporting operations across 15+ countries" },
                { icon: Award, title: "Excellence", desc: "Industry-recognized for breakthrough solutions" }
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-2xl border border-white/5 p-6 hover:border-cyan-500/20 transition-all">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/10 p-12">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
                <p className="text-gray-400 mb-8 max-w-lg">
                  Join industry leaders who trust HydrateWatch to protect their operations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/demo"
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    Request Demo <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/login"
                    className="px-8 py-4 bg-white/5 text-white rounded-xl font-semibold border border-white/10 hover:bg-white/10 transition-all"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
