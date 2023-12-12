import { initializeApp } from "@firebase/app";
import { getAuth, signInAnonymously, signInWithEmailAndPassword, Auth, createUserWithEmailAndPassword, signInWithPhoneNumber } from "@firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCAVWzHHDk2qI0mQGuHXm5qa3Sqpo_J_Uc",
    authDomain: "blackcars-21f5f.firebaseapp.com",
    projectId: "blackcars-21f5f",
    storageBucket: "blackcars-21f5f.appspot.com",
    messagingSenderId: "872415723478",
    appId: "1:872415723478:web:2c872684a23bf1a6ba6e77",
    measurementId: "G-690BZQQZQY"
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

export {auth, signInWithEmailAndPassword, signInAnonymously, createUserWithEmailAndPassword, signInWithPhoneNumber};