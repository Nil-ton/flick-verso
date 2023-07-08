import { db } from "@/service/firebase";
import { replaceSpacesWithHyphens } from "@/utils/replaceSpacesWithHyphens";
import { format, formatDistanceToNow } from "date-fns";
import { Timestamp, collection, doc, getDoc } from "firebase/firestore";
import { ptBR } from "date-fns/locale";

function getTimeSinceUpdate(updatedAt: string) {

    return formatDistanceToNow(updatedAt as unknown as number, { addSuffix: true, locale: ptBR });
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
        const createdAt = `${format(dateCreatedAt, 'dd/MM/yyyy', { locale: ptBR })}, às ${format(dateCreatedAt, 'HH:mm', { locale: ptBR })}`;
        const updatedAt = timestampUpdateAt && `Atualizado ${getTimeSinceUpdate(dateUpdateAt as unknown as string)}`;;
        return { ...documentSnapshot.data(), createdAt, updatedAt, uid: idCollection, dateCreatedAt, dateUpdateAt } as T;
    } else {
        return null
    }
}