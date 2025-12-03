import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "1Tap Tools - All-in-One Developer Toolkit | 30+ Essential Tools",
  description:
    "The ultimate developer toolkit with 30+ essential tools for encoding, decoding, formatting, and generating. Base64, URL encoding, QR codes, JSON formatting, hash generation, password generator, and more. Simple, fast, and beautiful.",
  generator: 'Next.js',
  keywords: [
    '1tap tools',
    'developer tools',
    'base64 encoder',
    'json formatter',
    'qr code generator',
    'hash generator',
    'url encoder',
    'password generator',
    'text tools',
    'web tools',
    'online tools',
    'free tools',
    'encoding tools',
    'conversion tools',
    'uuid generator',
    'color converter'
  ],
  authors: [{ name: 'Darkmintis' }],
  creator: 'Darkmintis',
  publisher: 'Darkmintis',
  metadataBase: new URL('https://onetap-tools.vercel.app'),
  openGraph: {
    title: '1Tap Tools - All-in-One Developer Toolkit | 30+ Essential Tools',
    description: 'The ultimate developer toolkit with 30+ essential tools. Simple, fast, and beautiful tools for encoding, decoding, formatting, and generating.',
    url: 'https://onetap-tools.vercel.app',
    siteName: '1Tap Tools',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '1Tap Tools - Developer Toolkit',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '1Tap Tools - All-in-One Developer Toolkit | 30+ Essential Tools',
    description: 'The ultimate developer toolkit with 30+ essential tools. Simple, fast, and beautiful.',
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
