"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function SystemScore({ score = 81, title = "System Efficiency Score" }) {
  const data = [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score },
  ];

  const getScoreColor = (value) => {
    if (value >= 81) return "#10B981"; // Green - Positive
    if (value >= 61) return "#F59E0B"; // Yellow - Neutral
    return "#EF4444"; // Red - Negative
  };

  const getScoreLabel = (value) => {
    if (value >= 81) return "Positive";
    if (value >= 61) return "Neutral";
    return "Negative";
  };

  const scoreColor = getScoreColor(score);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>

      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={90}
                endAngle={-270}
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                strokeWidth={0}
              >
                <Cell fill={scoreColor} />
                <Cell fill="#E5E7EB" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-gray-900">{score}</span>
            <span className="text-lg text-gray-400">/100</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs text-gray-500">&lt;60 Negative</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-xs text-gray-500">61-80 Neutral</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-500">81-100 Positive</span>
        </div>
      </div>

      {/* Current Status */}
      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <span className="text-sm text-gray-500">Current Status: </span>
        <span
          className="text-sm font-semibold"
          style={{ color: scoreColor }}
        >
          {getScoreLabel(score)}
        </span>
      </div>
    </div>
  );
}
