// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9hLwL2gqAUlqbusCl6ZM7L7tLdV5IY-Q",
  authDomain: "jot-zone.firebaseapp.com",
  projectId: "jot-zone",
  storageBucket: "jot-zone.appspot.com",
  messagingSenderId: "941837202432",
  appId: "1:941837202432:web:6cf0c3828752cf6d99d4e5",
  measurementId: "G-2W28NKYLWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  // analytics,
  auth,
  db,
  storage,
};


// ios client id: 100669544122-kibcv4shqhqjvliboltg4457dctksvcs.apps.googleusercontent.com
// android client id: 100669544122-g8qlpn5eavnulhen57n4gjv9to8faosr.apps.googleusercontent.com