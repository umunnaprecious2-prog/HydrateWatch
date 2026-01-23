"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Database, Eye, Lock, Users, Globe, Mail, Calendar } from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 15, 2026";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {/* Title Section */}
          <div className="text-center mb-8 pb-8 border-b border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-500 flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed">
              HydrateWatch ("we", "our", or "us") is committed to protecting your privacy and ensuring the security
              of your data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you use our hydrate monitoring platform and related services.
            </p>
          </section>

          {/* Section 1 */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">1. Information We Collect</h2>
            </div>

            <div className="pl-13 space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">1.1 Account Information</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  When you create an account, we collect your name, email address, organization name, job title,
                  and contact information. This information is necessary to provide you with access to HydrateWatch
                  and to communicate with you about your account.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">1.2 Operational Data</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We collect sensor data, readings, and operational parameters that you upload or input into the
                  platform. This includes temperature readings, pressure measurements, flow rates, and any
                  simulation data you provide. This data is essential for hydrate risk analysis and reporting.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">1.3 Usage Information</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We automatically collect information about how you interact with HydrateWatch, including login
                  times, features used, reports generated, and system preferences. This helps us improve our
                  platform and provide better service.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">1.4 Device Information</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We collect information about the devices you use to access HydrateWatch, including device type,
                  operating system, browser type, IP address, and general location data (country/region level).
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">2. How We Use Your Information</h2>
            </div>

            <div className="pl-13 space-y-3">
              <p className="text-gray-600 text-sm leading-relaxed">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4">
                <li>Provide, maintain, and improve the HydrateWatch platform</li>
                <li>Process and analyze sensor data for hydrate risk assessment</li>
                <li>Generate reports and analytics based on your operational data</li>
                <li>Send you technical alerts, security notifications, and support messages</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Monitor and analyze usage patterns to improve user experience</li>
                <li>Ensure the security and integrity of our platform</li>
                <li>Comply with legal obligations and industry regulations</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">3. Information Sharing</h2>
            </div>

            <div className="pl-13 space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">3.1 Within Your Organization</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Data may be shared with other authorized users within your organization who have been granted
                  access by your organization's administrator.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">3.2 Service Providers</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We work with third-party service providers who assist us in operating our platform, such as
                  cloud hosting providers, analytics services, and customer support tools. These providers are
                  contractually bound to protect your data.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">3.3 Legal Requirements</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We may disclose information if required by law, court order, or governmental regulation, or if
                  we believe disclosure is necessary to protect our rights, your safety, or the safety of others.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Lock className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">4. Data Security</h2>
            </div>

            <div className="pl-13 space-y-3">
              <p className="text-gray-600 text-sm leading-relaxed">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4">
                <li>All data is encrypted in transit using TLS 1.3</li>
                <li>Data at rest is encrypted using AES-256 encryption</li>
                <li>Regular security audits and penetration testing</li>
                <li>Role-based access controls and authentication</li>
                <li>Continuous monitoring for security threats</li>
                <li>Secure data centers with physical access controls</li>
                <li>Regular backups with encrypted storage</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Globe className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">5. Data Retention</h2>
            </div>

            <div className="pl-13 space-y-3">
              <p className="text-gray-600 text-sm leading-relaxed">
                We retain your data for as long as necessary to provide our services and comply with legal obligations:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4">
                <li>Account information: Retained while your account is active and for 90 days after closure</li>
                <li>Sensor data: Retained for 2 years by default, configurable based on your subscription</li>
                <li>Reports: Retained for 5 years or as required by industry regulations</li>
                <li>Audit logs: Retained for 7 years for compliance purposes</li>
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed mt-3">
                You may request deletion of your data at any time by contacting our support team.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">6. Your Rights</h2>
            </div>

            <div className="pl-13 space-y-3">
              <p className="text-gray-600 text-sm leading-relaxed">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Request your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to certain processing of your data</li>
                <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed mt-3">
                To exercise these rights, contact us at privacy@hydratewatch.com.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking</h2>
            <div className="space-y-3">
              <p className="text-gray-600 text-sm leading-relaxed">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4">
                <li><strong>Essential cookies:</strong> Required for platform functionality and security</li>
                <li><strong>Analytics cookies:</strong> Help us understand how users interact with our platform</li>
                <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed mt-3">
                You can manage cookie preferences through your browser settings.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by
              posting the new policy on this page and updating the "Last updated" date. We encourage you to review
              this policy periodically.
            </p>
          </section>

          {/* Contact Section */}
          <section className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-sm">
              <p className="text-gray-700"><strong>HydrateWatch Privacy Team</strong></p>
              <p className="text-gray-600">Email: privacy@hydratewatch.com</p>
              <p className="text-gray-600">Phone: +1 (800) 555-HYDRATE</p>
              <p className="text-gray-600">Address: 1234 Energy Drive, Houston, TX 77001, USA</p>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <Link href="/terms" className="hover:text-primary-600 transition-colors">Terms of Service</Link>
          <span>|</span>
          <Link href="/data-protection" className="hover:text-primary-600 transition-colors">Data Protection</Link>
          <span>|</span>
          <Link href="/dashboard/support" className="hover:text-primary-600 transition-colors">Help Center</Link>
        </div>
      </main>
    </div>
  );
}
