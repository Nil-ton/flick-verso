import { IPosts } from "@/app/type"
import { Card } from "@/components/Card"
import { getDataWithFilter } from "@/hooks/getDataWithFilter"
import { getDocData } from "@/hooks/getDoc"
import { getSubCollection } from "@/hooks/getSubCollection"
import { where } from "firebase/firestore"
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
    const session = post?.sessions.find((item) => item === 'animes' || item === 'filmes' || item === 'series' || "noticias")
    const recommeted = await getDataWithFilter<IPosts[]>('posts', { page: 1, pageSize: 4, where: where('sessions', "array-contains", session) })
    const slice = recommeted?.filter((item) => item.uid !== params.postId)
    if (!post) {
        notFound()
    }
    return (
        <div className="mx-6 lg:mx-20">
            <div>
                <h1 className="text-[34px] lg:text-[48px] font-bold">{post.title}</h1>
                <h2 className="text-[gray] text-[18px] lg:text-[22px]">{post.subtitle}</h2>
            </div>

            <div className="flex text-[14px] lg:text-[16px]">
                <div className="mt-2">
                    Publicado por <strong><a href={post?.author?.socialMedia} target="_blank">{post?.author?.label}</a></strong> • {post.createdAt} • {post.updatedAt}
                </div>
            </div>

            <div className="mt-5">
                <picture className="relative">
                    <span className='w-full lg:h-[500px] h-[250px] absolute top-0 left-0 bg-gradient-to-b from-transparent to-[rgba(1,1,1,.8)] block' />
                    <img className="object-cover aspect-video w-full lg:h-[500px] h-[250px]" src={post.thumbnail} alt={post.title} />
                </picture>
            </div>

            <div className="max-w-[700px]">
                <div className="mt-10 lg:w-full" dangerouslySetInnerHTML={{ __html: post.richText }} />
                <script async src="https://platform.twitter.com/widgets.js"></script>
            </div>

            <div className="mt-10">
                {
                    note.length !== 0 && (
                        <div>
                            <hr />
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
                            <hr className="mt-3" />
                        </div>
                    )
                }
            </div>

            <div className="flex items-center flex-col gap-5">
                <hr className="mt-10 bg-[red] w-[400px] h-[15px]" />
                <span className="uppercase text-[24px]">FlickVerso Recomenda</span>
            </div>

            <div>
                {slice?.map((item) => <div key={item.uid} className="mt-10"><Card post={item} /></div>)}
            </div>
        </div >

    )
}