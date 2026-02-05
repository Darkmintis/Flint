import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500 mb-10">Last Updated: February 5, 2026</p>
          
          <div className="space-y-8 text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Acceptance of Terms</h2>
              <p>
                By accessing and using Flint, you accept and agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Use of Services</h2>
              <p className="mb-2">
                <strong className="text-white">Free Access:</strong> All tools are provided free of charge for
                personal and commercial use.
              </p>
              <p className="mb-2">
                <strong className="text-white">No Registration:</strong> You can use all tools without creating
                an account or providing personal information.
              </p>
              <p>
                <strong className="text-white">Client-Side Processing:</strong> All processing happens in your
                browser. We do not have access to your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Acceptable Use</h2>
              <p className="mb-2">You agree to use Flint only for lawful purposes. You must not:</p>
              <ul className="space-y-1.5 ml-5 list-disc">
                <li>Use the tools to process illegal or harmful content</li>
                <li>Attempt to compromise the security of the website</li>
                <li>Reverse engineer or copy the source code without permission</li>
                <li>Use automated systems to access the tools excessively</li>
                <li>Misrepresent your affiliation with Flint</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Disclaimer of Warranties</h2>
              <p className="mb-2">
                Flint is provided "as is" and "as available" without any warranties of any kind, either
                express or implied.
              </p>
              <p>
                We do not warrant that the tools will be uninterrupted, error-free, or completely secure. You use
                the tools at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Flint and its creators shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages resulting from your use of or
                inability to use the tools.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Data Accuracy</h2>
              <p>
                While we strive for accuracy in all tools, we make no guarantees about the correctness of results.
                Always verify critical calculations and conversions independently.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Intellectual Property</h2>
              <p>
                The Flint website, design, and code are open source under MIT License. See our{" "}
                <a href="https://github.com/Darkmintis/Flint" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  GitHub repository
                </a>
                {" "}for details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be posted on this page with
                an updated revision date. Continued use of the tools after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with applicable laws, without regard
                to conflict of law principles.
              </p>
            </section>

            <section className="pt-6 border-t border-slate-800">
              <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
              <p>
                For questions about these Terms of Service, please contact us at{" "}
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
