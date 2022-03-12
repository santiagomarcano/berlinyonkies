import Head from 'next/head'
import '../styles/globals.css'

export default function App ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/favi.png' />
        <title>Berlin Yonkies - INSPIRED BY THE BERLIN NIGHTLIFE</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
