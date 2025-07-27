import { Zap } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <Zap className="w-16 h-16 text-yellow-400 mx-auto animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-yellow-400/20 animate-ping" />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-white">Loading OneTap Tools...</h2>
        <p className="mt-2 text-gray-300">Preparing your developer toolkit</p>
      </div>
    </div>
  )
}
