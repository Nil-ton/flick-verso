import { IPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { getData } from "@/hooks/getData";
import Link from "next/link";

type props = {
    params: {
        pageSize: string
    }
}


export default async function Home({ params }: props) {
    const posts = await getData<IPosts[]>('posts', 1, Number(params.pageSize))
    const lastPosts = posts?.slice(0, 3)
    const slicePosts = posts?.slice(3)
    return (
        <div className="flex flex-col gap-10">
            <LastNews posts={lastPosts} />

            {slicePosts?.map((item) => <Card key={item.uid} post={item} />)}

            {posts?.length === Number(params.pageSize) && (
                <Link
                    href={'/home/' + 20}
                    className="cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
                >
                    Ver Mais
                </Link>
            )}
        </div >
    )
}
