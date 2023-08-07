import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function useUsers() {
    const { firebaseUser, dbUserRef, userInitialized } = useContext(AuthContext);

    const getDbUser = async () => {
        try {
            var docSnap = await getDoc(dbUserRef);
        } catch (e) {
            console.error("Error getting document:", e);
            alert('error getting document');
        }

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    }

    return {
        userInitialized,
        firebaseUser,
        getDbUser,
        dbUserRef,
    }
}