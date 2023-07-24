import { fetchData } from "@/hooks/fetchData";
import { IFetchPosts, IPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { PaginationScroll } from "@/components/PaginationScrool";
import { Suspense } from "react";

export default async function Home() {
  const data = await fetchData<IFetchPosts>('posts')
  const lastPosts = data?.posts?.slice(0, 3)
  const slicePosts = data?.posts?.slice(3)
  return (
    <div className="flex flex-col gap-10">
      <LastNews posts={lastPosts} />
      {slicePosts?.map((item) => <Card key={item.uid} post={item} />)}
      {data?.posts?.length === 10 && (
        <Suspense fallback={<p>Loading...</p>}>
          <PaginationScroll next_start_after={data?.next_start_after} />
        </Suspense>
      )}
    </div >
  )
}
