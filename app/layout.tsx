import ThemeProvider from '@/context/theme-provider';
import Script from 'next/script';



import './globals.css';
import { Teko } from 'next/font/google';
import { Poppins } from 'next/font/google';
import React from 'react';
import Sidebar from '@/components/molecules/sidebar';
import Head from 'next/head';

const teko = Teko({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--teko',
});



export const metadata = {
  title: 'Three28: Create & Profit',
  applicationName: 'Three28',
  generator: 'Next.js',
  category: 'social media',
  description: `Three28: Your ultimate video sharing platform with content monetization, and an exclusive eCommerce store for content creators. Join us today!`,
  keywords: ['video sharing', 'youtube', 'video monetization', 'social media', 'video sharing platform', 'content monetization', 'Three28', 'three28 social media site', 'Three28 video platform', 
            'Three28', 'video uploading', 'sites like YouTube', 'sell video content', 'OnlyFans like site', 'Three28 app', 'Three28: Share Videos Online', 
            'Ecommerce Store for Content Creators on Three28', 'Three28: Monetize Your Video Content', 'Three28: 100% Profit for Creators', 'Boondocks', 'boondocks full episodes', 'AI Videos', 'Three28 AI Content', 'Three28 Short films',
           'Three28 pay per view', 'pay per view videos', 'Three28 pay to view content'],
 viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
    alternates: {
    canonical: 'https://three28-test.netlify.app/',
  },
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  
  return (
<>
  <html lang='en'>
{/*     <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2757853973462691" strategy="afterInteractive" />
    <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-177LE1JR6C" />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
      window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-177LE1JR6C');
      `}
    </Script>
    <Script id="google-tag-manager" strategy="afterInteractive">
      {`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-WTGGTQH');
      `}
    </Script>
    <Script id="facebook-pixel" strategy="afterInteractive">
      {`
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '737404921084988'); 
      fbq('track', 'PageView');
      `}
    </Script>

    <noscript>
<img height="1" width="1" 
src="https://www.facebook.com/tr?id=737404921084988&ev=PageView
&noscript=1"/>
</noscript> */}
    
      <body className={`${teko.className} ${teko.variable} `}>
        <h1 className="text-[transparent] z-0 absolute">Three28</h1>
        <h2 className="text-[transparent] z-0 absolute">Three28: Video Sharing Platform</h2>
        <h2 className="text-[transparent] z-0 absolute">Three28 App</h2>
        <h2 className="text-[transparent] z-0 absolute">Content monetization</h2>
        <h2 className="text-[transparent] z-0 absolute">Monetize content</h2>
        <h3 className="text-[transparent] z-0 absolute">Video sharing platform</h3>
        <h3 className="text-[transparent] z-0 absolute">eCommerce shop for content creators</h3>
        <ThemeProvider>
          {children}
          <Sidebar />
        </ThemeProvider>
      </body>
  </html>
</>

  );
}
