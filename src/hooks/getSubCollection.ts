import { db } from "@/service/firebase";
import { replaceSpacesWithHyphens } from "@/utils/replaceSpacesWithHyphens";
import { Timestamp, collection, doc, getDoc, getDocs } from "firebase/firestore";

export async function getSubCollection<T>(id: string, subcollection: string) {
    const idCollection = replaceSpacesWithHyphens(id)
    const docRef = doc(db, "posts", idCollection as string);

    const subcollectionRef = collection(docRef, subcollection);

    const subcollectionSnapshot = await getDocs(subcollectionRef);
    const data: unknown[] = []

    subcollectionSnapshot.forEach((doc) => {
        data.push({ ...doc.data(), uid: doc.id } as T)
    });
    return data as T
}