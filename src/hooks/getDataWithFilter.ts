import { db } from "@/service/firebase";
import { Timestamp, collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'

export async function getDataWithFilter<T>(collectionName: string, { page = 1, pageSize = 10, where }: any) {
    try {
        // Calcula o número de documentos a pular com base no número da página
        const skip = (page - 1) * pageSize;

        // Constrói a consulta com a paginação
        let q = query(collection(db, collectionName), orderBy('createdAt', 'desc'), where, limit(pageSize));

        if (page > 1) {
            const querySnapshot = await getDocs(q);
            const lastDocument = querySnapshot.docs[skip - 1];
            q = query(collection(db, collectionName), orderBy('createdAt', 'desc'), where, startAfter(lastDocument), limit(pageSize));
        }

        const querySnapshot = await getDocs(q);
        const data: unknown[] = []
        querySnapshot?.forEach(element => {
            const timestampCreatedAt = element.data().createdAt as Timestamp;
            const dateCreatedAt = new Date(timestampCreatedAt.toDate().toUTCString())
            const createdAt = `${dateCreatedAt.getDate()}/${dateCreatedAt.getMonth() + 1}/${dateCreatedAt.getFullYear()} ${dateCreatedAt.getHours()}:${dateCreatedAt.getMinutes()}:${dateCreatedAt.getSeconds()}`;

            const timestampUpdatedAt = element.data()?.updatedAt as Timestamp;
            const dateUpdatedAt = new Date(timestampUpdatedAt?.toDate().toUTCString())
            const updatedAt = timestampUpdatedAt && `${dateUpdatedAt.getDate()}/${dateUpdatedAt.getMonth() + 1}/${dateUpdatedAt.getFullYear()} ${dateUpdatedAt.getHours()}:${dateUpdatedAt.getMinutes()}:${dateUpdatedAt.getSeconds()}`;

            const id = element.id

            data.push({ ...element.data(), uid: id, createdAt, updatedAt })
        });

        return data as T
    } catch (error) {
        console.log('Erro ao obter dados:', error);
    }
};

