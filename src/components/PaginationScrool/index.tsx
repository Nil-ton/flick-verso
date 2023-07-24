'use client'
import { fetchData } from "@/hooks/fetchData"
import { IFetchPosts } from "@/app/type"
import { useState } from "react"
import { Card } from "../Card"
import { isMultipleOfTen } from "@/utils/isMultipleOfTen"

type props = {
    sessions?: string
    next_start_after?: string
}

export function PaginationScroll({ sessions, next_start_after }: props) {
    const [data, setData] = useState<IFetchPosts | undefined>(undefined)
    const [limit, setLimit] = useState(10)

    const handleSetDate = async (after = next_start_after, limit = 10) => {
        const data = await fetchData<IFetchPosts>(`posts`, { limit, next_start_after, sessions })
        setData(data)
        setLimit(prev => prev + 10)
    }


    return (
        <>
            {data && data.posts.map((item) => <Card key={item.uid} post={item} />)}

            {isMultipleOfTen(data?.posts.length) && <button
                aria-label="Ver Mais"
                className="cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
                onClick={async () => await handleSetDate(data?.next_start_after, limit)}
            >
                Ver Mais
            </button>}


        </>
    )
}