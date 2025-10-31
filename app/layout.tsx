import "./globals.css";
import "@/styles/legacy.css"; // TEMP shim — remove after treatments migrate
import type { CSSProperties } from 'react';
import type { Metadata, Viewport } from "next";
import PerformanceOptimizedLayout from '@/components/layout/performance-optimized-layout';
import StickyHeader from '@/components/layout/sticky-header';
import Footer from '@/components/layout/footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://www.stmaryshousedental.co.uk';

const rootFontStyle = {
  '--font-inter': 'Inter, system-ui, Arial',
  '--font-playfair': 'Playfair Display, Georgia, serif',
} as CSSProperties;

export const metadata: Metadata = {
  title: "St Mary's House Dental Care | Luxury Coastal Dentistry in Shoreham-by-Sea",
  description: "Experience luxury coastal dental care at St Mary's House in Shoreham-by-Sea. We specialize in 3D digital dentistry, porcelain veneers, dental implants, and anxiety-free treatments.",
  keywords: ["dentist Shoreham-by-Sea", "luxury dentistry", "3D dentistry", "dental implants", "porcelain veneers", "emergency dentist", "anxiety-free dentistry"],
  authors: [{ name: "St Mary's House Dental Care" }],
  creator: "St Mary's House Dental Care",
  publisher: "St Mary's House Dental Care",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'en-GB': '/',
    },
  },
  openGraph: {
    title: "St Mary's House Dental Care | Luxury Coastal Dentistry",
    description: "Discover a new standard of dental care in our luxury coastal practice.",
    url: siteUrl,
    siteName: "St Mary's House Dental Care",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "St Mary's House Dental Care - Luxury Coastal Dentistry",
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "St Mary's House Dental Care | Luxury Coastal Dentistry",
    description: "Experience advanced, anxiety-free dentistry in a stunning coastal setting.",
    images: [`${siteUrl}/twitter-image.jpg`],
    creator: '@stmaryshousedental',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'medical',
  classification: 'Dental Practice',
  referrer: 'origin-when-cross-origin',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'var(--smh-primary-magenta)' },
    { media: '(prefers-color-scheme: dark)', color: 'var(--smh-primary-magenta)' },
  ],
  colorScheme: 'light',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" style={rootFontStyle} className="font-sans">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/icon-128x128.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/icon-128x128.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/icon-72x72.png" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Apple PWA Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SMH Dental" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="var(--smh-primary-magenta)" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/assets/champagne/waves/waves-bg-2560.webp"
          as="image"
          type="image/webp"
        />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body
        className="antialiased text-slate-900 overflow-x-hidden min-h-screen bg-[var(--smh-bg)]"
        style={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-pink-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        {/* Main content wrapper */}
        <StickyHeader />

        <main id="main-content" className="relative pt-[56px]">
          <PerformanceOptimizedLayout>
            {children}
          </PerformanceOptimizedLayout>
        </main>

        <Footer />
        
        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Core Web Vitals monitoring
              function sendToAnalytics(metric) {
                // Send to your analytics service
                console.log('Core Web Vital:', metric);
              }
              
              // Measure and report Core Web Vitals
              if (typeof window !== 'undefined') {
                import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                  getCLS(sendToAnalytics);
                  getFID(sendToAnalytics);
                  getFCP(sendToAnalytics);
                  getLCP(sendToAnalytics);
                  getTTFB(sendToAnalytics);
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

