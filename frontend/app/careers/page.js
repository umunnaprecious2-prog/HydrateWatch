"use client";

import Link from "next/link";
import {
  ArrowRight,
  Droplet,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  Heart,
  Zap,
  Globe,
  Users,
  Coffee,
  Laptop,
  GraduationCap,
  Plane
} from "lucide-react";

const openPositions = [
  {
    id: 1,
    title: "Senior ML Engineer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time",
    description: "Build and optimize our AI models for hydrate risk prediction."
  },
  {
    id: 2,
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote / London",
    type: "Full-time",
    description: "Develop features for our real-time monitoring dashboard."
  },
  {
    id: 3,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Manage our cloud infrastructure and deployment pipelines."
  },
  {
    id: 4,
    title: "Product Manager",
    department: "Product",
    location: "San Francisco",
    type: "Full-time",
    description: "Drive product strategy and roadmap for our monitoring platform."
  },
  {
    id: 5,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Houston",
    type: "Full-time",
    description: "Help enterprise clients maximize value from HydrateWatch."
  },
  {
    id: 6,
    title: "Sales Engineer",
    department: "Sales",
    location: "Remote / Houston",
    type: "Full-time",
    description: "Support sales with technical expertise and product demos."
  }
];

const benefits = [
  { icon: Laptop, title: "Remote-First", desc: "Work from anywhere in the world" },
  { icon: Heart, title: "Health Benefits", desc: "Comprehensive medical, dental, and vision" },
  { icon: GraduationCap, title: "Learning Budget", desc: "$2,000 annual learning stipend" },
  { icon: Plane, title: "Unlimited PTO", desc: "Take the time you need" },
  { icon: Coffee, title: "Home Office", desc: "$1,000 setup stipend" },
  { icon: Users, title: "Team Events", desc: "Annual company retreats" }
];

export default function CareersPage() {
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
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Careers</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Join Our </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Mission</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Help us revolutionize pipeline safety. We're building the future of predictive monitoring, and we want you on the team.
            </p>
          </div>

          {/* Why Join Us */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Why Join HydrateWatch?</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    We're a team of passionate engineers, scientists, and industry experts working together to solve one of the most challenging problems in the energy sector.
                  </p>
                  <p>
                    At HydrateWatch, you'll work on cutting-edge AI technology that makes a real difference, preventing costly incidents and protecting both infrastructure and the environment.
                  </p>
                  <p>
                    We believe in empowering our team members with autonomy, providing the tools and support needed to do their best work, wherever they are.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    <span>Remote-first culture</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <span>Fast-paced startup</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Heart className="w-5 h-5 text-red-400" />
                    <span>Meaningful work</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/10 p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Our Culture</h3>
                  <ul className="space-y-4">
                    {[
                      "Transparency in everything we do",
                      "Ownership and accountability",
                      "Continuous learning and growth",
                      "Collaboration across teams",
                      "Work-life balance respected"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Benefits & Perks</h2>
              <p className="text-gray-400">We take care of our team so they can focus on doing great work.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-2xl border border-white/5 p-6 hover:border-cyan-500/20 transition-all">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-400">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Open Positions</h2>
              <p className="text-gray-400">Find your next opportunity with us.</p>
            </div>
            <div className="space-y-4">
              {openPositions.map((job) => (
                <div key={job.id} className="group bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-2xl border border-white/5 p-6 hover:border-cyan-500/20 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{job.title}</h3>
                        <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">{job.department}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{job.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 text-white rounded-xl font-medium border border-white/10 hover:bg-white/10 transition-all whitespace-nowrap">
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/10 p-12">
                <h2 className="text-3xl font-bold text-white mb-4">Don't See the Right Role?</h2>
                <p className="text-gray-400 mb-8 max-w-lg">
                  We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
                </p>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                  Send General Application <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
