"use client";

import Link from "next/link";
import {
  ArrowRight,
  Droplet,
  Calendar,
  Clock,
  User,
  BookOpen,
  TrendingUp,
  Shield,
  Zap,
  Database
} from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Hydrate Formation in Subsea Pipelines",
    excerpt: "A comprehensive guide to the science behind hydrate formation and why it poses such a significant risk to offshore operations.",
    category: "Education",
    author: "Dr. Sarah Chen",
    date: "Jan 15, 2026",
    readTime: "8 min read",
    icon: BookOpen,
    color: "cyan"
  },
  {
    id: 2,
    title: "How AI is Revolutionizing Pipeline Monitoring",
    excerpt: "Explore how machine learning algorithms are transforming the way we predict and prevent hydrate-related incidents.",
    category: "Technology",
    author: "Michael Roberts",
    date: "Jan 10, 2026",
    readTime: "6 min read",
    icon: TrendingUp,
    color: "purple"
  },
  {
    id: 3,
    title: "Best Practices for IoT Sensor Deployment",
    excerpt: "Learn the key considerations for deploying IoT sensors in harsh offshore environments for optimal data collection.",
    category: "Operations",
    author: "James Anderson",
    date: "Jan 5, 2026",
    readTime: "10 min read",
    icon: Database,
    color: "blue"
  },
  {
    id: 4,
    title: "Case Study: Preventing a Major Blockage Event",
    excerpt: "How HydrateWatch's early warning system helped an offshore platform avoid a potentially catastrophic hydrate plug.",
    category: "Case Study",
    author: "Emma Wilson",
    date: "Dec 28, 2025",
    readTime: "5 min read",
    icon: Shield,
    color: "emerald"
  },
  {
    id: 5,
    title: "The Economics of Predictive Maintenance",
    excerpt: "Understanding the ROI of implementing AI-powered predictive maintenance systems in oil and gas operations.",
    category: "Business",
    author: "David Thompson",
    date: "Dec 20, 2025",
    readTime: "7 min read",
    icon: TrendingUp,
    color: "amber"
  },
  {
    id: 6,
    title: "Real-Time Monitoring: A Technical Deep Dive",
    excerpt: "An in-depth look at the technology stack powering HydrateWatch's real-time monitoring capabilities.",
    category: "Technology",
    author: "Alex Kim",
    date: "Dec 15, 2025",
    readTime: "12 min read",
    icon: Zap,
    color: "cyan"
  }
];

export default function BlogPage() {
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
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Our Blog</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Insights & </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Resources</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Stay informed with the latest trends, best practices, and innovations in pipeline monitoring and hydrate prevention.
            </p>
          </div>

          {/* Featured Post */}
          <div className="mb-12">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/10 p-8 md:p-12 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded-full">Featured</span>
                  <span className="px-3 py-1 bg-white/5 text-gray-400 text-xs rounded-full">Education</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  The Complete Guide to Hydrate Prevention in Oil & Gas Operations
                </h2>
                <p className="text-gray-400 mb-6 max-w-3xl">
                  Everything you need to know about hydrate formation, from the underlying thermodynamics to modern AI-powered prevention strategies. A must-read for engineers and operations managers.
                </p>
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Dr. Sarah Chen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Jan 20, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>15 min read</span>
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                  Read Article <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article key={post.id} className="group">
                <div className="h-full bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 bg-${post.color}-500/10 rounded-xl flex items-center justify-center`}>
                      <post.icon className={`w-5 h-5 text-${post.color}-400`} />
                    </div>
                    <span className="px-3 py-1 bg-white/5 text-gray-400 text-xs rounded-full">{post.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-20">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-[#12121a] to-[#0d0d14] rounded-3xl border border-white/10 p-8 md:p-12 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                  Get the latest insights, case studies, and industry news delivered directly to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
