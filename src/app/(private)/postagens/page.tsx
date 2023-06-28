'use client'
import { IPosts } from "@/app/type"
import Pagination from "@/components/Pagination"
import { TablePostagens } from "@/components/TablePostagens"
import { getData } from "@/hooks/getData"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation'

export default function Postagens() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const page = searchParams.get('page')

    const [posts, setPosts] = useState<IPosts[] | undefined>([])

    const handlePageChange = (page: number) => {
        router.push('/postagens?page=' + page)
    };

    useEffect(() => {
        (async () => {
            const posts = await getData<IPosts[]>('posts', Number(page))
            setPosts(posts)
        })()
    }, [page])

    return <>
        <TablePostagens posts={posts} />
        <div className="mt-5">
            <Pagination currentPage={Number(page)} onPageChange={handlePageChange} dataLenght={posts?.length} />
        </div>
    </>
}