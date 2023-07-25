import { IFetchPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { ViewMoreButton } from "@/components/ViewMoreButton";
import { fetchData } from "@/hooks/fetchData";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Flick Verso | Séries',
    description: 'Seja bem-vindo(a) ao universo das séries no FlickVerso. Aqui você encontrará análises minuciosas, resenhas apaixonantes e recomendações exclusivas para alimentar a sua paixão pelas produções seriadas. Acompanhe as tramas mais envolventes, mergulhe em mundos de personagens complexos e compartilhe suas opiniões com outros fãs. Prepare-se para maratonar as melhores séries e se surpreender com reviravoltas emocionantes.',
    keywords: "séries, análises de séries, resenhas de séries, recomendações de séries, amantes de séries",
}

export default async function Home() {
    const data = await fetchData<IFetchPosts>('posts', { sessions: "series" })
    const lastPosts = data?.posts?.slice(0, 3)
    const slicePosts = data?.posts?.slice(3)

    return (
        <div className="flex flex-col gap-10">
            <LastNews posts={lastPosts} />

            {slicePosts?.map((item) => <Card key={item.uid} post={item} />)}

            {data?.posts?.length === 10 && (
                <ViewMoreButton limit={20} pathname="series" />
            )}
        </div >
    )
}
