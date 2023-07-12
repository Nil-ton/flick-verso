import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer'
import { Metadata } from 'next'
import '../globals.css'
import Head from 'next/head'
import Script from 'next/script'
import LgpdForm from '@/components/LgpdForm'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Flick Verso',
  description: 'Explore o universo dos filmes, séries e animes no FlickVerso. Descubra análises aprofundadas, resenhas envolventes e recomendações exclusivas, enquanto mergulha em uma jornada cinematográfica e animada sem limites. Seja bem-vindo(a) a um mundo de entretenimento que atravessa as telas e desvenda histórias cativantes.',
  keywords: "animes, filmes, séries, críticas, análises, resenhas, recomendações, entretenimento, cultura pop, geek, cinema, televisão, animação, avaliações, tendências, lançamentos, personagens, episódios, trailers, notícias, streaming, diversão, fandom, maratonas.",
  openGraph: {
    images: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="pt-br">
      <head>
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GA}`}
          crossOrigin="anonymous" />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`} />

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
        <LgpdForm />
        <Header />
        <main className='min-h-screen'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
