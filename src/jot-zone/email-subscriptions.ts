import { db } from "../firebase/firebase";
import { doc, getDoc, updateDoc, deleteDoc, setDoc, collection, arrayUnion, addDoc, getDocs, query, orderBy, startAfter, limit, getCountFromServer } from "firebase/firestore";

export default function useEmailSubscriptions() {
    const addEmailSubscription = async (
        blogSlug: string,
        email: string,
        cadences: Array<string>,
    ): Promise<void> => {
        const newEmailSubscriptionRef = doc(db, "blogs", blogSlug, "email_subscriptions", email);

        await setDoc(newEmailSubscriptionRef, {
            email,
            cadences,
        });
    };

    return {
        addEmailSubscription,
    }
}

