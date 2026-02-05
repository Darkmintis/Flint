import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Clean Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f14] to-[#0a0a0f]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>
        
        <div className="bg-[#13131a]/80 backdrop-blur-sm border border-slate-800 rounded-lg p-8 sm:p-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 mb-10">Last Updated: February 5, 2026</p>
          
          <div className="space-y-8 text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Your Privacy Matters</h2>
              <p>
                At Flint, we are committed to protecting your privacy. All tools on this platform are designed
                to work entirely in your browser without sending your data to any servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Data Processing</h2>
              <p className="mb-2">
                <strong className="text-white">Client-Side Processing:</strong> All conversions, transformations, and
                processing happen locally in your browser. Your data never leaves your device.
              </p>
              <p className="mb-2">
                <strong className="text-white">No Storage:</strong> We do not store, collect, or transmit any of the
                content you enter into our tools.
              </p>
              <p>
                <strong className="text-white">No Tracking:</strong> We do not use cookies, analytics, or any tracking
                mechanisms to monitor your activity.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Information We Don&apos;t Collect</h2>
              <ul className="space-y-1.5 ml-5 list-disc">
                <li>Personal information (name, email, etc.)</li>
                <li>Tool usage data or history</li>
                <li>Input or output data from any tools</li>
                <li>IP addresses or device information</li>
                <li>Browsing patterns or behavior</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Third-Party Services</h2>
              <p>
                We do not integrate any third-party analytics, advertising, or tracking services. The website is
                hosted on GitHub Pages, which may collect basic server logs for infrastructure purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Your Rights</h2>
              <p>
                Since we don't collect any personal data, there is no data to access, modify, or delete. You have
                complete control over all information you use with our tools.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Changes to Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time. Any changes will be posted on this page with
                an updated revision date.
              </p>
            </section>

            <section className="pt-6 border-t border-slate-800">
              <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
              <p>
                If you have any questions about this privacy policy, please contact us at{" "}
                <a href="mailto:contact.darkmintis@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  contact.darkmintis@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
