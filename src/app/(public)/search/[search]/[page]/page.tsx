import { IPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { fetchData } from "@/hooks/fetchData";
import { replaceSpacesWithHyphens } from "@/utils/replaceSpacesWithHyphens";
import { doc, getDoc, setDoc, where } from "firebase/firestore";
import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type props = {
    params: {
        search: string,
        page: string
    }
}

export default async function Home({ params }: props) {
    const searchTerm = decodeURIComponent(params.search).toLowerCase().trim();

    const page = Number(params.page)
    const pageSize = 10
    const posts = await fetchData<IPosts[]>('posts', { keywords: searchTerm })

    if (!page) {
        return redirect('/')
    }
    if (!posts) {
        return notFound()
    }

    return (
        <div className="flex flex-col gap-10">
            {posts?.map((item) => <Card key={item.uid} post={item} />)}
            {posts && posts?.length > 9 && (
                <Link
                    aria-label="Ver Mais"
                    href={`/search/${searchTerm}/${page + 1}`}
                    className="cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
                >
                    Ver Mais
                </Link>
            )}

            {page !== 1 && posts && posts?.length < 10 && (
                <Link
                    href={`/search/${searchTerm}/${page - 1}`}
                    className="cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
                >
                    Voltar
                </Link>
            )}
        </div >
    )
}
