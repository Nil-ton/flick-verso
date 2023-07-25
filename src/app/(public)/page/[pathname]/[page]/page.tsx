import { fetchData } from "@/hooks/fetchData";
import { IFetchPosts, IPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { PaginationScroll } from "@/components/PaginationScrool";
import { Suspense } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";

type props = {
    params: {
        page: string
        pathname: string
    }
}

export default async function Home({ params }: props) {
    const data = await fetchData<IFetchPosts>('posts')
    const lastPosts = data?.posts?.slice(0, 3)
    const slicePosts = data?.posts?.slice(3)
    return (
        <div className="flex flex-col gap-10">
            <LastNews posts={lastPosts} />
            {slicePosts?.map((item) => <Card key={item.uid} post={item} />)}
            <PaginationScroll pathname={params.pathname} next_start_after={data?.next_start_after} limit={Number(params.page)} />
        </div >
    )
}
