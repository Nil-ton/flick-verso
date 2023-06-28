import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Metadata } from 'next'
import '../globals.css'
import Head from 'next/head'

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
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE}`}
          crossOrigin="anonymous" />
      </head>
      <body>
        <Header />
        <main className='min-h-screen'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
