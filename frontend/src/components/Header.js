"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { useMode } from "@/src/contexts/ModeContext";
import { useRouter } from "next/navigation";
import {
  Search,
  HelpCircle,
  Bell,
  ChevronLeft,
  ChevronRight,
  Plus,
  FileBarChart,
  Calendar,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Ship,
  Factory,
  Check
} from "lucide-react";
import AddReadingModal from "./AddReadingModal";
import GenerateReportModal from "./GenerateReportModal";
import SearchPanel from "./SearchPanel";
import HelpPanel from "./HelpPanel";

export default function Header({ onDataRefresh }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddReading, setShowAddReading] = useState(false);
  const [showGenerateReport, setShowGenerateReport] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const { user, logout } = useAuth();
  const { mode } = useMode();
  const router = useRouter();

  const [notifications, setNotifications] = useState([
    { id: 1, title: "High Risk Alert", message: "Hydrate risk exceeded 70% in Zone A", time: "5 min ago", type: "danger", read: false },
    { id: 2, title: "Sensor Update", message: "Temperature sensor calibration complete", time: "1 hour ago", type: "success", read: false },
    { id: 3, title: "Maintenance Due", message: "Scheduled maintenance in 3 days", time: "2 hours ago", type: "warning", read: true },
    { id: 4, title: "Simulation Complete", message: "Offshore simulation finished successfully", time: "3 hours ago", type: "success", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatMonth = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('[data-dropdown]')) {
        setShowUserMenu(false);
        setShowNotifications(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
        setShowHelp(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Date Navigation & System Context */}
          <div className="flex items-center gap-4">
            {/* Date Navigator */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="Previous month"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5">
                <Calendar className="w-5 h-5 text-primary-500" />
                <span className="text-base font-medium text-gray-700 min-w-[140px] text-center">
                  {formatMonth(currentDate)}
                </span>
              </div>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="Next month"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Mode Indicator */}
            <div className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border ${
              mode === 'offshore'
                ? 'bg-blue-50 border-blue-200'
                : 'bg-green-50 border-green-200'
            }`}>
              {mode === 'offshore' ? (
                <Ship className="w-4 h-4 text-blue-600" />
              ) : (
                <Factory className="w-4 h-4 text-green-600" />
              )}
              <span className={`text-sm font-medium capitalize ${
                mode === 'offshore' ? 'text-blue-700' : 'text-green-700'
              }`}>
                {mode}
              </span>
            </div>
          </div>

          {/* Center Section - Primary Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddReading(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Reading</span>
            </button>
            <button
              onClick={() => setShowGenerateReport(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-300 hover:border-primary-400 hover:bg-primary-50 text-gray-700 rounded-xl font-medium transition-all"
            >
              <FileBarChart className="w-5 h-5" />
              <span className="hidden sm:inline">Generate Report</span>
            </button>
          </div>

          {/* Right Section - Search, Help, Notifications, User */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-2"
              title="Search (Ctrl+K)"
            >
              <Search className="w-5 h-5 text-gray-500" />
              <span className="hidden lg:inline text-gray-400 text-sm">Ctrl+K</span>
            </button>

            {/* Help */}
            <button
              onClick={() => setShowHelp(true)}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
              title="Help"
            >
              <HelpCircle className="w-5 h-5 text-gray-500" />
            </button>

            {/* Notifications */}
            <div className="relative" data-dropdown>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-500" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-medium">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-primary-500 hover:text-primary-600 font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        className={`p-4 hover:bg-gray-50 border-b border-gray-100 last:border-0 cursor-pointer transition-colors ${
                          !notif.read ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-3 h-3 mt-1.5 rounded-full flex-shrink-0 ${
                            notif.type === 'danger' ? 'bg-red-500' :
                            notif.type === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                          }`}></div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <p className="font-medium text-gray-900">{notif.title}</p>
                              {!notif.read && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </div>
                            <p className="text-gray-600 mt-0.5">{notif.message}</p>
                            <p className="text-gray-400 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-gray-100">
                    <button className="text-primary-500 hover:text-primary-600 font-medium w-full text-center">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-200 mx-1"></div>

            {/* User Profile */}
            <div className="relative" data-dropdown>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-3 hover:bg-gray-100 rounded-xl p-2 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold shadow-sm">
                  {user?.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <div className="text-left hidden md:block">
                  <p className="font-medium text-gray-900">
                    {user?.name || "User"}
                  </p>
                  <p className="text-gray-500">Administrator</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  {/* User Info */}
                  <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                        {user?.name ? user.name[0].toUpperCase() : "U"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user?.name || "User"}</p>
                        <p className="text-gray-500">{user?.email || "user@example.com"}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-lg font-medium">
                        Administrator
                      </span>
                      <span className={`px-2 py-1 rounded-lg font-medium ${
                        mode === 'offshore'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {mode === 'offshore' ? 'Offshore' : 'Onshore'}
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        router.push('/dashboard/settings');
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <User className="w-5 h-5" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        router.push('/dashboard/settings');
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                      Settings
                    </button>
                    <div className="my-1 border-t border-gray-100"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <AddReadingModal isOpen={showAddReading} onClose={() => setShowAddReading(false)} onSuccess={onDataRefresh} />
      <GenerateReportModal isOpen={showGenerateReport} onClose={() => setShowGenerateReport(false)} />
      <SearchPanel isOpen={showSearch} onClose={() => setShowSearch(false)} />
      <HelpPanel isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </>
  );
}
