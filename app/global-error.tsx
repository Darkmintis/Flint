'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            <div className="relative mb-6">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto" />
              <div className="absolute inset-0 rounded-full bg-red-400/20 animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Something went wrong!</h1>
            <p className="text-gray-300 mb-6">
              We apologize for the inconvenience. An unexpected error occurred while loading OneTap Tools.
            </p>
            <div className="space-x-4">
              <Button
                onClick={reset}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try again
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Go home
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="text-gray-400 cursor-pointer">Error details</summary>
                <pre className="mt-2 text-xs text-red-300 bg-black/20 p-2 rounded overflow-auto">
                  {error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}
