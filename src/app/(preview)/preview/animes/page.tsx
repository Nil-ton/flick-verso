import { IPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { getDataWithFilter } from "@/hooks/getDataWithFilter";
import { where } from "firebase/firestore";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Flick Verso | Animes',
    description: 'Desbrave o incrível universo dos animes no FlickVerso. De clássicos intemporais a emocionantes lançamentos, oferecemos análises aprofundadas, curiosidades e recomendações exclusivas para os fãs de animação japonesa. Encontre o seu próximo anime favorito, mergulhe em mundos fantásticos e compartilhe sua paixão com a comunidade de fãs que ama tanto quanto você!',
    keywords: "animes, animação japonesa, análises, curiosidades, recomendações, fãs de anime",
    openGraph: {
        images: '/favicon.png',
    },
}


export default async function Home() {
    const page = 1
    const pageSize = 10
    const posts = await getDataWithFilter<IPosts[]>('posts', { page, pageSize, where: where('sessions', "array-contains", "animes") })
    const lastPosts = posts?.slice(0, 3)
    const slicePosts = posts?.slice(3)

    return (
        <div className="flex flex-col gap-10">
            <LastNews posts={lastPosts} />

            {slicePosts?.map((item) => <Card key={item.uid} post={item} preview/>)}

            {posts?.length === 10 && (
                <Link
                    aria-label="Ver Mais"
                    href={'/preview/animes/' + 2}
                    className="cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
                >
                    Ver Mais
                </Link>
            )}
        </div >
    )
}