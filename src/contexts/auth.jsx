import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { Platform } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = useState(null);

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

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user);
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            setFirebaseUser(user);
        } else {
            console.log('no user');
        }
    });

    const googleSignInWithPopup = async () => {
        const provider = new GoogleAuthProvider();
    
        try {
            await signInWithPopup(
                auth, 
                provider
            );

            // const result = await signInWithPopup(
            //     auth, 
            //     provider
            // );
    
            // // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // // The signed-in user info.
            // const user = result.user;
            
            // console.log({ credential, token, user });
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
            setFirebaseUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider 
            value={{ 
                firebaseUser, 
                logOut,
                promptGoogleLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}