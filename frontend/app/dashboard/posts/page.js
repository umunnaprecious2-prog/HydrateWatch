"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import Sidebar from "@/src/components/Sidebar";
import Header from "@/src/components/Header";
import BottomNav from "@/src/components/BottomNav";
import Footer from "@/src/components/Footer";
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  Upload,
  Activity,
  Clock,
  Filter,
  Search,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Wrench,
  Newspaper,
  GraduationCap,
  Brain,
  ExternalLink,
  Star,
  Eye,
  RefreshCw,
  Tag,
  Lightbulb,
  Target,
  Info
} from "lucide-react";
import { getAIKnowledgePosts, getFeedStats } from "@/src/lib/aiKnowledgeApi";

// Sample operational posts data (system alerts, simulations, etc.)
const operationalPosts = [
  {
    id: 1,
    type: "alert",
    title: "High Hydrate Risk Detected — Platform A",
    description: "Automated alert triggered when hydrate risk exceeded 75% threshold on offshore Platform A. Immediate flow rate adjustment recommended.",
    timestamp: "2026-01-21T14:32:00Z",
    author: "System",
    priority: "high",
    status: "active"
  },
  {
    id: 2,
    type: "simulation",
    title: "Simulation Completed — Q1 Pressure Analysis",
    description: "Batch simulation of Q1 pressure data completed successfully. Results indicate 12% improvement in hydrate prediction accuracy with new model parameters.",
    timestamp: "2026-01-21T11:15:00Z",
    author: "Dr. Sarah Chen",
    priority: "normal",
    status: "completed"
  },
  {
    id: 3,
    type: "upload",
    title: "Dataset Uploaded — North Sea Sensor Log",
    description: "New sensor dataset uploaded for offshore monitoring analysis. Contains 2,847 readings from January 15-20, 2026.",
    timestamp: "2026-01-20T16:45:00Z",
    author: "Marcus Thompson",
    priority: "normal",
    status: "completed"
  },
  {
    id: 4,
    type: "alert",
    title: "Moderate Risk Warning — Pipeline B",
    description: "Temperature drop detected in Pipeline B segment 4. Current conditions approaching hydrate formation zone. Monitoring increased.",
    timestamp: "2026-01-20T09:22:00Z",
    author: "System",
    priority: "medium",
    status: "resolved"
  },
  {
    id: 5,
    type: "maintenance",
    title: "Scheduled Maintenance — Sensor Calibration",
    description: "Quarterly calibration completed for pressure and temperature sensors on Platform C. All readings within acceptable tolerance.",
    timestamp: "2026-01-19T14:00:00Z",
    author: "Field Operations",
    priority: "normal",
    status: "completed"
  },
  {
    id: 6,
    type: "simulation",
    title: "Risk Model Update Deployed",
    description: "Updated hydrate formation prediction model v2.4 deployed to production. Includes improved subsea temperature compensation algorithm.",
    timestamp: "2026-01-18T10:30:00Z",
    author: "Engineering Team",
    priority: "normal",
    status: "completed"
  }
];

