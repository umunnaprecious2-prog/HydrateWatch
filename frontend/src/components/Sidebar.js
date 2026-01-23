"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  Activity,
  FileText,
  Settings,
  HelpCircle,
  Droplets,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function Sidebar({ systemHealth = 92 }) {
  const pathname = usePathname();

  const mainNavItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/dashboard/posts", label: "Posts", icon: FileText },
    { href: "/dashboard/tracking", label: "Sensor Tracking", icon: Activity },
    { href: "/dashboard/reports", label: "Reporting", icon: LayoutDashboard },
  ];

  const bottomNavItems = [
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
    { href: "/dashboard/support", label: "Support", icon: HelpCircle },
  ];

  const getHealthStatus = (health) => {
    if (health >= 80) return { label: "Normal", color: "text-green-400", bgColor: "bg-green-400" };
    if (health >= 60) return { label: "Warning", color: "text-yellow-400", bgColor: "bg-yellow-400" };
    return { label: "Critical", color: "text-red-400", bgColor: "bg-red-400" };
  };

  const healthStatus = getHealthStatus(systemHealth);

  return (
    <nav className="bg-sidebar-dark border-r border-sidebar-border w-64 min-h-screen flex-col hidden lg:flex">
      {/* Logo Section */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">HydrateWatch</h1>
            <p className="text-xs text-gray-400">Oil & Gas Monitoring</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 p-4">
        <ul className="space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/dashboard");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                      : "text-gray-400 hover:bg-sidebar-light hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Divider */}
        <div className="my-6 border-t border-sidebar-border"></div>

        {/* Bottom Navigation */}
        <ul className="space-y-1">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                      : "text-gray-400 hover:bg-sidebar-light hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* System Health Widget */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white">System Health</span>
            <div className="flex items-center gap-1">
              {systemHealth >= 80 ? (
                <CheckCircle2 className={`w-4 h-4 ${healthStatus.color}`} />
              ) : (
                <AlertCircle className={`w-4 h-4 ${healthStatus.color}`} />
              )}
              <span className={`text-xs font-medium ${healthStatus.color}`}>
                {healthStatus.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs text-gray-400">Uptime % This Month</span>
            <span className="text-sm font-bold text-white ml-auto">{systemHealth}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-sidebar-light rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${healthStatus.bgColor}`}
              style={{ width: `${systemHealth}%` }}
            ></div>
          </div>

          <div className="mt-3 pt-3 border-t border-sidebar-border">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Last Check</span>
              <span>Just now</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Next Maintenance</span>
              <span>In 7 days</span>
            </div>
          </div>

          <button className="w-full mt-3 px-3 py-2 bg-sidebar-light hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
            <Activity className="w-4 h-4" />
            Check Health
          </button>
        </div>
      </div>
    </nav>
  );
}
