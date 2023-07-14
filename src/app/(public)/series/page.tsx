import { IPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { getDataWithFilter } from "@/hooks/getDataWithFilter";
import { where } from "firebase/firestore";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Flick Verso | Séries',
    description: 'Seja bem-vindo(a) ao universo das séries no FlickVerso. Aqui você encontrará análises minuciosas, resenhas apaixonantes e recomendações exclusivas para alimentar a sua paixão pelas produções seriadas. Acompanhe as tramas mais envolventes, mergulhe em mundos de personagens complexos e compartilhe suas opiniões com outros fãs. Prepare-se para maratonar as melhores séries e se surpreender com reviravoltas emocionantes.',
    keywords: "séries, análises de séries, resenhas de séries, recomendações de séries, amantes de séries",
}

export default async function Home() {
    const page = 1
    const pageSize = 10
    const posts = await getDataWithFilter<IPosts[]>('posts', { page, pageSize, where: where('sessions', "array-contains", "series") })
    const lastPosts = posts?.slice(0, 3)
    const slicePosts = posts?.slice(3)

    return (
        <div className="flex flex-col gap-10">
            <LastNews posts={lastPosts} />

            {slicePosts?.map((item) => <Card key={item.uid} post={item} />)}
        </div >
    )
}
