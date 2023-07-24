
export async function fetchNoteData<T>(doc_ref_name: string) {
    try {
        let data: unknown[] = []

        const resFetch = await fetch(`${process.env.NEXT_PUBLIC_API}/note/posts/${doc_ref_name}`)
        const dataFetch = await resFetch.json()
        return dataFetch as T

        return data as T
    } catch (error) {
        console.log('Erro ao obter dados:' + doc_ref_name, error);
    }
};

