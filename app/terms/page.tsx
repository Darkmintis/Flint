import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#030014] relative overflow-hidden">
      {/* Premium Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0a0a1f] to-[#0f0720]"></div>
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-600/20 to-pink-500/15 rounded-full blur-[120px] -top-64 -right-64 animate-float"></div>
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/15 to-cyan-500/10 rounded-full blur-[100px] -bottom-48 -left-48 animate-float-delayed"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-all duration-300 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Tools
        </Link>
        
        <div className="glass-premium rounded-3xl p-8 sm:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20">
              <FileText className="h-8 w-8 text-purple-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text-animated">
              Terms of Service
            </h1>
          </div>
          
          <div className="space-y-8 text-gray-300">
            <p className="text-sm text-gray-500 border-l-2 border-purple-500/30 pl-4">Last Updated: December 3, 2025</p>
            
            <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Acceptance of Terms</span>
              </h2>
              <p className="leading-relaxed">
                By accessing and using 1Tap Tools, you accept and agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Use of Services</span>
              </h2>
              <p className="mb-3">
                <strong className="text-purple-300">Free Access:</strong> All tools are provided free of charge for
                personal and commercial use.
              </p>
              <p className="mb-3">
                <strong className="text-purple-300">No Registration:</strong> You can use all tools without creating
                an account or providing personal information.
              </p>
              <p>
                <strong className="text-purple-300">Client-Side Processing:</strong> All processing happens in your
                browser. We do not have access to your data.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                <span>Acceptable Use</span>
              </h2>
              <p className="mb-3">You agree to use 1Tap Tools only for lawful purposes. You must not:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-500"></span>Use the tools to process illegal or harmful content</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-500"></span>Attempt to compromise the security of the website</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-500"></span>Reverse engineer or copy the source code without permission</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-500"></span>Use automated systems to access the tools excessively</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-500"></span>Misrepresent your affiliation with 1Tap Tools</li>
              </ul>
            </section>

            <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                <span>Disclaimer of Warranties</span>
              </h2>
              <p className="mb-3 leading-relaxed">
                1Tap Tools is provided "as is" and "as available" without any warranties of any kind, either
                express or implied.
              </p>
              <p className="leading-relaxed">
                We do not warrant that the tools will be uninterrupted, error-free, or completely secure. You use
                the tools at your own risk.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span>Limitation of Liability</span>
              </h2>
              <p className="leading-relaxed">
                To the maximum extent permitted by law, 1Tap Tools and its creators shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages resulting from your use of or
                inability to use the tools.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                <span>Data Accuracy</span>
              </h2>
              <p className="leading-relaxed">
                While we strive for accuracy in all tools, we make no guarantees about the correctness of results.
                Always verify critical calculations and conversions independently.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Intellectual Property</span>
              </h2>
              <p className="leading-relaxed">
                The 1Tap Tools website, design, and code are protected by copyright and other intellectual property
                rights. All rights are reserved by Darkmintis.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                <span>Changes to Terms</span>
              </h2>
              <p className="leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be posted on this page with
                an updated revision date. Continued use of the tools after changes constitutes acceptance.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>Governing Law</span>
              </h2>
              <p className="leading-relaxed">
                These terms shall be governed by and construed in accordance with applicable laws, without regard
                to conflict of law principles.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Contact</span>
              </h2>
              <p className="leading-relaxed">
                For questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:contact.darkmintis@gmail.com" className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors">
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
