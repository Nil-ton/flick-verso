import { IPosts } from "@/app/type"
import Pagination from "@/components/Pagination"
import { TablePostagens } from "@/components/TablePostagens"
import { getDataWithFilter } from "@/hooks/getDataWithFilter"
import { where } from "firebase/firestore"

type props = {
    params: {
        page: string
        search: string
    }
}

export default async function Postagens({ params }: props) {
    const page = Number(params.page)
    const search = decodeURIComponent(params.search)

    const posts = await getDataWithFilter<IPosts[]>('posts', { page, where: where('title', '==', search) })


    return <>
        <TablePostagens posts={posts} currentPage={page} search={search} />
    </>
}