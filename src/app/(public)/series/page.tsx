import { IPosts } from "@/app/type";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { getDataWithFilter } from "@/hooks/getDataWithFilter";
import { where } from "firebase/firestore";

export const revalidate = 60 * 30

export default async function Home() {
    const page = 1
    const pageSize = 10
    const posts = await getDataWithFilter<IPosts[]>('posts', { page, pageSize, where: where('sessions', "array-contains", "series") })
    const lastPosts = posts?.slice(0, 3)
    const slicePosts = posts?.slice(3)

    return (
        <div className="flex flex-col gap-10">
            <LastNews posts={lastPosts} />

            {slicePosts?.map((item) => <Card key={item.uid} post={item} />)}
        </div >
    )
}
