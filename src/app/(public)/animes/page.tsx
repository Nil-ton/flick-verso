import { IFetchPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { ViewMoreButton } from "@/components/ViewMoreButton";
import { fetchData } from "@/hooks/fetchData";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Flick Verso | Animes',
    description: 'Desbrave o incrível universo dos animes no FlickVerso. De clássicos intemporais a emocionantes lançamentos, oferecemos análises aprofundadas, curiosidades e recomendações exclusivas para os fãs de animação japonesa. Encontre o seu próximo anime favorito, mergulhe em mundos fantásticos e compartilhe sua paixão com a comunidade de fãs que ama tanto quanto você!',
    keywords: "animes, animação japonesa, análises, curiosidades, recomendações, fãs de anime",
}


export default async function Animes() {
    const data = await fetchData<IFetchPosts>('posts', { sessions: "animes" })
    const lastPosts = data?.posts?.slice(0, 3)
    const slicePosts = data?.posts?.slice(3)

    return (
        <div className="flex flex-col gap-10">
            <LastNews posts={lastPosts} />

            {slicePosts?.map((item) => <Card key={item.uid} post={item} />)}

            {data?.posts?.length === 10 && (
                <ViewMoreButton limit={20} pathname="animes" />
            )}
        </div >
    )
}
