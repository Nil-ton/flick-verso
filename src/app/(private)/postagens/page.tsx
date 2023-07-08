import { IPosts } from "@/app/type"
import Pagination from "@/components/Pagination"
import { TablePostagens } from "@/components/TablePostagens"
import { getData } from "@/hooks/getData"
import { useEffect, useState } from "react"
import { redirect, useRouter, useSearchParams } from 'next/navigation'


export default async function Postagens() {
    const posts = await getData<IPosts[]>('posts')

    return <>
        <TablePostagens posts={posts} currentPage={1} />
    </>
}