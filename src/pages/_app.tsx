import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Livepeer Grant Calculator</title>
        <meta name="description" content="Calculate LPT token amounts for grant proposals using 60-day average price. Perfect for Livepeer grant applications." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Livepeer Grant Calculator" />
        <meta property="og:description" content="Calculate LPT token amounts for grant proposals using 60-day average price" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Livepeer Grant Calculator" />
        <meta name="twitter:description" content="Calculate LPT token amounts for grant proposals using 60-day average price" />
        <meta name="twitter:image" content="/og-image.png" />
        
        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </>
  )
}
