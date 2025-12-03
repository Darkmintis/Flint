import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#030014] relative overflow-hidden">
      {/* Premium Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0a0a1f] to-[#0f0720]"></div>
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-600/20 to-cyan-500/15 rounded-full blur-[120px] -top-64 -left-64 animate-float"></div>
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-purple-600/15 to-pink-500/10 rounded-full blur-[100px] -bottom-48 -right-48 animate-float-delayed"></div>
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
            <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20">
              <Shield className="h-8 w-8 text-green-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text-animated">
              Privacy Policy
            </h1>
          </div>
          
          <div className="space-y-8 text-gray-300">
            <p className="text-sm text-gray-500 border-l-2 border-blue-500/30 pl-4">Last Updated: December 3, 2025</p>
            
            <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Your Privacy Matters</span>
              </h2>
              <p className="leading-relaxed">
                At 1Tap Tools, we are committed to protecting your privacy. All tools on this platform are designed
                to work entirely in your browser without sending your data to any servers.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Data Processing</span>
              </h2>
              <p className="mb-3">
                <strong className="text-blue-300">Client-Side Processing:</strong> All conversions, transformations, and
                processing happen locally in your browser. Your data never leaves your device.
              </p>
              <p className="mb-3">
                <strong className="text-blue-300">No Storage:</strong> We do not store, collect, or transmit any of the
                content you enter into our tools.
              </p>
              <p>
                <strong className="text-blue-300">No Tracking:</strong> We do not use cookies, analytics, or any tracking
                mechanisms to monitor your activity.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                <span>Information We Don&apos;t Collect</span>
              </h2>
              <ul className="space-y-2 ml-4">
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-500"></span>Personal information (name, email, etc.)</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-500"></span>Tool usage data or history</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-500"></span>Input or output data from any tools</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-500"></span>IP addresses or device information</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-500"></span>Browsing patterns or behavior</li>
              </ul>
            </section>

            <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                <span>Third-Party Services</span>
              </h2>
              <p className="leading-relaxed">
                We do not integrate any third-party analytics, advertising, or tracking services. The website is
                hosted on Vercel, which may collect basic server logs for infrastructure purposes only.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Your Rights</span>
              </h2>
              <p className="leading-relaxed">
                Since we don't collect any personal data, there is no data to access, modify, or delete. You have
                complete control over all information you use with our tools.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                <span>Changes to Privacy Policy</span>
              </h2>
              <p className="leading-relaxed">
                We may update this privacy policy from time to time. Any changes will be posted on this page with
                an updated revision date.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Contact</span>
              </h2>
              <p className="leading-relaxed">
                If you have any questions about this privacy policy, please contact us at{" "}
                <a href="mailto:contact.darkmintis@gmail.com" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors">
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
