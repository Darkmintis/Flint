'use client'

import { useEffect } from 'react'

export default function Analytics() {
  useEffect(() => {
    // Basic page view tracking
    if (typeof window !== 'undefined') {
      // You can add Google Analytics, Plausible, or other analytics here
      console.log('Page viewed:', window.location.pathname)
    }
  }, [])

  return null
}
