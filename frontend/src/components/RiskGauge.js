"use client";

export default function RiskGauge({ risk }) {
  const riskValue = risk || 0;

  const COLORS = {
    low: "#10b981",
    medium: "#f59e0b",
    high: "#ef4444",
  };

  const getRiskLevel = (value) => {
    if (value > 70) return "high";
    if (value > 40) return "medium";
    return "low";
  };

  const riskLevel = getRiskLevel(riskValue);
  const riskColor = COLORS[riskLevel];

  // Calculate needle rotation angle
  // 0% = -90deg (left), 100% = 90deg (right)
  const needleAngle = -90 + (riskValue * 180) / 100;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Hydrate Risk Level</h2>

      <div className="relative flex flex-col items-center">
        {/* Gauge SVG */}
        <svg viewBox="0 0 200 120" className="w-full max-w-[280px]">
          {/* Background arc (gray) */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Green zone (0-40%) */}
          <path
            d="M 20 100 A 80 80 0 0 1 52.9 34.5"
            fill="none"
            stroke="#10B981"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Yellow zone (40-70%) */}
          <path
            d="M 52.9 34.5 A 80 80 0 0 1 127 27.2"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="16"
          />

          {/* Red zone (70-100%) */}
          <path
            d="M 127 27.2 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#EF4444"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Needle */}
          <g transform={`rotate(${needleAngle}, 100, 100)`}>
            {/* Needle body */}
            <polygon
              points="100,30 95,100 100,105 105,100"
              fill={riskColor}
            />
            {/* Needle circle center */}
            <circle cx="100" cy="100" r="8" fill={riskColor} />
            <circle cx="100" cy="100" r="4" fill="white" />
          </g>

          {/* Scale labels */}
          <text x="15" y="115" fontSize="10" fill="#6B7280" textAnchor="start">0</text>
          <text x="50" y="35" fontSize="10" fill="#6B7280" textAnchor="middle">40</text>
          <text x="130" y="30" fontSize="10" fill="#6B7280" textAnchor="middle">70</text>
          <text x="185" y="115" fontSize="10" fill="#6B7280" textAnchor="end">100</text>
        </svg>

        {/* Value Display */}
        <div className="text-center mt-2">
          <p className="text-4xl font-bold" style={{ color: riskColor }}>
            {Number(riskValue).toFixed(2)}%
          </p>
          <p className="text-sm text-gray-500 uppercase mt-1 font-medium">
            {riskLevel} Risk
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-100 w-full">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-500">Low (0-40)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-gray-500">Medium (40-70)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-500">High (70+)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
