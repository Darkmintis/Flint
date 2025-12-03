import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          
          <div className="space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">Last Updated: December 3, 2025</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Acceptance of Terms</h2>
              <p>
                By accessing and using 1Tap Tools, you accept and agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Use of Services</h2>
              <p className="mb-3">
                <strong className="text-white">Free Access:</strong> All tools are provided free of charge for
                personal and commercial use.
              </p>
              <p className="mb-3">
                <strong className="text-white">No Registration:</strong> You can use all tools without creating
                an account or providing personal information.
              </p>
              <p>
                <strong className="text-white">Client-Side Processing:</strong> All processing happens in your
                browser. We do not have access to your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Acceptable Use</h2>
              <p className="mb-3">You agree to use 1Tap Tools only for lawful purposes. You must not:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the tools to process illegal or harmful content</li>
                <li>Attempt to compromise the security of the website</li>
                <li>Reverse engineer or copy the source code without permission</li>
                <li>Use automated systems to access the tools excessively</li>
                <li>Misrepresent your affiliation with 1Tap Tools</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Disclaimer of Warranties</h2>
              <p className="mb-3">
                1Tap Tools is provided "as is" and "as available" without any warranties of any kind, either
                express or implied.
              </p>
              <p>
                We do not warrant that the tools will be uninterrupted, error-free, or completely secure. You use
                the tools at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, 1Tap Tools and its creators shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages resulting from your use of or
                inability to use the tools.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Data Accuracy</h2>
              <p>
                While we strive for accuracy in all tools, we make no guarantees about the correctness of results.
                Always verify critical calculations and conversions independently.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Intellectual Property</h2>
              <p>
                The 1Tap Tools website, design, and code are protected by copyright and other intellectual property
                rights. All rights are reserved by Darkmintis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be posted on this page with
                an updated revision date. Continued use of the tools after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with applicable laws, without regard
                to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Contact</h2>
              <p>
                For questions about these Terms of Service, please contact us through our GitHub repository.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
