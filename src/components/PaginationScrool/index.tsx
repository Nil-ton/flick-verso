import { fetchData } from "@/hooks/fetchData"
import { IFetchPosts } from "@/app/type"
import { Card } from "../Card"
import { isMultipleOfTen } from "@/utils/isMultipleOfTen"
import Link from "next/link"
import { SmoothScroll } from "../SmoothScroll"

type props = {
    sessions?: string
    next_start_after?: string
    limit?: number
    pathname?: string
}

export async function PaginationScroll({ sessions, next_start_after, limit, pathname }: props) {
    const data = await fetchData<IFetchPosts>(`posts`, {
        limit: limit, next_start_after: next_start_after, sessions: pathname === 'criticas' ? 'reviews' : pathname === 'home' ? undefined : pathname
    })

    return (
        <>
            {data?.posts?.map((item, i) => {
                if (i === Number(limit) - 20) {
                    return <>
                        <SmoothScroll />
                        <Card key={item.uid} post={item} />
                    </>
                }
                return <Card key={item.uid} post={item} />
            })}
            {isMultipleOfTen(data?.posts.length) && <Link
                aria-label="Ver Mais"
                className="cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
                href={`/page/${pathname}/${Number(limit) + 10}`}
            >
                Ver Mais
            </Link>}
        </>
    )
}