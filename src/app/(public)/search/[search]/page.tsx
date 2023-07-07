import { IPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { getData } from "@/hooks/getData";
import { getDataWithFilter } from "@/hooks/getDataWithFilter";
import { db } from "@/service/firebase";
import { replaceSpacesWithHyphens } from "@/utils/replaceSpacesWithHyphens";
import { doc, getDoc, setDoc, where } from "firebase/firestore";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

type props = {
    params: {
        search: string
    }
}

export default async function Home({ params }: props) {
    const searchTerm = decodeURIComponent(params.search).toLowerCase().trim();

    const page = 1
    const pageSize = 10
    const posts = await getDataWithFilter<IPosts[]>('posts', { page, pageSize, where: where('keywords', 'array-contains', searchTerm) })

    if (!page) {
        return redirect('/')
    }
    if (!posts) {
        return redirect('/')
    }
    return (
        <div className="flex flex-col gap-10">
            <div className="flex gap-3 text-[24px] font-bold ml-10 mt-5">
                <span className="border-r-4 border-gray-500 h-[40px] w-[10px]"></span>
                <h1>Pesquisa</h1>
            </div>
            {posts?.map((item) => <Card key={item.uid} post={item} />)}
            {posts?.length === 10 && (
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
