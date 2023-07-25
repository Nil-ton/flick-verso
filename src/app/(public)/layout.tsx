import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer'
import { Metadata } from 'next'
import '../globals.css'
import Head from 'next/head'
import Script from 'next/script'
import LgpdForm from '@/components/LgpdForm'
import { AdsManga } from '@/components/AdsManga'
import { AffiliatedLink } from '../type'
import Providers from '@/components/ClientProvider'
import { fetchData } from '@/hooks/fetchData'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Flick Verso',
  description: 'Explore o universo dos filmes, séries e animes no FlickVerso. Descubra análises aprofundadas, resenhas envolventes e recomendações exclusivas, enquanto mergulha em uma jornada cinematográfica e animada sem limites. Seja bem-vindo(a) a um mundo de entretenimento que atravessa as telas e desvenda histórias cativantes.',
  keywords: "animes, filmes, séries, críticas, análises, resenhas, recomendações, entretenimento, cultura pop, geek, cinema, televisão, animação, avaliações, tendências, lançamentos, personagens, episódios, trailers, notícias, streaming, diversão, fandom, maratonas.",
  openGraph: {
    images: ['https://flickverso.com.br/favicon.ico'],
  },
  icons: {
    icon: 'https://flickverso.com.br/favicon.ico',
    apple: 'https://flickverso.com.br/favicon.ico'
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const affiliatedAds = await fetchData<AffiliatedLink[]>('ads')
  return (
    <html lang="pt-br">
      <head>
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GA}`}
          crossOrigin="anonymous" />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`} />
        <meta property="og:image:width" content="1200"></meta>
        <meta property="og:image:height" content="630"></meta>

        <script id='gtag' dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GA}');`
        }}>
        </script>

        <Script async src="https://platform.twitter.com/widgets.js"></Script>
        <Script async src="//www.instagram.com/embed.js"></Script>
        <meta name="google-site-verification" content="fEPDFwbZkylUTA1aFqToMUyX23ydDkNEcAzO9axzyIc" />
      </head>
      <body>
        <Providers>
          <LgpdForm />
          <Header />
          {/* {affiliatedAds && <AdsManga affiliatedAds={affiliatedAds} />} */}
          <main className='min-h-screen'>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
