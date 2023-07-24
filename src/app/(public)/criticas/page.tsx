import { IFetchPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { PaginationScroll } from "@/components/PaginationScrool";
import { fetchData } from "@/hooks/fetchData";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Flick Verso | Críticas',
    description: 'Explore as análises detalhadas de animes, séries e filmes em nosso site. Descubra as melhores críticas que irão ajudá-lo a escolher suas próximas maratonas. Opiniões imparciais, análises aprofundadas e insights valiosos para os fãs de entretenimento. Leia agora e encontre as melhores recomendações para a sua lista de assistir.',
    keywords: "críticas de animes, críticas de séries, críticas de filmes, análises de animes, análises de séries, análises de filmes, recomendações de animes, recomendações de séries, recomendações de filmes, opiniões de animes, opiniões de séries, opiniões de filmes, análises imparciais, análises aprofundadas, insights de entretenimento.",
}


export default async function Home() {
    const data = await fetchData<IFetchPosts>('posts', { sessions: "review" })
    const lastPosts = data?.posts?.slice(0, 3)
    const slicePosts = data?.posts?.slice(3)

    return (
        <div className="flex flex-col gap-10">
            <LastNews posts={lastPosts} />

            {slicePosts?.map((item) => <Card key={item.uid} post={item} />)}

            {data?.posts?.length === 10 && (
                <Suspense fallback={<p>Loading...</p>}>
                    <PaginationScroll sessions="review" next_start_after={data?.next_start_after} />
                </Suspense>
            )}
        </div >
    )
}
