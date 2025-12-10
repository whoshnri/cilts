import type { Metadata } from "next";
import { Tiro_Devanagari_Marathi } from "next/font/google";

const tiro = Tiro_Devanagari_Marathi({
  subsets: ["latin", "devanagari"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Terms of Service - CILTS",
  description:
    "Read the official Terms of Service for CILTS. Understand the rules, your rights, and responsibilities when using our platform to pitch and vote on dream collaborations.",
};

export default function TermsPage() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 min-h-screen">
      <div className="container mx-auto max-w-4xl px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className={`${tiro.className} text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight`}
          >
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Last updated: <time dateTime="2024-12">December 2024</time>
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="prose prose-lg max-w-none p-8 sm:p-12 lg:p-16 text-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 first:mt-0">
              1. Acceptance of These Terms
            </h2>
            <p>
              By accessing or using <strong>CILTS</strong> (the “Platform”), you agree to be legally bound by these Terms of Service. If you do not agree with any part of these terms, you must not use the Platform.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">2. Description of the Platform</h2>
            <p>
              CILTS is a community-driven platform where users can pitch dream collaborations, vote on ideas, comment, and connect with creative minds. We facilitate discovery and celebration of collaborative concepts across entertainment, art, tech, and beyond.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">3. Account Registration</h2>
            <p>To access core features, you must create an account. You agree to:</p>
            <ul className="space-y-3 mt-4">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Accept full responsibility for all activity that occurs under your account</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">4. User Content & License</h2>
            <p>You retain ownership of all content you submit (“User Content”). However, by posting on CILTS, you grant us a:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Worldwide, non-exclusive, royalty-free, transferable license</li>
              <li>To use, display, reproduce, modify, and distribute your content on the Platform</li>
              <li>For the purpose of operating, promoting, and improving CILTS</li>
            </ul>
            <p className="mt-6">
              You are solely responsible for your User Content and represent that it does not violate any third-party rights or laws.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">5. Prohibited Content & Conduct</h2>
            <p>You agree not to post or engage in any activity that:</p>
            <ul className="space-y-3 mt-4">
              <li>Infringes copyrights, trademarks, or other intellectual property rights</li>
              <li>Is defamatory, harassing, hateful, discriminatory, or harmful</li>
              <li>Contains explicit, obscene, or pornographic material</li>
              <li>Promotes violence, illegal activity, or self-harm</li>
              <li>Contains viruses, malware, or malicious code</li>
              <li>Impersonates any person or entity</li>
              <li>Manipulates voting through bots, multiple accounts, or coordinated inauthentic behavior</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">6. Platform Ownership</h2>
            <p>
              The Platform and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of CILTS and its licensors. You may not copy, modify, reverse-engineer, or create derivative works from any part of the Platform.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">7. Termination</h2>
            <p>
              We may suspend or terminate your account immediately, without prior notice, for any violation of these Terms or at our sole discretion. Upon termination, your right to use the Platform ceases immediately.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">8. Disclaimer of Warranties</h2>
            <p>
              The Platform is provided on an “as-is” and “as-available” basis. We make no warranties, express or implied, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>That the Platform will be uninterrupted or error-free</li>
              <li>That defects will be corrected</li>
              <li>That the Platform is free of viruses or harmful components</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, CILTS and its team shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, data, or goodwill — arising from your use of or inability to use the Platform.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">11. Changes to These Terms</h2>
            <p>
              We may revise these Terms at any time. We will notify you of material changes via email or a prominent notice on the Platform. Your continued use after such changes constitutes acceptance of the updated Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-10">12. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us via our{" "}
              <a href="/contact" className="text-blue-600 hover:underline font-medium">
                Contact page
              </a>{" "}
              or email{" "}
              <a href="mailto:legal@cilts.com" className="text-blue-600 hover:underline">
                legal@cilts.com
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-12">
          © {new Date().getFullYear()} CILTS. All rights reserved.
        </p>
      </div>
    </section>
  );
}