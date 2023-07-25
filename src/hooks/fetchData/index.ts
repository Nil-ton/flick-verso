type props = {
    limit?: number
    next_start_after?: string
    sessions?: string
    byId?: string
    keywords?: string
}
const url = process.env.NEXT_PUBLIC_API
export async function fetchData<T>(collectionName: string, params?: props) {
    try {
        let data: unknown[] = []

        if (params?.keywords) {
            const resFetch = await fetch(`${url}/${collectionName}?keywords=${params.keywords}`)
            const dataFetch = await resFetch.json()
            return dataFetch as T
        }

        if (params?.byId) {
            const resFetch = await fetch(`${url}/${collectionName}/${params.byId}`)
            const dataFetch = await resFetch.json()
            return dataFetch as T
        }

        if (params?.next_start_after) {
            const resFetch = await fetch(`${url}/${collectionName}${params?.sessions ? `?sessions=${params?.sessions}&` : '?'}start_after=${params?.next_start_after}&limit=${params?.limit ? params?.limit : 10}`)
            const dataFetch = await resFetch.json()
            data = dataFetch
        }
        if (!params?.next_start_after) {
            const resFetch = await fetch(`${url}/${collectionName}${params?.sessions ? `?sessions=${params?.sessions}&` : '?'}limit=${params?.limit ? params?.limit : 10}`)
            const dataFetch = await resFetch.json()
            data = dataFetch
        }


        return data as T
    } catch (error) {
        console.log('Erro ao obter dados:' + collectionName, error);
    }
};

