import { IPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { getData } from "@/hooks/getData";
import { getDataWithFilter } from "@/hooks/getDataWithFilter";
import { where } from "firebase/firestore";
import Link from "next/link";
import { redirect } from "next/navigation";

type props = {
    params: {
        page: string
    }
}


export default async function Home({ params }: props) {
    const page = Number(params.page)
    const pageSize = 10
    const posts = await getDataWithFilter<IPosts[]>('posts', { page, pageSize, where: where('sessions', "array-contains", "animes") })

    if (!page || page === 1) {
        return redirect('/animes')
    }
    if (!posts) {
        return redirect('/animes')
    }

    return (
        <div className="flex flex-col gap-10">

            {posts?.map((item) => <Card key={item.uid} post={item} />)}

            {posts && posts?.length > 10 && (
                <Link
                    href={'/animes/' + (Number(params.page) + 1)}
                    className="cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
                >
                    Ver Mais
                </Link>
            )}
            {posts && posts?.length < 9 && (
                <Link
                    href={Number(params.page) - 1 === 1 ? '/' : '/animes/' + (Number(params.page) - 1)}
                    className="cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
                >
                    Voltar
                </Link>
            )}
        </div >
    )
}
