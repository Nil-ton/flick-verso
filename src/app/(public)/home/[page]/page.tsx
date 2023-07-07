import { IPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { getData } from "@/hooks/getData";
import Link from "next/link";
import { notFound } from "next/navigation";

type props = {
    params: {
        page: string
    }
}


export default async function Home({ params }: props) {
    const posts = await getData<IPosts[]>('posts', Number(params.page), 11)
    const lastPostSlice = posts?.slice(0, 3)
    const slice = posts?.slice(3)

    console.log(posts)



    if (!Number(params.page)) {
        return notFound()
    }

    if (!posts) {
        return (
            <div className="flex flex-col gap-10 text-center">
                <h1 className="font-bold text-2xl">Não há página {params.page}.</h1>
                <Link
                    href={Number(params.page) - 1 === 1 ? '/' : '/home/' + (Number(params.page) - 1)}
                    className="cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
                >
                    Voltar
                </Link>
            </div>
        )
    }


    return (
        <div className="flex flex-col gap-10">
            {Number(params.page) === 1 && (
                <>
                    <LastNews posts={lastPostSlice} />
                    {slice?.map((item) => <Card key={item.uid} post={item} />)}
                </>
            )}

            {Number(params.page) > 1 && (
                slice?.map((item) => <Card key={item.uid} post={item} />)
            )}


            {posts && posts?.length > 10 && (
                <Link
                    href={'/home/' + (Number(params.page) + 1)}
                    className="cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
                >
                    Ver Mais
                </Link>
            )}
            {posts && posts?.length < 10 && (
                <Link
                    href={Number(params.page) - 1 === 1 ? '/' : '/home/' + (Number(params.page) - 1)}
                    className="cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
                >
                    Voltar
                </Link>
            )}
        </div >
    )
}
