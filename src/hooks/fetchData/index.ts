type props = {
    limit?: number
    next_start_after?: string
    sessions?: string
    byId?: string
}
export async function fetchData<T>(collectionName: string, params?: props) {
    try {
        let data: unknown[] = []

        if (params?.byId) {
            const resFetch = await fetch(`${process.env.NEXT_PUBLIC_API}/${collectionName}/${params.byId}`)
            const dataFetch = await resFetch.json()
            return dataFetch as T
        }

        if (params?.next_start_after) {
            const resFetch = await fetch(`${process.env.NEXT_PUBLIC_API}/${collectionName}${params?.sessions ? `?sessions=${params?.sessions}&` : '?'}start_after=${params?.next_start_after}&limit=${params?.limit}`)
            const dataFetch = await resFetch.json()
            data = dataFetch
        }
        if (!params?.next_start_after) {
            const resFetch = await fetch(`${process.env.NEXT_PUBLIC_API}/${collectionName}${params?.sessions ? `?sessions=${params?.sessions}&` : '?'}limit=${params?.limit}`)
            const dataFetch = await resFetch.json()
            data = dataFetch
        }


        return data as T
    } catch (error) {
        console.log('Erro ao obter dados:' + collectionName, error);
    }
};

