import { IFetchPosts, IPosts } from "@/app/type"
import Pagination from "@/components/Pagination"
import { TablePostagens } from "@/components/TablePostagens"
import { Suspense, useEffect, useState } from "react"
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { fetchData } from "@/hooks/fetchData"


export default async function Postagens() {
    const data = await fetchData<IFetchPosts>('posts')

    return <>
        <Suspense fallback={<p>Loading...</p>}>
            <TablePostagens posts={data?.posts} currentPage={1} />
        </Suspense>
    </>
}