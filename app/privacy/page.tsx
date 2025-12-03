import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <h1 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <div className="space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">Last Updated: December 3, 2025</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Your Privacy Matters</h2>
              <p>
                At 1Tap Tools, we are committed to protecting your privacy. All tools on this platform are designed
                to work entirely in your browser without sending your data to any servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Data Processing</h2>
              <p className="mb-3">
                <strong className="text-white">Client-Side Processing:</strong> All conversions, transformations, and
                processing happen locally in your browser. Your data never leaves your device.
              </p>
              <p className="mb-3">
                <strong className="text-white">No Storage:</strong> We do not store, collect, or transmit any of the
                content you enter into our tools.
              </p>
              <p>
                <strong className="text-white">No Tracking:</strong> We do not use cookies, analytics, or any tracking
                mechanisms to monitor your activity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Information We Don't Collect</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personal information (name, email, etc.)</li>
                <li>Tool usage data or history</li>
                <li>Input or output data from any tools</li>
                <li>IP addresses or device information</li>
                <li>Browsing patterns or behavior</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Third-Party Services</h2>
              <p>
                We do not integrate any third-party analytics, advertising, or tracking services. The website is
                hosted on Vercel, which may collect basic server logs for infrastructure purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Your Rights</h2>
              <p>
                Since we don't collect any personal data, there is no data to access, modify, or delete. You have
                complete control over all information you use with our tools.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Changes to Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time. Any changes will be posted on this page with
                an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Contact</h2>
              <p>
                If you have any questions about this privacy policy, please contact us through our GitHub repository.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
