import { IPosts } from "@/app/type"
import Pagination from "@/components/Pagination"
import { TablePostagens } from "@/components/TablePostagens"
import { getData } from "@/hooks/getData"
import { redirect } from 'next/navigation'

type props = {
    params: {
        page: string
    }
}

export default async function Postagens({ params }: props) {
    const page = Number(params.page)

    const posts = await getData<IPosts[]>('posts', page)

    return <>
        <TablePostagens posts={posts} currentPage={page} />
    </>
}