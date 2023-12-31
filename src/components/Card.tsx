import { IFetchSessions, IPosts, ISessions } from "@/app/type"
import { FaStar } from 'react-icons/fa'
import PostTags from "./PostTags"
import Link from "next/link"
import { fetchNoteData } from "@/hooks/fetchNoteData"
import { fetchData } from "@/hooks/fetchData"
import { replaceSpacesWithHyphens } from "@/utils/replaceSpacesWithHyphens"

type props = {
    post: IPosts
    preview?: boolean
}



export async function Card({ post, preview }: props) {
    const note = await fetchNoteData<{ note: string }[]>(replaceSpacesWithHyphens(post.title) as string)
    const types = post.sessions.map(async (item) => {
        const data = await fetchData<ISessions>('sessions', { byId: item })
        return data
    })
    const tags = await Promise.all(types)

    return (
        <div className="lg:flex">
            <picture className='relative shrink-0 cursor-pointer'>
                <img
                    src={post.thumbnail}
                    alt={post.title}
                    width={1200}
                    height={400}
                    className='w-full lg:w-[400px] h-[250px]  object-cover aspect-video'
                    loading='lazy'
                />
                <Link href={preview ? "/preview/" + `/${post.uid}` : `/${post.uid}`} aria-label={`Leia ${post.title}`}>
                    <span className='w-full lg:w-[400px] h-[250px] absolute top-0 left-0 bg-gradient-to-b from-transparent to-[rgba(1,1,1,.8)] block' />
                </Link>
            </picture>

            <div className="bg-white p-5 w-full rounded lg:h-[250px] h-[280px]">
                <Link href={preview ? "/preview/" + `/${post.uid}` : `/${post.uid}`} aria-label={`Leia ${post.title}`}>
                    <span className="text-lg lg:text-2xl font-bold block mb-2 cursor-pointer hover:underline">{post.title}</span>
                </Link>
                <PostTags tags={tags || null} />
                <span className="text-zinc-500 block text-md">{post.createdAt}</span>
                <span className="text-md lg:text-lg">
                    {post.subtitle}
                </span>
                {note?.[0]?.note && (
                    <div className="flex items-center mt-3">
                        {note?.[0]?.note && [1, 2, 3, 4, 5].map((value) => (
                            <FaStar
                                key={value}
                                className={`${value <= Number(note?.[0].note) ? 'text-yellow-400' : 'text-gray-400'}`}
                            />
                        ))}

                    </div>
                )}
            </div>
        </div >
    )
}