"use client";

import { ArrowRight } from "lucide-react";

export default function LatestNews({ news = [] }) {
  const defaultNews = [
    {
      id: 1,
      title: "System Deploy 2025",
      description: "We had a new update this week, here you will find information about the latest updates",
      time: "10 min ago",
      image: "/news-1.jpg",
    },
    {
      id: 2,
      title: "New Update of Internal Features",
      description: "We had a new update this week, here you will find information about the latest updates",
      time: "1 hour ago",
      image: "/news-2.jpg",
    },
    {
      id: 3,
      title: "Security Update March 2025",
      description: "We had a new update this week, here you will find information about the latest updates",
      time: "2 hours ago",
      image: "/news-3.jpg",
    },
  ];

  const displayNews = news.length > 0 ? news : defaultNews;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Latest News</h2>
        <button className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1">
          View all
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {displayNews.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
              {item.image ? (
                <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">NEWS</span>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-800 truncate">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {item.description}
              </p>
              <span className="text-xs text-gray-400 mt-2 block">
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
