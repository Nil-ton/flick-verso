import { replaceSpacesWithHyphens } from "@/utils/replaceSpacesWithHyphens";

type Props = {
    limit?: number;
    next_start_after?: string;
    sessions?: string;
    byId?: string;
    keywords?: string;
    token?: string | null;
};

const url = process.env.NEXT_PUBLIC_API;

export async function fetchData<T>(collectionName: string, params?: Props) {
    try {
        let query = `${url}/${collectionName}`;
        if (params?.token) {
            query += `/${params.byId}`;
        } else if (params?.keywords) {
            query += `?keywords=${params.keywords}`;
        } else if (params?.byId) {
            query += `/${params.byId}`;
        } else {
            query += '?';
            if (params?.sessions) query += `sessions=${params.sessions}&`;
            if (params?.next_start_after) query += `start_after=${params.next_start_after}&`;
            query += `limit=${params?.limit || 10}`;
        }

        const res = await fetch(query, params?.token ? { headers: { 'Authorization': `Bearer ${params.token}` } } : undefined);
        const data = await res.json()
        const posts = { ...data, uid: replaceSpacesWithHyphens(data.title) }
        if (collectionName === 'posts' && params?.byId) {
            return posts as T
        }
        return (data) as T;
    } catch (error) {
        console.log(`Error fetching data from ${collectionName}:`, error);
    }
}
