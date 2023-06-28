import { IPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { getDataWithFilter } from "@/hooks/getDataWithFilter";
import { where } from "firebase/firestore";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Flick Verso | Filmes',
    description: 'O FlickVerso é o seu guia definitivo para o mundo dos filmes. Descubra análises envolventes, resenhas detalhadas e recomendações exclusivas que irão satisfazer a sua sede por cinema. Explore gêneros diversos, acompanhe as estreias mais aguardadas e mergulhe em histórias cativantes que irão te transportar para novos universos cinematográficos. Prepare-se para uma experiência cinematográfica de tirar o fôlego!',
    keywords: "filmes, cinema, análises de filmes, resenhas de filmes, recomendações de filmes",
    openGraph: {
        images: '/favicon.png',
    },
}

export default async function Home() {
    const page = 1
    const pageSize = 10
    const posts = await getDataWithFilter<IPosts[]>('posts', { page, pageSize, where: where('sessions', "array-contains", "filmes") })
    const lastPosts = posts?.slice(0, 3)
    const slicePosts = posts?.slice(3)

    return (
        <div className="flex flex-col gap-10">
            <LastNews posts={lastPosts} />

            {slicePosts?.map((item) => <Card key={item.uid} post={item} />)}

            {posts?.length === 10 && (
                <Link
                    aria-label="Ver Mais"
                    href={'/filmes/' + 2}
                    className="cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
                >
                    Ver Mais
                </Link>
            )}
        </div >
    )
}
