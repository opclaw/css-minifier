import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://css-minifier.vercel.app'),
  alternates: {
    canonical: 'https://css-minifier.vercel.app',
  },
  title: 'CSS Minifier — Compress CSS | Free Online Tool',
  description: 'Minify and compress CSS code. Free CSS optimizer for faster websites.',
  keywords: ['css minifier', 'css compressor', 'minify css', 'compress css'],
  authors: [{ name: 'SmartOK Tools' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://css-minifier.vercel.app',
    siteName: 'CSS Minifier',
    title: 'CSS Minifier — Compress CSS',
    description: 'Minify and compress CSS code.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSS Minifier',
    description: 'Minify and compress CSS code.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'CSS Minifier',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              featureList: 'CSS minification, Whitespace removal, Comment removal',
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  )
}
