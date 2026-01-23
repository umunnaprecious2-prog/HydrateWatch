"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Demo data for trend chart
const trendDemoData = [
  { month: "Jan", created: 400, completed: 350 },
  { month: "Feb", created: 550, completed: 480 },
  { month: "Mar", created: 420, completed: 390 },
  { month: "Apr", created: 680, completed: 600 },
  { month: "May", created: 520, completed: 470 },
  { month: "Jun", created: 750, completed: 680 },
];

// Demo data for sensor data - more data points for better visualization
const sensorDemoData = [
  { timestamp: new Date(Date.now() - 900000).toISOString(), temperature: 14.8, pressure: 41.2 },
  { timestamp: new Date(Date.now() - 840000).toISOString(), temperature: 15.2, pressure: 42.5 },
  { timestamp: new Date(Date.now() - 780000).toISOString(), temperature: 15.6, pressure: 43.8 },
  { timestamp: new Date(Date.now() - 720000).toISOString(), temperature: 15.8, pressure: 43.1 },
  { timestamp: new Date(Date.now() - 660000).toISOString(), temperature: 15.4, pressure: 42.6 },
  { timestamp: new Date(Date.now() - 600000).toISOString(), temperature: 14.9, pressure: 41.8 },
  { timestamp: new Date(Date.now() - 540000).toISOString(), temperature: 15.1, pressure: 42.2 },
  { timestamp: new Date(Date.now() - 480000).toISOString(), temperature: 16.2, pressure: 44.2 },
  { timestamp: new Date(Date.now() - 420000).toISOString(), temperature: 16.5, pressure: 45.1 },
  { timestamp: new Date(Date.now() - 360000).toISOString(), temperature: 15.5, pressure: 42.9 },
  { timestamp: new Date(Date.now() - 300000).toISOString(), temperature: 15.1, pressure: 42.3 },
  { timestamp: new Date(Date.now() - 240000).toISOString(), temperature: 16.5, pressure: 44.8 },
  { timestamp: new Date(Date.now() - 180000).toISOString(), temperature: 15.7, pressure: 43.5 },
  { timestamp: new Date(Date.now() - 120000).toISOString(), temperature: 15.3, pressure: 42.7 },
  { timestamp: new Date(Date.now() - 60000).toISOString(), temperature: 15.9, pressure: 43.9 },
  { timestamp: new Date().toISOString(), temperature: 15.4, pressure: 42.6 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
        <p className="text-base font-semibold text-gray-800 mb-2 border-b border-gray-100 pb-2">
          {new Date(label).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-3 py-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-gray-600">{entry.name}:</span>
            <span className="font-bold text-gray-900">{Number(entry.value).toFixed(2)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function SensorChart({ data, type = "sensor" }) {
  const hasSensorData = data && data.length > 0;

  if (type === "trend") {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Work Order Trend</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span className="text-base text-gray-500">Created</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-500"></div>
              <span className="text-base text-gray-500">Completed</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={trendDemoData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <defs>
              <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 14, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 14, fontWeight: 500 }}
              tickFormatter={(value) => value >= 1000 ? `${value/1000}k` : value}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="created"
              name="Created"
              stroke="#9CA3AF"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCreated)"
            />
            <Area
              type="monotone"
              dataKey="completed"
              name="Completed"
              stroke="#F59E0B"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCompleted)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Sensor data chart
  const chartData = hasSensorData ? data : sensorDemoData;
  const isDemo = !hasSensorData;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Sensor Trends</h2>
            <p className="text-gray-500 mt-1">Real-time temperature and pressure monitoring</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-base font-medium text-gray-700">Temperature (°C)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-base font-medium text-gray-700">Pressure (bar)</span>
            </div>
          </div>
        </div>
        {isDemo && (
          <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 inline-flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-700 font-medium">Demo data</span>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="p-6">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData} margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorPressure" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
              tick={{ fill: "#374151", fontSize: 14, fontWeight: 500 }}
              dy={10}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="left"
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
              tick={{ fill: "#3B82F6", fontSize: 14, fontWeight: 600 }}
              dx={-10}
              domain={['dataMin - 1', 'dataMax + 1']}
              label={{
                value: '°C',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#3B82F6', fontSize: 16, fontWeight: 600 }
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
              tick={{ fill: "#10B981", fontSize: 14, fontWeight: 600 }}
              dx={10}
              domain={['dataMin - 2', 'dataMax + 2']}
              label={{
                value: 'bar',
                angle: 90,
                position: 'insideRight',
                style: { fill: '#10B981', fontSize: 16, fontWeight: 600 }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              name="Temperature (°C)"
              stroke="#3B82F6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTemp)"
              dot={{ fill: '#3B82F6', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 6, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="pressure"
              name="Pressure (bar)"
              stroke="#10B981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPressure)"
              dot={{ fill: '#10B981', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 6, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer with stats */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-gray-500">Avg Temp</p>
            <p className="text-xl font-bold text-blue-600">
              {(chartData.reduce((sum, d) => sum + d.temperature, 0) / chartData.length).toFixed(2)}°C
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Max Temp</p>
            <p className="text-xl font-bold text-blue-600">
              {Math.max(...chartData.map(d => d.temperature)).toFixed(2)}°C
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Avg Pressure</p>
            <p className="text-xl font-bold text-green-600">
              {(chartData.reduce((sum, d) => sum + d.pressure, 0) / chartData.length).toFixed(2)} bar
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Max Pressure</p>
            <p className="text-xl font-bold text-green-600">
              {Math.max(...chartData.map(d => d.pressure)).toFixed(2)} bar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
