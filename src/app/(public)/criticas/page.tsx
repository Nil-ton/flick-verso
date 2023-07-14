import { IPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { getDataWithFilter } from "@/hooks/getDataWithFilter";
import { where } from "firebase/firestore";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Flick Verso | Críticas',
    description: 'Explore as análises detalhadas de animes, séries e filmes em nosso site. Descubra as melhores críticas que irão ajudá-lo a escolher suas próximas maratonas. Opiniões imparciais, análises aprofundadas e insights valiosos para os fãs de entretenimento. Leia agora e encontre as melhores recomendações para a sua lista de assistir.',
    keywords: "críticas de animes, críticas de séries, críticas de filmes, análises de animes, análises de séries, análises de filmes, recomendações de animes, recomendações de séries, recomendações de filmes, opiniões de animes, opiniões de séries, opiniões de filmes, análises imparciais, análises aprofundadas, insights de entretenimento.",
}


export default async function Home() {
    const page = 1
    const pageSize = 10
    const posts = await getDataWithFilter<IPosts[]>('posts', { page, pageSize, where: where('type', "==", "review") })
    const lastPosts = posts?.slice(0, 3)
    const slicePosts = posts?.slice(3)

    return (
        <div className="flex flex-col gap-10">
            <LastNews posts={lastPosts} />

            {slicePosts?.map((item) => <Card key={item.uid} post={item} />)}

            {posts && posts?.length > 9 && (
                <Link
                    aria-label="Ver Mais"
                    href={'/criticas/' + 2}
                    className="cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
                >
                    Ver Mais
                </Link>
            )}
        </div >
    )
}
