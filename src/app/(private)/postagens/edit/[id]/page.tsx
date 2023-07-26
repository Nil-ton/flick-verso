
import { IPosts } from "@/app/type";
import { fetchNoteData } from "@/hooks/fetchNoteData";
import { fetchData } from "@/hooks/fetchData";
import { FormEdit } from "@/components/FormEdit";
import { Suspense } from "react";
import { replaceSpacesWithHyphens } from "@/utils/replaceSpacesWithHyphens";

type props = {
    params: {
        id: string
    }
}

export default async function Postagens({ params }: props) {

    const sessions = (await fetchData<any>('sessions'))?.sessions.map((item: any) => (
        {
            value: item.uid,
            label: item.title
        }
    ))

    const type = (await fetchData<any>('type_post'))?.type_post.map((item: any) => (
        {
            value: item.uid,
            label: item.title
        }
    ))

    const nota = (await fetchNoteData<{ note: number }[]>(replaceSpacesWithHyphens(params.id) as string))?.[0]

    const data = await fetchData<IPosts>('posts', { byId: params.id })

    return (
        <Suspense fallback={<p>FDP</p>}>
            {data && (
                <FormEdit
                    author={data.author}
                    description={data?.description}
                    // @ts-expect-error
                    keywords={data?.keywords.splice(',')}
                    richText={data?.richText}
                    // @ts-expect-error
                    sessions={data?.sessions.map((item: any) => (
                        {
                            value: item,
                            label: item === 'reviews' ? 'Críticas' : item.charAt(0).toUpperCase() + item.slice(1)
                        }
                    ))}
                    subtitle={data?.subtitle}
                    thumbnail={data?.thumbnail}
                    title={data?.title}
                    // @ts-expect-error
                    type={{
                        value: data.type,
                        label: data.type === 'article' ? 'Artigo' : data.type.charAt(0).toUpperCase() + data.type.slice(1)
                    }}
                    // @ts-expect-error
                    note={{
                        value: nota?.note || 1,
                        label: nota?.note || 1
                    }}
                    sessionsOp={sessions}
                    typeOp={type}
                />
            )}
        </Suspense>
    )
}