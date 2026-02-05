import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "1Tap Tools - Professional Developer Toolkit | 30+ Essential Tools",
  description:
    "Professional developer toolkit with 30+ essential tools for encoding, decoding, formatting, and generating. Base64, URL encoding, QR codes, JSON formatting, hash generation, password generator, and more. Fast, secure, and free.",
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
    'color converter',
    'professional toolkit'
  ],
  authors: [{ name: 'Darkmintis' }],
  creator: 'Darkmintis',
  publisher: 'Darkmintis',
  openGraph: {
    title: '1Tap Tools - Professional Developer Toolkit',
    description: 'Professional developer toolkit with 30+ essential tools. Fast, secure, and completely free.',
    siteName: '1Tap Tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '1Tap Tools - Professional Developer Toolkit',
    description: 'Professional developer toolkit with 30+ essential tools. Fast, secure, and free.',
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
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
