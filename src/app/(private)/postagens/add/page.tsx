
import { IPosts } from "@/app/type";
import { fetchNoteData } from "@/hooks/fetchNoteData";
import { fetchData } from "@/hooks/fetchData";
import { FormEdit } from "@/components/FormEdit";
import { Suspense } from "react";
import { replaceSpacesWithHyphens } from "@/utils/replaceSpacesWithHyphens";
import { FormAdd } from "@/components/FormAdd";

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

    return (
        <Suspense fallback={<p>FDP</p>}>
            {sessions && type && (
                <FormAdd
                    sessionsOp={sessions}
                    typeOp={type}
                />
            )}
        </Suspense>
    )
}