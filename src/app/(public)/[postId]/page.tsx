import { IPosts } from "@/app/type"
import { Card } from "@/components/Card"
import { NoteReview } from "@/components/NoteReview"
import { Shered } from "@/components/Shared"
import { getDataWithFilter } from "@/hooks/getDataWithFilter"
import { getDocData } from "@/hooks/getDoc"
import { getSubCollection } from "@/hooks/getSubCollection"
import { data } from "autoprefixer"
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
            images: post?.thumbnail,
        },
        twitter: {
            card: "summary_large_image",
            images: {
                url: post?.thumbnail as string,
                alt: post?.title
            },
        }
    }
}

export default async function Page({ params }: props) {
    const post = await getDocData<IPosts>('posts', params.postId)
    const note = await getSubCollection<{ note: string }[]>(String(post?.title), 'nota')
    const validSessions = ['animes', 'filmes', 'series', 'noticias'];
    const session = post?.sessions.find((item) => validSessions.includes(item));
    const isNoticia = post?.sessions.find(item => item === 'noticias')
    const recommeted = await getDataWithFilter<IPosts[]>('posts', { page: 1, pageSize: 4, where: where('sessions', "array-contains", session) })
    const slice = recommeted?.filter((item) => item.uid !== params.postId)

    if (!post) {
        notFound()
    }

    const lg = (type: string) => {
        if (type === 'review') {
            return {
                "@context": "https://schema.org",
                "@type": isNoticia ? "NewsArticle" : post.type === 'review' ? "Review" : "BlogPosting",
                "headline": post.title,
                "image": post.thumbnail,
                "datePublished": post.dateCreatedAt,
                "dateModified": post.dateUpdateAt,
                "author": {
                    "@type": "Person",
                    "name": post.author
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Flick Verso",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://flickverso.com.br/favicon.ico"
                    }
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://flickverso.com.br/${post.uid}`
                },
                "itemReviewed": {
                    "@type": session === 'filmes' ? 'Movie' : session === 'series' ? "TVSeries" : 'Animes',
                    "name": post.title,
                },
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": note?.[0].note,
                    "bestRating": "5"
                },

            }
        }

        return {
            "@context": "https://schema.org",
            "@type": isNoticia ? "NewsArticle" : "BlogPosting",
            "headline": post.title,
            "image": post.thumbnail,
            "datePublished": post.dateCreatedAt,
            "dateModified": post.dateUpdateAt,
            "author": {
                "@type": "Person",
                "name": post.author
            },
            "publisher": {
                "@type": "Organization",
                "name": "Flick Verso",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://flickverso.com.br/favicon.ico"
                }
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://flickverso.com.br/${post.uid}`
            },
        }
    }


    return (
        <div>
            <div className="mx-6 lg:mx-20">
                <div>
                    <h1 className="text-[34px] lg:text-[48px] font-bold">{post.title}</h1>
                    <h2 className="text-[gray] text-[18px] lg:text-[22px]">{post.subtitle}</h2>
                </div>

                <div className="flex lg:flex-row flex-col lg:gap-0 gap-3 justify-between text-[14px] lg:text-[16px]">
                    <div className="mt-2">
                        Publicado por <strong><a href={post?.author?.socialMedia} target="_blank">{post?.author?.label}</a></strong> • {post.createdAt} {post.updatedAt && `• ${post.updatedAt}`}
                    </div>
                    <Shered post={post}></Shered>
                </div>

                <div className="mt-5">
                    <picture className="relative">
                        <span className='w-full lg:h-[500px] h-[250px] absolute top-0 left-0 bg-gradient-to-b from-transparent to-[rgba(1,1,1,.8)] block' />
                        <img className="object-cover aspect-video w-full lg:h-[500px] h-[250px]" src={post.thumbnail} alt={post.title} />
                    </picture>
                </div>

                <div className="mt-5">
                    <div className="prose-2xl prose prose-cyan prose-img:rounded-sm" dangerouslySetInnerHTML={{ __html: post.richText }} />
                    <script async src="https://platform.twitter.com/widgets.js"></script>
                    <script async src="//www.instagram.com/embed.js"></script>
                </div>

                <div className="mt-10">
                    {
                        note.length !== 0 && (
                            <div>
                                <hr className="mb-3" />
                                <div className="flex items-end gap-2">
                                    <div className="flex items-center text-[22px] font-bold gap-2 uppercase">
                                        <div>
                                            Nota do crítico
                                        </div>
                                        {note?.[0].note && [1, 2, 3, 4, 5].map((value) => (
                                            <FaStar
                                                key={value}
                                                className={`${value <= Number(note?.[0].note) ? 'text-yellow-400' : 'text-gray-400'}`}
                                            />
                                        ))}
                                    </div>
                                    <NoteReview note={note} />
                                </div>
                                <hr className="mt-3" />
                            </div>
                        )
                    }
                </div>

                <div className="flex items-center flex-col gap-5">
                    <hr className="mt-10 bg-[red] lg:w-[400px] w-[50%] h-[15px]" />
                    <span className="uppercase text-[24px]">FlickVerso Recomenda</span>
                </div>
            </div>
            <div className="w-full">
                {slice?.map((item) => <div key={item.uid} className="mt-10"><Card post={item} /></div>)}
            </div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(lg(post.type))
            }}>

            </script>
        </div>
    )
}