// Configuration for operational post types
const postTypeConfig = {
  alert: { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
  simulation: { icon: Activity, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  upload: { icon: Upload, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
  maintenance: { icon: CheckCircle, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" }
};

// Configuration for AI knowledge content types
const aiContentTypeConfig = {
  Research: { icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200" },
  Tooling: { icon: Wrench, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
  Tutorial: { icon: GraduationCap, color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200" },
  News: { icon: Newspaper, color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200" },
  "AI Insight": { icon: Brain, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200" }
};

const priorityConfig = {
  high: { label: "High Priority", color: "text-red-700", bg: "bg-red-100" },
  medium: { label: "Medium", color: "text-amber-700", bg: "bg-amber-100" },
  normal: { label: "Normal", color: "text-gray-600", bg: "bg-gray-100" }
};

const statusConfig = {
  active: { label: "Active", color: "text-red-700", bg: "bg-red-100" },
  resolved: { label: "Resolved", color: "text-green-700", bg: "bg-green-100" },
  completed: { label: "Completed", color: "text-blue-700", bg: "bg-blue-100" }
};

// AI Knowledge Post Card Component
function AIKnowledgeCard({ post, isExpanded, onToggle }) {
  const contentConfig = aiContentTypeConfig[post.content_type] || aiContentTypeConfig["AI Insight"];
  const ContentIcon = contentConfig.icon;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${contentConfig.border} overflow-hidden transition-all duration-200 hover:shadow-md`}>
      {/* Card Header */}
      <div
        className="p-5 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${contentConfig.bg}`}>
            <ContentIcon className={`w-6 h-6 ${contentConfig.color}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${contentConfig.bg} ${contentConfig.color}`}>
                    <Sparkles className="w-3 h-3" />
                    AI Knowledge
                  </span>
                  <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${contentConfig.bg} ${contentConfig.color}`}>
                    {post.content_type}
                  </span>
                  {post.is_featured && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                      <Star className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900">{post.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.summary}</p>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTimestamp(post.published_at || post.created_at)}
              </span>
              <span className="text-xs text-gray-500">
                {post.source_name}
              </span>
              {post.author && (
                <span className="text-xs text-gray-500">
                  by {post.author}
                </span>
              )}
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {post.view_count || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-gray-100 bg-gray-50">
          <div className="pt-4 space-y-4">
            {/* Key Insights */}
            {post.key_insights && post.key_insights.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  Key Insights
                </h4>
                <ul className="space-y-1">
                  {post.key_insights.map((insight, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-gray-400 mt-1">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Why It Matters */}
            {post.why_it_matters && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  Why It Matters
                </h4>
                <p className="text-sm text-gray-600">{post.why_it_matters}</p>
              </div>
            )}

            {/* Practical Takeaways */}
            {post.practical_takeaways && post.practical_takeaways.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-green-500" />
                  Practical Takeaways
                </h4>
                <ul className="space-y-1">
                  {post.practical_takeaways.map((takeaway, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Source Link */}
            {post.source_url && (
              <div className="pt-2">
                <a
                  href={post.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Read Full Article
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Operational Post Card Component
function OperationalPostCard({ post }) {
  const typeConfig = postTypeConfig[post.type];
  const TypeIcon = typeConfig.icon;
  const priority = priorityConfig[post.priority];
  const status = statusConfig[post.status];

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${typeConfig.border} p-5 hover:shadow-md transition-shadow cursor-pointer`}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${typeConfig.bg}`}>
          <TypeIcon className={`w-6 h-6 ${typeConfig.color}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">{post.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${priority.bg} ${priority.color}`}>
              {priority.label}
            </span>
            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${status.bg} ${status.color}`}>
              {status.label}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTimestamp(post.timestamp)}
            </span>
            <span className="text-xs text-gray-500">
              by {post.author}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostsContent() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [aiPosts, setAiPosts] = useState([]);
  const [feedStats, setFeedStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState(null);

  // Fetch AI knowledge posts
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [postsData, statsData] = await Promise.all([
          getAIKnowledgePosts({ pageSize: 20 }),
          getFeedStats()
        ]);
        setAiPosts(postsData.posts || []);
        setFeedStats(statsData);
      } catch (error) {
        console.error("Error fetching AI knowledge:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter posts
  const filteredOperationalPosts = operationalPosts.filter(post => {
    if (filter === "ai-knowledge") return false;
    const matchesFilter = filter === "all" || filter === "operational" || post.type === filter;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredAiPosts = aiPosts.filter(post => {
    if (filter !== "all" && filter !== "ai-knowledge") return false;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (post.summary && post.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  // Combine and sort posts by timestamp
  const allPosts = [
    ...filteredOperationalPosts.map(p => ({ ...p, postCategory: "operational" })),
    ...filteredAiPosts.map(p => ({ ...p, postCategory: "ai-knowledge" }))
  ].sort((a, b) => {
    const dateA = new Date(a.timestamp || a.published_at || a.created_at);
    const dateB = new Date(b.timestamp || b.published_at || b.created_at);
    return dateB - dateA;
  });

  return (
    <div className="flex min-h-screen bg-dashboard-bg">
      <Sidebar systemHealth={92} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Operational Posts</h1>
                <p className="text-sm text-gray-500 mt-1">
                  System alerts, simulation results, and AI-powered knowledge feed
                </p>
              </div>

              {/* Feed Stats */}
              {feedStats && (
                <div className="flex items-center gap-4 px-4 py-2 bg-white rounded-lg border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-violet-500" />
                    <span className="text-sm text-gray-600">
                      <strong>{feedStats.posts_today || aiPosts.length}</strong> AI insights today
                    </span>
                  </div>
                  <div className="w-px h-4 bg-gray-200"></div>
                  <div className="text-sm text-gray-500">
                    {feedStats.sources_active || 5} sources active
                  </div>
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Type Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Posts</option>
                    <optgroup label="AI Knowledge">
                      <option value="ai-knowledge">AI Knowledge Feed</option>
                    </optgroup>
                    <optgroup label="Operational">
                      <option value="operational">All Operational</option>
                      <option value="alert">Alerts</option>
                      <option value="simulation">Simulations</option>
                      <option value="upload">Uploads</option>
                      <option value="maintenance">Maintenance</option>
                    </optgroup>
                  </select>
                </div>
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {loading ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                  <RefreshCw className="w-8 h-8 text-gray-400 mx-auto mb-4 animate-spin" />
                  <p className="text-sm text-gray-500">Loading posts...</p>
                </div>
              ) : allPosts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No posts found</h3>
                  <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                allPosts.map((post) => (
                  post.postCategory === "ai-knowledge" ? (
                    <AIKnowledgeCard
                      key={`ai-${post.id}`}
                      post={post}
                      isExpanded={expandedPost === `ai-${post.id}`}
                      onToggle={() => setExpandedPost(
                        expandedPost === `ai-${post.id}` ? null : `ai-${post.id}`
                      )}
                    />
                  ) : (
                    <OperationalPostCard
                      key={`op-${post.id}`}
                      post={post}
                    />
                  )
                ))
              )}
            </div>

            {/* Bottom padding for mobile nav */}
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

export default function PostsPage() {
  return (
    <ProtectedRoute>
      <PostsContent />
    </ProtectedRoute>
  );
}
