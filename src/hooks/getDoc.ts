import { db } from "@/service/firebase";
import { replaceSpacesWithHyphens } from "@/utils/replaceSpacesWithHyphens";
import { formatDistanceToNow } from "date-fns";
import { Timestamp, collection, doc, getDoc } from "firebase/firestore";
import { ptBR } from "date-fns/locale";

function getTimeSinceUpdate(updatedAt: string) {
    const updatedTime = new Date(updatedAt);

    return formatDistanceToNow(updatedTime, { addSuffix: true, locale: ptBR });
}

export async function getDocData<T>(collection: string, id?: string | null, authId?: string) {
    const idCollection = replaceSpacesWithHyphens(id)
    const a = id === null ? authId : idCollection
    const docRef = doc(db, collection, a as string);

    const documentSnapshot = await getDoc(docRef);
    const data = documentSnapshot.data()
    if (documentSnapshot.exists()) {
        const timestampCreatedAt = data?.createdAt as Timestamp;
        const timestampUpdateAt = data?.updatedAt as Timestamp;
        const dateCreatedAt = new Date(timestampCreatedAt?.toDate().toUTCString())
        const dateUpdateAt = new Date(timestampUpdateAt?.toDate().toUTCString())
        const createdAt = `${dateCreatedAt.getDate()}/${dateCreatedAt.getMonth() + 1}/${dateCreatedAt.getFullYear()} ${dateCreatedAt.getHours()}:${dateCreatedAt.getMinutes()}:${dateCreatedAt.getSeconds()}`;
        const updatedAt = timestampUpdateAt && `${dateUpdateAt.getDate()}/${dateUpdateAt.getMonth() + 1}/${dateUpdateAt.getFullYear()} ${dateUpdateAt.getHours()}:${dateUpdateAt.getMinutes()}:${dateUpdateAt.getSeconds()} • Atualizado ${getTimeSinceUpdate(dateUpdateAt as unknown as string)}`;;
        return { ...documentSnapshot.data(), createdAt, updatedAt } as T;
    } else {
        return null
    }
}