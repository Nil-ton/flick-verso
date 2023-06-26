import { IPosts } from "@/app/type"
import { getDocData } from "@/hooks/getDoc"
import { getSubCollection } from "@/hooks/getSubCollection"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { FaStar } from "react-icons/fa"

type props = {
    params: {
        postId: string
    }
}

export async function generateMetadata({ params }: props): Promise<Metadata> {
    const post = await getDocData<IPosts>('posts', params.postId)

    return {
        title: post?.title,
        description: post?.description,
        keywords: post?.keywords.join(','),
        openGraph: {
            type: "article",
            images: post?.thumbnail
        }
    }
}

export default async function Page({ params }: props) {
    const post = await getDocData<IPosts>('posts', params.postId)
    const note = await getSubCollection<{ note: string }[]>(String(post?.title), 'nota')

    if (!post) {
        notFound()
    }
    return (
        <div className="mx-20">
            <div>
                <h1 className="text-[48px] font-bold">{post.title}</h1>
                <h2 className="text-[gray] text-[22px]">{post.subtitle}</h2>
            </div>

            <div className="flex text-[16px]">
                <div>
                    Publicado por <a className="underline" href={post?.author?.socialMedia} target="_blank">{post?.author?.label}</a> {!post.updatedAt && post.createdAt} {post.updatedAt && `${post.updatedAt}`}
                </div>
            </div>

            <div className="mt-5">
                <picture>
                    <img className="object-cover aspect-video w-full h-[500px]" src={post.thumbnail} alt={post.title} />
                </picture>
            </div>

            <div className="w-[700px]">
                <div className="mt-10 text" dangerouslySetInnerHTML={{ __html: post.richText }} />
                <script async src="https://platform.twitter.com/widgets.js"></script>
            </div>
            {
                note.length !== 0 && (
                    <div className="flex items-center text-[22px] font-bold mt-3 gap-2 uppercase">
                        Nota do crítica
                        <div className="flex">
                            {note?.[0].note && [1, 2, 3, 4, 5].map((value) => (
                                <FaStar
                                    key={value}
                                    className={`${value <= Number(note?.[0].note) ? 'text-yellow-400' : 'text-gray-400'}`}
                                />
                            ))}
                        </div>
                    </div>
                )
            }
        </div >

    )
}