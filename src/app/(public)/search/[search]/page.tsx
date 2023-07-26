import { IFetchPosts, IPosts } from "@/app/type";
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
        search: string
    }
}

export default async function Home({ params }: props) {
    const searchTerm = decodeURIComponent(params.search).toLowerCase().trim();

    const page = 1
    const pageSize = 10
    const data = await fetchData<IFetchPosts>('posts', { keywords: searchTerm })

    if (!page) {
        return redirect('/')
    }
    if (!data?.posts) {
        return notFound()
    }
    return (
        <div className="flex flex-col gap-10">
            <div className="flex gap-3 text-[24px] font-bold ml-10 mt-5">
                <span className="border-r-4 border-gray-500 h-[40px] w-[10px]"></span>
                <h1>Pesquisa</h1>
            </div>
            {data?.posts?.map((item) => <Card key={item.uid} post={item} />)}
            {data?.posts?.length === 10 && (
                <Link
                    aria-label="Ver Mais"
                    href={'/home/' + 2}
                    className="cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
                >
                    Ver Mais
                </Link>
            )}
        </div >
    )
}
