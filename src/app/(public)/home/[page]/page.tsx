import { IPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { getData } from "@/hooks/getData";
import Link from "next/link";
import { redirect } from "next/navigation";

type props = {
    params: {
        page: string
    }
}


export default async function Home({ params }: props) {
    const page = Number(params.page)
    const posts = await getData<IPosts[]>('posts', page, 11)
    const lastPostSlice = posts?.slice(0, 3)
    const slice = posts?.slice(3)

    if (!page || page === 1) {
        return redirect('/')
    }
    if (!posts) {
        return redirect('/')
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
