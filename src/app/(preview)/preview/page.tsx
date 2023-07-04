import { IPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { getData } from "@/hooks/getData";
import Link from "next/link";

export default async function Home() {
  const posts = await getData<IPosts[]>('posts')
  const lastPosts = posts?.slice(0, 3)
  const slicePosts = posts?.slice(3)
  return (
    <div className="flex flex-col gap-10">
      <LastNews posts={lastPosts} preview />

      {slicePosts?.map((item) => <Card key={item.uid} post={item} preview />)}

      {posts?.length === 10 && (
        <Link
          aria-label="Ver Mais"
          href={'/preview/home/' + 2}
          className="cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
        >
          Ver Mais
        </Link>
      )}

    </div >
  )
}