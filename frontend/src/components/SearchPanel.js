"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  FileText,
  AlertTriangle,
  BarChart2,
  Clock,
  ChevronRight
} from "lucide-react";

export default function SearchPanel({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [category, setCategory] = useState("all");
  const inputRef = useRef(null);

  // Sample data for demonstration
  const sampleData = {
    readings: [
      { id: 1, type: "reading", title: "Temperature Reading - Zone A", date: "2024-01-15 14:30", value: "45.2°C" },
      { id: 2, type: "reading", title: "Pressure Reading - Zone B", date: "2024-01-15 14:25", value: "120.5 bar" },
      { id: 3, type: "reading", title: "Flow Rate - Main Pipeline", date: "2024-01-15 14:20", value: "850 m³/h" },
    ],
    reports: [
      { id: 4, type: "report", title: "Weekly Summary Report", date: "2024-01-14", format: "PDF" },
      { id: 5, type: "report", title: "Compliance Report Q4", date: "2024-01-10", format: "PDF" },
    ],
    alerts: [
      { id: 6, type: "alert", title: "High Risk Alert - Zone A", date: "2024-01-15 12:00", severity: "high" },
      { id: 7, type: "alert", title: "Maintenance Due - Sensor 5", date: "2024-01-14", severity: "medium" },
    ],
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setSearching(true);
    const timer = setTimeout(() => {
      const allItems = [
        ...sampleData.readings,
        ...sampleData.reports,
        ...sampleData.alerts,
      ];

      const filtered = allItems.filter((item) => {
        const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === "all" || item.type === category;
        return matchesQuery && matchesCategory;
      });

      setResults(filtered);
      setSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, category]);

  if (!isOpen) return null;

  const categories = [
    { id: "all", label: "All" },
    { id: "reading", label: "Readings" },
    { id: "report", label: "Reports" },
    { id: "alert", label: "Alerts" },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "reading":
        return <BarChart2 className="w-5 h-5 text-blue-500" />;
      case "report":
        return <FileText className="w-5 h-5 text-green-500" />;
      case "alert":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Panel Container */}
      <div className="min-h-full flex items-start justify-center p-4 pt-20">
        {/* Panel */}
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Search Input */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search readings, reports, or alerts..."
              className="flex-1 bg-white outline-none text-gray-900 placeholder-gray-500"
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            />
            {query && (
              <button onClick={() => setQuery("")} className="p-1 hover:bg-gray-200 rounded-lg">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 mt-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  category === cat.id
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {!query && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Start typing to search</p>
              <p className="text-gray-400 mt-1">
                Search across sensor readings, reports, and system alerts
              </p>
            </div>
          )}

          {query && searching && (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              <p className="mt-3 text-gray-500">Searching...</p>
            </div>
          )}

          {query && !searching && results.length === 0 && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">No results found for "{query}"</p>
              <p className="text-gray-400 mt-1">Try adjusting your search terms</p>
            </div>
          )}

          {query && !searching && results.length > 0 && (
            <div className="p-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  className="w-full p-3 hover:bg-gray-50 rounded-xl flex items-center gap-4 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{result.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-500">{result.date}</span>
                      {result.value && (
                        <span className="text-primary-600 font-medium">{result.value}</span>
                      )}
                      {result.format && (
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">
                          {result.format}
                        </span>
                      )}
                      {result.severity && (
                        <span className={`px-2 py-0.5 rounded font-medium ${
                          result.severity === "high"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {result.severity}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-gray-500">
            Press <kbd className="px-2 py-1 bg-gray-200 rounded font-mono">ESC</kbd> to close
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
