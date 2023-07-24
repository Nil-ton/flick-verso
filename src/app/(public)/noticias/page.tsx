import { IFetchPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { PaginationScroll } from "@/components/PaginationScrool";
import { fetchData } from "@/hooks/fetchData";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Flick Verso | Notícias',
    description: 'Fique por dentro das últimas notícias do mundo do entretenimento no FlickVerso. Aqui você encontrará informações fresquinhas sobre filmes, séries e animes, mantendo-se atualizado(a) sobre os lançamentos, eventos e novidades mais empolgantes da indústria. Prepare-se para ser o primeiro a saber e compartilhe a emoção com outros entusiastas!',
    keywords: "notícias de entretenimento, lançamentos, eventos, filmes, séries, animes, novidades",
}

export default async function Home() {
    const data = await fetchData<IFetchPosts>('posts', { sessions: "noticias" })
    const lastPosts = data?.posts?.slice(0, 3)
    const slicePosts = data?.posts?.slice(3)

    return (
        <div className="flex flex-col gap-10">
            <LastNews posts={lastPosts} />

            {slicePosts?.map((item) => <Card key={item.uid} post={item} />)}

            {data?.posts?.length === 10 && (
                <Suspense fallback={<p>Loading...</p>}>
                    <PaginationScroll sessions="noticias" next_start_after={data?.next_start_after} />
                </Suspense>
            )}
        </div >
    )
}
