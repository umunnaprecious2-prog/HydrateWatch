"use client";

import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Scale, Users, Ban, Gavel, Calendar } from "lucide-react";

export default function TermsOfServicePage() {
  const lastUpdated = "January 15, 2026";
  const effectiveDate = "January 1, 2026";

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
              <Scale className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <div className="text-gray-500 text-sm space-y-1">
              <p className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Last updated: {lastUpdated}
              </p>
              <p>Effective Date: {effectiveDate}</p>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed">
              Welcome to HydrateWatch. These Terms of Service ("Terms") govern your access to and use of the
              HydrateWatch platform, including our website, applications, APIs, and related services (collectively,
              the "Service"). By accessing or using the Service, you agree to be bound by these Terms.
            </p>
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> Please read these Terms carefully before using HydrateWatch. If you do not
                  agree with any part of these Terms, you may not access or use the Service.
                </p>
              </div>
            </div>
          </section>

          {/* Section 1 */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">1. Service Description</h2>
            </div>

            <div className="pl-13 space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                HydrateWatch is an enterprise platform designed for real-time hydrate formation monitoring and
                prediction in oil and gas operations. The Service provides:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4">
                <li>Real-time sensor data monitoring and visualization</li>
                <li>Hydrate risk assessment and prediction algorithms</li>
                <li>Simulation capabilities for operational planning</li>
                <li>Report generation and data export functionality</li>
                <li>Alert and notification systems</li>
                <li>API access for system integration</li>
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed mt-3">
                The Service is intended for use by qualified professionals in the oil and gas industry. HydrateWatch
                provides analytical tools and insights but does not replace professional engineering judgment.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">2. Account Terms</h2>
            </div>

            <div className="pl-13 space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">2.1 Account Creation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To use HydrateWatch, you must create an account and provide accurate, complete information. You are
                  responsible for maintaining the confidentiality of your account credentials and for all activities
                  that occur under your account.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">2.2 Account Requirements</h3>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>You must provide a valid business email address</li>
                  <li>You must have authorization from your organization to use the Service</li>
                  <li>You may not share account credentials with unauthorized persons</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">2.3 Account Security</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You must notify us immediately of any unauthorized use of your account or any other security breach.
                  We recommend using strong passwords and enabling two-factor authentication when available.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">3. Acceptable Use</h2>
            </div>

            <div className="pl-13 space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                When using HydrateWatch, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4">
                <li>Use the Service only for lawful purposes and in accordance with these Terms</li>
                <li>Provide accurate sensor data and operational information</li>
                <li>Maintain appropriate access controls within your organization</li>
                <li>Comply with all applicable laws, regulations, and industry standards</li>
                <li>Respect the intellectual property rights of HydrateWatch and third parties</li>
                <li>Report any bugs, vulnerabilities, or issues you discover</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Ban className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">4. Prohibited Activities</h2>
            </div>

            <div className="pl-13 space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                You agree NOT to:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4">
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Use the Service to transmit malware or malicious code</li>
                <li>Interfere with or disrupt the integrity or performance of the Service</li>
                <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                <li>Use automated tools to scrape or extract data from the Service</li>
                <li>Resell, sublicense, or redistribute the Service without authorization</li>
                <li>Upload false, misleading, or fraudulent data</li>
                <li>Use the Service in any way that violates applicable laws or regulations</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Data Ownership and Rights</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">5.1 Your Data</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You retain all rights to the data you upload to HydrateWatch ("Your Data"). By uploading data,
                  you grant us a limited license to process, store, and display Your Data solely to provide the Service.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">5.2 Our Intellectual Property</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The Service, including all software, algorithms, designs, and documentation, is owned by HydrateWatch
                  and protected by intellectual property laws. You are granted a limited, non-exclusive,
                  non-transferable license to use the Service in accordance with these Terms.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">5.3 Feedback</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  If you provide feedback, suggestions, or ideas about the Service, you grant us the right to use
                  this feedback without obligation or compensation to you.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Service Availability and Support</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">6.1 Availability</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We strive to maintain 99.9% uptime for the Service. However, we do not guarantee uninterrupted access.
                  Scheduled maintenance will be communicated in advance when possible. Emergency maintenance may occur
                  without notice.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">6.2 Support</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Support is available through our Help Center, email, and phone during business hours. Critical issues
                  affecting production operations receive priority response. Support levels vary based on your
                  subscription tier.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Fees and Payment</h2>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                Use of HydrateWatch requires a valid subscription. Fees are billed according to your subscription plan:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4">
                <li>Payment is due in advance on a monthly or annual basis</li>
                <li>Prices are subject to change with 30 days notice</li>
                <li>Overdue payments may result in service suspension</li>
                <li>Refunds are provided in accordance with our refund policy</li>
                <li>All fees are exclusive of taxes unless stated otherwise</li>
              </ul>
            </div>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Disclaimers</h2>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-600 text-sm leading-relaxed">
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                HYDRATEWATCH DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mt-3">
                Risk assessments and predictions provided by HydrateWatch are based on the data provided and our
                algorithms. These should be used as one input among many in operational decision-making and do not
                replace professional engineering judgment or industry best practices.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-600 text-sm leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, HYDRATEWATCH SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
                DIRECTLY OR INDIRECTLY.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mt-3">
                Our total liability for any claims arising from or related to the Service shall not exceed the
                amount you paid us in the twelve (12) months preceding the claim.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Termination</h2>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                Either party may terminate these Terms:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4">
                <li>You may cancel your subscription at any time through your account settings</li>
                <li>We may suspend or terminate your access for violation of these Terms</li>
                <li>We may discontinue the Service with 90 days notice</li>
                <li>Upon termination, you may export your data for 30 days</li>
              </ul>
            </div>
          </section>

          {/* Section 11 */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Gavel className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">11. Governing Law and Disputes</h2>
            </div>

            <div className="pl-13 space-y-3">
              <p className="text-gray-600 text-sm leading-relaxed">
                These Terms shall be governed by the laws of the State of Texas, USA, without regard to conflict
                of law principles. Any disputes arising from these Terms shall be resolved through binding
                arbitration in Houston, Texas, except where prohibited by law.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We may modify these Terms at any time. Material changes will be notified via email or through the
              Service at least 30 days before they take effect. Continued use of the Service after changes take
              effect constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Contact Section */}
          <section className="mt-8 pt-8 border-t border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              For questions about these Terms of Service:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-sm">
              <p className="text-gray-700"><strong>HydrateWatch Legal Department</strong></p>
              <p className="text-gray-600">Email: legal@hydratewatch.com</p>
              <p className="text-gray-600">Phone: +1 (800) 555-HYDRATE</p>
              <p className="text-gray-600">Address: 1234 Energy Drive, Houston, TX 77001, USA</p>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-primary-600 transition-colors">Privacy Policy</Link>
          <span>|</span>
          <Link href="/data-protection" className="hover:text-primary-600 transition-colors">Data Protection</Link>
          <span>|</span>
          <Link href="/dashboard/support" className="hover:text-primary-600 transition-colors">Help Center</Link>
        </div>
      </main>
    </div>
  );
}
