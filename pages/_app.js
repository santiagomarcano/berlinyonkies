import Head from 'next/head'
import Script from 'next/script'

import '../styles/globals.css'

export default function App ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/favi.png' />
        <title>Berlin Yonkies - INSPIRED BY THE BERLIN NIGHTLIFE</title>
        <Script
          strategy='afterInteractive'
          src={`'https://www.googletagmanager.com/gtag/js?id=G-KLRXCYVSL4'`}
        />
        <Script
          id='gtag-init'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || []; function gtag()
          {dataLayer.push(arguments)}
          gtag('js', new Date()); gtag('config', 'G-KLRXCYVSL4');
        `
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
