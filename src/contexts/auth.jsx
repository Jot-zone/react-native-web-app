import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { Platform } from 'react-native';
import { doc } from "firebase/firestore"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [dbUserRef, setDbUserRef] = useState(null);
    const [userInitialized, setUserInitialized] = useState(false);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        iosClientId: "100669544122-kibcv4shqhqjvliboltg4457dctksvcs.apps.googleusercontent.com",
        androidClientId: "100669544122-g8qlpn5eavnulhen57n4gjv9to8faosr.apps.googleusercontent.com",
        webClientId: "941837202432-7qdrbiqo7nrne5ab6uarqebo8kod2s9o.apps.googleusercontent.com",
    });

    useEffect(() => {
        if (response?.type === "success") {
          const { id_token } = response.params;
          const credential = GoogleAuthProvider.credential(id_token);
          signInWithCredential(auth, credential);
        }
      }, [response]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                initializeFirebaseUser(user);
            } else {
                // console.log('no user');
            }
        });
    }, []);

    const initializeFirebaseUser = (firebaseUser) => {
        setFirebaseUser(firebaseUser);

        if (firebaseUser) {
            setDbUserRef(doc(db, "users", firebaseUser.uid));
        } else {
            setDbUserRef(null);
        }

        setUserInitialized(true);
    }

    const googleSignInWithPopup = async () => {
        const provider = new GoogleAuthProvider();
    
        try {
            await signInWithPopup(
                auth, 
                provider
            );
        } catch (error) {
            console.error(error);
        }
    }

    const promptGoogleLogin = () => {
        if (Platform.OS === "web") {
            googleSignInWithPopup();
        } else {
            promptAsync();
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth);
            initializeFirebaseUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider 
            value={{ 
                userInitialized,
                firebaseUser, 
                dbUserRef,
                logOut,
                promptGoogleLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}