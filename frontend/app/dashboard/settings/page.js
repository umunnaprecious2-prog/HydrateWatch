"use client";

import { useState } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { useMode } from "@/src/contexts/ModeContext";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import Sidebar from "@/src/components/Sidebar";
import Header from "@/src/components/Header";
import BottomNav from "@/src/components/BottomNav";
import Footer from "@/src/components/Footer";
import {
  User,
  Bell,
  Settings,
  Shield,
  Palette,
  Ship,
  Factory,
  Mail,
  Phone,
  Building2,
  Save,
  CheckCircle,
  AlertTriangle,
  Monitor,
  Moon,
  Sun,
  Globe,
  Clock,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronRight,
  Info,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

// Collapsible Section Component
function CollapsibleSection({
  title,
  description,
  icon: Icon,
  iconBg,
  iconColor,
  children,
  isExpanded,
  onToggle,
  saveStatus,
  sectionKey,
  onSave
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Section Header - Always Visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isExpanded && saveStatus === sectionKey && (
            <span className="flex items-center gap-1 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              Saved
            </span>
          )}
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400 transition-transform duration-200" />
          )}
        </div>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <div className="pt-6">
            {children}
          </div>

          {/* Save Button */}
          {onSave && (
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => onSave(sectionKey)}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                {saveStatus === sectionKey ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SettingsContent() {
  const { user } = useAuth();
  const { mode, setMode } = useMode();

  // Expanded sections state
  const [expandedSections, setExpandedSections] = useState(["profile"]);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Profile settings state
  const [profile, setProfile] = useState({
    name: user?.name || "Operator",
    email: user?.email || "operator@hydratewatch.com",
    phone: "+234 800 123 4567",
    organization: "Nigerian National Petroleum Corporation",
    role: "Operations Engineer"
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Notification settings state
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    highRiskAlerts: true,
    moderateRiskAlerts: true,
    systemUpdates: true,
    maintenanceReminders: true,
    weeklyReports: true
  });

  // System preferences state
  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "en",
    timezone: "Africa/Lagos",
    temperatureUnit: "celsius",
    pressureUnit: "bar",
    soundEffects: true,
    autoRefresh: true,
    refreshInterval: 5
  });

  const [saveStatus, setSaveStatus] = useState(null);

  const handleSave = (section) => {
    setSaveStatus(section);
    setTimeout(() => setSaveStatus(null), 2000);
  };

  const handlePasswordChange = () => {
    setPasswordError("");
    setPasswordSuccess(false);

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError("All password fields are required");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    // Simulate password change
    setPasswordSuccess(true);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const timezones = [
    { value: "Africa/Lagos", label: "West Africa Time (WAT) - Lagos" },
    { value: "UTC", label: "Coordinated Universal Time (UTC)" },
    { value: "America/Houston", label: "Central Time (CT) - Houston" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT) - London" },
    { value: "Asia/Singapore", label: "Singapore Time (SGT)" }
  ];

  return (
    <div className="flex min-h-screen bg-dashboard-bg">
      <Sidebar systemHealth={92} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-4 max-w-4xl">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your profile, notifications, and system preferences. Click any section to expand.
              </p>
            </div>

            {/* Tip Banner */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Click on any section header to expand or collapse it. Your changes are saved per section.
              </p>
            </div>

            {/* Profile Settings */}
            <CollapsibleSection
              title="Profile Settings"
              description="Your personal and contact information"
              icon={User}
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
              isExpanded={expandedSections.includes("profile")}
              onToggle={() => toggleSection("profile")}
              saveStatus={saveStatus}
              sectionKey="profile"
              onSave={handleSave}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={profile.organization}
                      onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  />
                </div>
              </div>
            </CollapsibleSection>

            {/* Account Security / Change Password */}
            <CollapsibleSection
              title="Account Security"
              description="Change your password and security settings"
              icon={Lock}
              iconBg="bg-red-100"
              iconColor="text-red-600"
              isExpanded={expandedSections.includes("security")}
              onToggle={() => toggleSection("security")}
              saveStatus={saveStatus}
              sectionKey="security"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="Enter new password"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    />
                  </div>
                </div>

                {passwordError && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <p className="text-sm text-red-700">{passwordError}</p>
                  </div>
                )}

                {passwordSuccess && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <p className="text-sm text-green-700">Password changed successfully!</p>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={handlePasswordChange}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    <Lock className="w-4 h-4" />
                    Change Password
                  </button>
                </div>

                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters long. Use a combination of letters, numbers, and symbols for better security.
                </p>
              </div>
            </CollapsibleSection>

            {/* Mode Defaults */}
            <CollapsibleSection
              title="Default Operating Mode"
              description="Set your preferred monitoring environment"
              icon={Settings}
              iconBg="bg-green-100"
              iconColor="text-green-600"
              isExpanded={expandedSections.includes("mode")}
              onToggle={() => toggleSection("mode")}
              saveStatus={saveStatus}
              sectionKey="mode"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setMode('offshore')}
                  className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                    mode === 'offshore'
                      ? 'bg-blue-50 border-blue-500 shadow-sm'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {mode === 'offshore' && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      mode === 'offshore' ? 'bg-blue-100' : 'bg-gray-200'
                    }`}>
                      <Ship className={`w-5 h-5 ${mode === 'offshore' ? 'text-blue-600' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${mode === 'offshore' ? 'text-gray-900' : 'text-gray-700'}`}>
                        Offshore Mode
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        High-pressure, low-temperature subsea monitoring
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setMode('onshore')}
                  className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                    mode === 'onshore'
                      ? 'bg-green-50 border-green-500 shadow-sm'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {mode === 'onshore' && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      mode === 'onshore' ? 'bg-green-100' : 'bg-gray-200'
                    }`}>
                      <Factory className={`w-5 h-5 ${mode === 'onshore' ? 'text-green-600' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${mode === 'onshore' ? 'text-gray-900' : 'text-gray-700'}`}>
                        Onshore Mode
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Ambient temperature with flow control
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </CollapsibleSection>

            {/* Notification Preferences */}
            <CollapsibleSection
              title="Notification Preferences"
              description="Configure how you receive alerts and updates"
              icon={Bell}
              iconBg="bg-amber-100"
              iconColor="text-amber-600"
              isExpanded={expandedSections.includes("notifications")}
              onToggle={() => toggleSection("notifications")}
              saveStatus={saveStatus}
              sectionKey="notifications"
              onSave={handleSave}
            >
              <div className="space-y-6">
                {/* Delivery Methods */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Delivery Methods
                  </h4>
                  <div className="space-y-2">
                    {[
                      { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive alerts via email' },
                      { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Receive critical alerts via SMS' },
                      { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' }
                    ].map((item) => (
                      <label key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <div>
                          <span className="text-sm font-medium text-gray-700">{item.label}</span>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={notifications[item.key]}
                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-500 transition-colors"></div>
                          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Alert Types */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Alert Types
                  </h4>
                  <div className="space-y-2">
                    {[
                      { key: 'highRiskAlerts', label: 'High Risk Alerts', desc: 'Critical hydrate risk warnings' },
                      { key: 'moderateRiskAlerts', label: 'Moderate Risk Alerts', desc: 'Warning level notifications' },
                      { key: 'systemUpdates', label: 'System Updates', desc: 'Platform updates and changes' },
                      { key: 'maintenanceReminders', label: 'Maintenance Reminders', desc: 'Scheduled maintenance alerts' },
                      { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Automated weekly summaries' }
                    ].map((item) => (
                      <label key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <div>
                          <span className="text-sm font-medium text-gray-700">{item.label}</span>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={notifications[item.key]}
                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-500 transition-colors"></div>
                          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            {/* System Preferences */}
            <CollapsibleSection
              title="System Preferences"
              description="Customize your application experience"
              icon={Palette}
              iconBg="bg-purple-100"
              iconColor="text-purple-600"
              isExpanded={expandedSections.includes("preferences")}
              onToggle={() => toggleSection("preferences")}
              saveStatus={saveStatus}
              sectionKey="preferences"
              onSave={handleSave}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'light', label: 'Light', icon: Sun },
                      { value: 'dark', label: 'Dark', icon: Moon },
                      { value: 'system', label: 'System', icon: Monitor }
                    ].map((theme) => {
                      const Icon = theme.icon;
                      return (
                        <button
                          key={theme.value}
                          onClick={() => setPreferences({ ...preferences, theme: theme.value })}
                          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                            preferences.theme === theme.value
                              ? 'bg-primary-50 border-primary-500 text-primary-700'
                              : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{theme.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      value={preferences.timezone}
                      onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none text-gray-900 bg-white"
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    >
                      {timezones.map((tz) => (
                        <option key={tz.value} value={tz.value}>{tz.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Unit</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'celsius', label: '°C (Celsius)' },
                      { value: 'fahrenheit', label: '°F (Fahrenheit)' }
                    ].map((unit) => (
                      <button
                        key={unit.value}
                        onClick={() => setPreferences({ ...preferences, temperatureUnit: unit.value })}
                        className={`flex-1 px-3 py-2 rounded-lg border text-sm transition-colors ${
                          preferences.temperatureUnit === unit.value
                            ? 'bg-primary-50 border-primary-500 text-primary-700'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {unit.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pressure Unit</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'bar', label: 'bar' },
                      { value: 'psi', label: 'psi' },
                      { value: 'kpa', label: 'kPa' }
                    ].map((unit) => (
                      <button
                        key={unit.value}
                        onClick={() => setPreferences({ ...preferences, pressureUnit: unit.value })}
                        className={`flex-1 px-3 py-2 rounded-lg border text-sm transition-colors ${
                          preferences.pressureUnit === unit.value
                            ? 'bg-primary-50 border-primary-500 text-primary-700'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {unit.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      {preferences.soundEffects ? (
                        <Volume2 className="w-5 h-5 text-gray-600" />
                      ) : (
                        <VolumeX className="w-5 h-5 text-gray-400" />
                      )}
                      <div>
                        <span className="text-sm font-medium text-gray-700">Sound Effects</span>
                        <p className="text-xs text-gray-500">Play sounds for alerts</p>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={preferences.soundEffects}
                        onChange={(e) => setPreferences({ ...preferences, soundEffects: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-500 transition-colors"></div>
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-600" />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Auto Refresh</span>
                        <p className="text-xs text-gray-500">Automatically update data</p>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={preferences.autoRefresh}
                        onChange={(e) => setPreferences({ ...preferences, autoRefresh: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-500 transition-colors"></div>
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
                    </div>
                  </label>
                </div>
              </div>
            </CollapsibleSection>

            {/* Footer spacing for mobile */}
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

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}
