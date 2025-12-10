import type { Metadata } from "next";
import { Tiro_Devanagari_Marathi } from "next/font/google";

const tiro = Tiro_Devanagari_Marathi({
  subsets: ["latin", "devanagari"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Privacy Policy - CILTS",
  description:
    "Read the CILTS Privacy Policy. Learn how we collect, use, and protect your personal information when you use our platform.",
};

export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 min-h-screen">
      <div className="container mx-auto max-w-4xl px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className={`${tiro.className} text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight`}
          >
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Last updated: <time dateTime="2024-12">December 2024</time>
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="prose prose-lg max-w-none p-8 sm:p-12 lg:p-16 text-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 first:mt-0">
              1. Introduction
            </h2>
            <p>
              CILTS (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit or use our platform.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-8">Information You Provide</h3>
            <ul className="space-y-3 mt-4">
              <li>
                <strong>Account Information:</strong> Email address, username, and password when you create an account
              </li>
              <li>
                <strong>Profile Information:</strong> Profile picture, bio, and any other details you choose to share
              </li>
              <li>
                <strong>User Content:</strong> Collaboration pitches, comments, votes, and messages you submit
              </li>
              <li>
                <strong>Communications:</strong> Messages sent via contact forms or support
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8">Information Collected Automatically</h3>
            <ul className="space-y-3 mt-4">
              <li>
                <strong>Usage Data:</strong> Pages visited, time spent, features used, and interaction patterns
              </li>
              <li>
                <strong>Device Information:</strong> Browser type, operating system, device type, and unique identifiers
              </li>
              <li>
                <strong>Log Data:</strong> IP address, access timestamps, referring URLs, and browser fingerprints
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Provide, operate, and maintain the CILTS platform</li>
              <li>Authenticate users and manage accounts</li>
              <li>Enable collaboration, commenting, and voting features</li>
              <li>Send transactional emails and important account notifications</li>
              <li>Respond to support requests and user inquiries</li>
              <li>Improve user experience through analytics and testing</li>
              <li>Detect, prevent, and address fraud, abuse, or security issues</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">4. Information Sharing</h2>
            <p>We do not sell your personal information. We may share data only with:</p>
            <ul className="space-y-3 mt-4">
              <li>
                <strong>Trusted Service Providers:</strong> Third-party vendors for hosting, analytics, email delivery, and payment processing (under strict confidentiality)
              </li>
              <li>
                <strong>Legal Obligations:</strong> When required by law, court order, or to protect the rights, property, or safety of CILTS or others
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger, acquisition, or asset sale
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">5. Data Security</h2>
            <p>
              We use industry-standard security measures including encryption, secure servers, and access controls. However, no system is completely secure, and we cannot guarantee 100% protection against unauthorized access.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">6. Your Rights & Choices</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct or update inaccurate information</li>
              <li>Request deletion of your account and data</li>
              <li>Object to or restrict certain data processing</li>
              <li>Export your data in a structured, portable format</li>
              <li>Withdraw consent where processing is consent-based</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please visit your account settings or contact us.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">7. Cookies & Tracking</h2>
            <p>
              We use cookies and similar technologies (e.g., local storage, pixels) to authenticate users, remember preferences, and analyze usage. You can manage cookie preferences in your browser settings.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">8. Third-Party Links</h2>
            <p>
              Our platform may link to external sites. We are not responsible for their content or privacy practices.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">9. Children&apos;s Privacy</h2>
            <p>
              CILTS is not intended for individuals under 13 years old. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the data immediately.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Significant changes will be announced via email or a prominent notice on the platform. Your continued use after changes constitutes acceptance.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">11. Contact Us</h2>
            <p>
              For questions about this Privacy Policy or your data, please reach out via our{" "}
              <a href="/contact" className="text-blue-600 hover:underline font-medium">
                Contact page
              </a>{" "}
              or email us at{" "}
              <a href="mailto:privacy@cilts.com" className="text-blue-600 hover:underline">
                privacy@cilts.com
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-gray-500 mt-12">
          © {new Date().getFullYear()} CILTS. All rights reserved.
        </p>
      </div>
    </section>
  );
}