import { IFetchPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { ViewMoreButton } from "@/components/ViewMoreButton";
import { fetchData } from "@/hooks/fetchData";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Flick Verso | Filmes',
    description: 'O FlickVerso é o seu guia definitivo para o mundo dos filmes. Descubra análises envolventes, resenhas detalhadas e recomendações exclusivas que irão satisfazer a sua sede por cinema. Explore gêneros diversos, acompanhe as estreias mais aguardadas e mergulhe em histórias cativantes que irão te transportar para novos universos cinematográficos. Prepare-se para uma experiência cinematográfica de tirar o fôlego!',
    keywords: "filmes, cinema, análises de filmes, resenhas de filmes, recomendações de filmes",
}

export default async function Home() {
    const data = await fetchData<IFetchPosts>('posts', { sessions: "filmes" })
    const lastPosts = data?.posts?.slice(0, 3)
    const slicePosts = data?.posts?.slice(3)

    return (
        <div className="flex flex-col gap-10">
            <LastNews posts={lastPosts} />

            {slicePosts?.map((item) => <Card key={item.uid} post={item} />)}

            {data?.posts?.length === 10 && (
                <ViewMoreButton limit={20} pathname="filmes" />
            )}
        </div >
    )
}
