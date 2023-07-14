import { IPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { getDataWithFilter } from "@/hooks/getDataWithFilter";
import { where } from "firebase/firestore";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Flick Verso | Notícias',
    description: 'Fique por dentro das últimas notícias do mundo do entretenimento no FlickVerso. Aqui você encontrará informações fresquinhas sobre filmes, séries e animes, mantendo-se atualizado(a) sobre os lançamentos, eventos e novidades mais empolgantes da indústria. Prepare-se para ser o primeiro a saber e compartilhe a emoção com outros entusiastas!',
    keywords: "notícias de entretenimento, lançamentos, eventos, filmes, séries, animes, novidades",
}

export default async function Home() {
    const page = 1
    const pageSize = 10
    const posts = await getDataWithFilter<IPosts[]>('posts', { page, pageSize, where: where('sessions', "array-contains", "noticias") })
    const lastPosts = posts?.slice(0, 3)
    const slicePosts = posts?.slice(3)

    return (
        <div className="flex flex-col gap-10">
            <LastNews posts={lastPosts} />

            {slicePosts?.map((item) => <Card key={item.uid} post={item} />)}
        </div >
    )
}
