"use client";

import { useMode } from "@/src/contexts/ModeContext";
import { Droplets, Ship, Factory, FileText, Headphones, Shield, Scale } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const { mode } = useMode();

  const currentYear = new Date().getFullYear();
  const appVersion = "2.4.1";

  const footerLinks = {
    resources: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/docs/api" },
      { label: "Release Notes", href: "/releases" },
    ],
    support: [
      { label: "Help Center", href: "/dashboard/support" },
      { label: "Contact Support", href: "/dashboard/contacts" },
      { label: "System Status", href: "/dashboard/support#status" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Data Protection", href: "/data-protection" },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">HydrateWatch</h3>
                <p className="text-xs text-gray-500">Oil & Gas Hydrate Monitoring</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Enterprise-grade real-time hydrate formation monitoring and prediction platform for oil & gas operations.
            </p>
            {/* Environment Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
              mode === 'offshore'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {mode === 'offshore' ? (
                <Ship className="w-4 h-4" />
              ) : (
                <Factory className="w-4 h-4" />
              )}
              <span className="capitalize">{mode} Environment</span>
            </div>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              Resources
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Headphones className="w-4 h-4 text-gray-400" />
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Scale className="w-4 h-4 text-gray-400" />
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              &copy; {currentYear} HydrateWatch. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400">
                Version {appVersion}
              </span>
              <span className="text-xs text-gray-300">|</span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
