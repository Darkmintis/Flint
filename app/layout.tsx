import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Analytics from "@/components/analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OneTap Tools - All-in-One Developer Toolkit",
  description:
    "Simple, fast, and beautiful tools for encoding, decoding, formatting, and generating. Base64, URL encoding, QR codes, JSON formatting, hash generation, and more.",
  generator: 'Next.js',
  keywords: [
    'developer tools',
    'base64 encoder',
    'json formatter',
    'qr code generator',
    'hash generator',
    'url encoder',
    'text tools',
    'web tools',
    'online tools',
    'free tools'
  ],
  authors: [{ name: 'Darkmintis' }],
  creator: 'Darkmintis',
  publisher: 'Darkmintis',
  metadataBase: new URL('https://onetap-tools.vercel.app'),
  openGraph: {
    title: 'OneTap Tools - All-in-One Developer Toolkit',
    description: 'Simple, fast, and beautiful tools for encoding, decoding, formatting, and generating.',
    url: 'https://onetap-tools.vercel.app',
    siteName: 'OneTap Tools',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OneTap Tools - Developer Toolkit',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneTap Tools - All-in-One Developer Toolkit',
    description: 'Simple, fast, and beautiful tools for encoding, decoding, formatting, and generating.',
    images: ['/og-image.png'],
    creator: '@darkmintisog',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
