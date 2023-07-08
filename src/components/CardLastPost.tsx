import { IPosts, ISessions } from "@/app/type";
import Link from "next/link";
import PostTags from "./PostTags";
import { getDocData } from "@/hooks/getDoc";

type props = {
    post: IPosts
    preview?: boolean
}

export async function CardLastPost({ post, preview }: props) {
    const types = post.sessions.map(async (item) => await getDocData<ISessions>('sessions', item))
    const tags = await Promise.all(types)
    return (
        <picture className='row-span-2 relative'>
            <img
                src={post?.thumbnail}
                alt={post?.title}
                width={1200}
                height={410}
                className='w-full h-[200px] lg:h-[410px] object-cover aspect-video'
                loading='lazy'
            />

            <Link href={preview ? `/preview/${post?.uid}` : `/${post?.uid}`} aria-label={`Leia ${post.title}`}>
                <span className='absolute top-0 left-0 bg-gradient-to-b from-transparent to-[rgba(1,1,1,1)] w-full h-full block'>
                    <div className='w-full h-full flex items-end justify-center p-5 text-white font-bold text-2xl'>
                        <div className="flex flex-col">
                            <PostTags tags={tags || null} />
                            <span className='block hover:underline cursor-pointer'>
                                {post?.title}
                            </span>
                        </div>
                    </div>
                </span>
            </Link>
        </picture>
    )
}