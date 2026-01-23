"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Server, Globe, Lock, FileCheck, AlertTriangle, CheckCircle, Database, Calendar } from "lucide-react";

export default function DataProtectionPage() {
  const lastUpdated = "January 15, 2026";

  const complianceStandards = [
    { name: "ISO 27001", status: "Certified", description: "Information Security Management" },
    { name: "SOC 2 Type II", status: "Certified", description: "Security, Availability, Confidentiality" },
    { name: "GDPR", status: "Compliant", description: "EU Data Protection Regulation" },
    { name: "API 754", status: "Aligned", description: "Process Safety Performance Indicators" },
  ];

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Protection</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              How HydrateWatch protects your operational data with enterprise-grade security
            </p>
            <p className="text-gray-500 flex items-center justify-center gap-2 mt-3 text-sm">
              <Calendar className="w-4 h-4" />
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Compliance Certifications */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Compliance & Certifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {complianceStandards.map((standard) => (
                <div key={standard.name} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{standard.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      standard.status === "Certified"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {standard.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{standard.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Data Security Overview */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Data Security Measures</h2>
            </div>

            <div className="space-y-6 pl-13">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Encryption</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>In Transit:</strong> All data transmitted between your devices and our servers is encrypted using TLS 1.3 with perfect forward secrecy.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>At Rest:</strong> All stored data is encrypted using AES-256 encryption. Encryption keys are managed using hardware security modules (HSMs).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Backups:</strong> All backup data is encrypted using the same standards and stored in geographically separate locations.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Access Control</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Authentication:</strong> Multi-factor authentication (MFA) available for all accounts. SSO integration supported via SAML 2.0 and OAuth 2.0.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Authorization:</strong> Role-based access control (RBAC) with granular permissions. Administrators can define custom roles.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Session Management:</strong> Automatic session timeout, concurrent session limits, and secure session handling.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Network Security</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Firewalls:</strong> Web application firewalls (WAF) protect against common attacks including SQL injection, XSS, and DDoS.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Monitoring:</strong> 24/7 security monitoring with automated threat detection and incident response.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Penetration Testing:</strong> Regular third-party penetration testing and vulnerability assessments.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Infrastructure */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Server className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Infrastructure Security</h2>
            </div>

            <div className="space-y-4 pl-13">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Data Centers</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  HydrateWatch is hosted in enterprise-grade data centers with:
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4 mt-2">
                  <li>SOC 2 Type II certified facilities</li>
                  <li>24/7/365 physical security with biometric access</li>
                  <li>Redundant power, cooling, and network connectivity</li>
                  <li>Fire suppression and environmental controls</li>
                  <li>Geographic redundancy across multiple regions</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Disaster Recovery</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our disaster recovery program ensures business continuity:
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4 mt-2">
                  <li>Recovery Time Objective (RTO): 4 hours</li>
                  <li>Recovery Point Objective (RPO): 1 hour</li>
                  <li>Automated failover to secondary data center</li>
                  <li>Regular disaster recovery testing and drills</li>
                  <li>Documented business continuity procedures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Handling */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Database className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Data Handling Practices</h2>
            </div>

            <div className="space-y-4 pl-13">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Data Classification</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  We classify data based on sensitivity to apply appropriate protection measures:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <span className="font-medium text-red-800 text-sm">Confidential</span>
                    <p className="text-red-700 text-xs mt-1">Credentials, API keys, personal data</p>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <span className="font-medium text-amber-800 text-sm">Sensitive</span>
                    <p className="text-amber-700 text-xs mt-1">Sensor data, operational readings</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="font-medium text-blue-800 text-sm">Internal</span>
                    <p className="text-blue-700 text-xs mt-1">Reports, configurations, logs</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="font-medium text-green-800 text-sm">Public</span>
                    <p className="text-green-700 text-xs mt-1">Documentation, release notes</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Data Isolation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Each customer's data is logically isolated using tenant-specific encryption keys and database
                  segregation. Your data is never commingled with other customers' data, and access is strictly
                  controlled through our authorization system.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Data Retention & Deletion</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Data retention periods are configurable based on your requirements. When data is deleted:
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4 mt-2">
                  <li>Active data is removed from production systems within 30 days</li>
                  <li>Backup copies are purged within 90 days</li>
                  <li>Deletion certificates are available upon request</li>
                  <li>Cryptographic erasure ensures data is unrecoverable</li>
                </ul>
              </div>
            </div>
          </section>

          {/* International Data Transfers */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                <Globe className="w-5 h-5 text-cyan-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">International Data Transfers</h2>
            </div>

            <div className="pl-13 space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                For customers operating internationally, we ensure compliant data transfers:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4">
                <li><strong>EU-US Data Privacy Framework:</strong> We participate in the framework for EU data transfers</li>
                <li><strong>Standard Contractual Clauses:</strong> Available for customers requiring additional safeguards</li>
                <li><strong>Data Residency Options:</strong> Regional data storage available for EU, US, and Asia-Pacific</li>
                <li><strong>UK GDPR Compliance:</strong> Post-Brexit compliance with UK data protection laws</li>
              </ul>
            </div>
          </section>

          {/* Audit & Monitoring */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Audit & Monitoring</h2>
            </div>

            <div className="pl-13 space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Audit Logs</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Comprehensive audit logging captures all significant activities:
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4 mt-2">
                  <li>User authentication events (login, logout, failed attempts)</li>
                  <li>Data access and modification events</li>
                  <li>Configuration changes and administrative actions</li>
                  <li>API access and integration events</li>
                </ul>
                <p className="text-gray-600 text-sm leading-relaxed mt-3">
                  Audit logs are retained for 7 years and are available for export. Logs are tamper-evident
                  and protected against unauthorized modification.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Security Monitoring</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our Security Operations Center (SOC) provides continuous monitoring:
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4 mt-2">
                  <li>24/7 security event monitoring and analysis</li>
                  <li>Automated threat detection and alerting</li>
                  <li>Incident response procedures with defined SLAs</li>
                  <li>Regular security assessments and reviews</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Incident Response */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Security Incident Response</h2>
            </div>

            <div className="pl-13 space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                We maintain a documented incident response plan:
              </p>

              <div className="bg-gray-50 rounded-lg p-4">
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-medium">1</span>
                    <div>
                      <span className="font-medium text-gray-800">Detection & Analysis</span>
                      <p className="text-gray-600 text-xs mt-1">Automated detection with immediate analysis by security team</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-medium">2</span>
                    <div>
                      <span className="font-medium text-gray-800">Containment</span>
                      <p className="text-gray-600 text-xs mt-1">Rapid containment to prevent further impact</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-medium">3</span>
                    <div>
                      <span className="font-medium text-gray-800">Notification</span>
                      <p className="text-gray-600 text-xs mt-1">Customer notification within 72 hours as required by law</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-medium">4</span>
                    <div>
                      <span className="font-medium text-gray-800">Eradication & Recovery</span>
                      <p className="text-gray-600 text-xs mt-1">Complete removal of threat and system restoration</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-medium">5</span>
                    <div>
                      <span className="font-medium text-gray-800">Post-Incident Review</span>
                      <p className="text-gray-600 text-xs mt-1">Root cause analysis and preventive measures</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* Employee Security */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Employee Security</h2>
            <div className="space-y-3">
              <p className="text-gray-600 text-sm leading-relaxed">
                Our team members undergo rigorous security protocols:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-4">
                <li>Background checks for all employees with data access</li>
                <li>Mandatory security awareness training upon hire and annually</li>
                <li>Principle of least privilege for system access</li>
                <li>Confidentiality agreements and security policies</li>
                <li>Immediate access revocation upon employment termination</li>
              </ul>
            </div>
          </section>

          {/* Contact for Security */}
          <section className="mt-8 pt-8 border-t border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Security Contact</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              To report security vulnerabilities or for security-related inquiries:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-sm">
              <p className="text-gray-700"><strong>HydrateWatch Security Team</strong></p>
              <p className="text-gray-600">Email: security@hydratewatch.com</p>
              <p className="text-gray-600">PGP Key: Available at hydratewatch.com/pgp-key.txt</p>
              <p className="text-gray-600 mt-2">
                We operate a responsible disclosure program. Security researchers should report vulnerabilities
                through our security email with encrypted communication when possible.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-primary-600 transition-colors">Privacy Policy</Link>
          <span>|</span>
          <Link href="/terms" className="hover:text-primary-600 transition-colors">Terms of Service</Link>
          <span>|</span>
          <Link href="/dashboard/support" className="hover:text-primary-600 transition-colors">Help Center</Link>
        </div>
      </main>
    </div>
  );
}
