import { IPosts } from "@/app/type"
import { Card } from "@/components/Card"
import { NoteReview } from "@/components/NoteReview"
import { Shered } from "@/components/Shared"
import { getDataWithFilter } from "@/hooks/getDataWithFilter"
import { getDocData } from "@/hooks/getDoc"
import { getSubCollection } from "@/hooks/getSubCollection"
import { where } from "firebase/firestore"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
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
        alternates: {
            canonical: `https://flickverso.com.br/${post?.uid}`,
        },
        openGraph: {
            type: "article",
            images: post?.thumbnail,
            title: post?.title,
            url: `/${post?.uid}`,
            description: post?.description,
            locale: 'pt-br'
        },
        twitter: {
            card: "summary_large_image",
            images: {
                url: post?.thumbnail as string,
                alt: post?.title
            },
            title: post?.title,
            description: post?.description,
            site: '@flickverso'
        }
    }
}

export default async function Page({ params }: props) {
    const post = await getDocData<IPosts>('posts', params.postId)
    const note = await getSubCollection<{ note: string }[]>(String(post?.title), 'nota')
    const validSessions = ['animes', 'filmes', 'series', 'noticias'];
    const session = post?.sessions.find((item) => validSessions.includes(item));
    const isNoticia = post?.sessions.find(item => item === 'noticias')
    const recommeted = await getDataWithFilter<IPosts[]>('posts', { page: 1, pageSize: 11, where: where('sessions', "array-contains", session) })
    const slice = recommeted?.filter((item) => item.uid !== params.postId)


    if (!post) {
        notFound()
    }

    const lg = (type: string) => {
        if (type === 'review') {
            return {
                "@context": "https://schema.org",
                "@type": 'Review',
                "headline": post.title,
                "image": post.thumbnail,
                "datePublished": post.dateCreatedAt,
                "dateModified": post.dateUpdateAt,
                "author": {
                    "@type": "Person",
                    "name": post.author.value
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
                    "@type": session === 'filmes' ? 'Movie' : "CreativeWorkSeason",
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
                "name": post.author.value,
                "url": "https://www.linkedin.com/in/nilton-oliveira-link/"
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
                    <h2 className="text-zinc-700 text-[18px] lg:text-[22px]">{post.subtitle}</h2>
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
                        <img loading="lazy" width={1200} height={680} className="object-cover aspect-video w-full lg:h-[500px] h-[250px]" src={post.thumbnail} alt={post.title + ' thumbnail'} />
                    </picture>
                </div>

                <div className="mt-5">
                    <div className="prose-2xl prose prose-cyan prose-img:rounded-sm" dangerouslySetInnerHTML={{ __html: post.richText.replace('<img', '<img loading="lazy"') }} />
                </div>

                {note[0] && <NoteReview note={note} />}


                <div className="flex items-center flex-col gap-5">
                    <hr className="mt-10 bg-[red] lg:w-[400px] w-[50%] h-[15px]" />
                    <span className="uppercase text-[24px]">FlickVerso Recomenda</span>
                </div>
            </div>
            <div className="w-full">
                {slice?.map((item) => <div key={item.uid} className="mt-10"><Card post={item} /></div>)}
            </div>

            <script id="application/ld+json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lg(post.type)) }}>
            </script>
        </div>
    )
}