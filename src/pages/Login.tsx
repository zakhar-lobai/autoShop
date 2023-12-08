import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCAVWzHHDk2qI0mQGuHXm5qa3Sqpo_J_Uc",
    authDomain: "blackcars-21f5f.firebaseapp.com",
    projectId: "blackcars-21f5f",
    storageBucket: "blackcars-21f5f.appspot.com",
    messagingSenderId: "872415723478",
    appId: "1:872415723478:web:2c872684a23bf1a6ba6e77",
    measurementId: "G-690BZQQZQY"
};

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleEmailPasswordLogin = async () => {
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
          console.error('Login error:', error.message);
        }
      };
    
      const handleGoogleLogin = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
          await firebase.auth().signInWithPopup(provider);
        } catch (error) {
          console.error('Google login error:', error.message);
        }
      };
    
      const handleAnonymousLogin = async () => {
        try {
          await firebase.auth().signInAnonymously();
        } catch (error) {
          console.error('Anonymous login error:', error.message);
        }
      };
    
      const handleSignUp = async () => {
        try {
          await firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
          console.error('Sign-up error:', error.message);
        }
      };
    
      return (
        <div>
          <h2>Login or Sign Up</h2>
          <form>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="button" onClick={handleEmailPasswordLogin}>
              Login with Email/Password
            </button>
            <button type="button" onClick={handleGoogleLogin}>
              Login with Google
            </button>
            <button type="button" onClick={handleAnonymousLogin}>
              Login Anonymously
            </button>
            <button type="button" onClick={handleSignUp}>
              Sign Up
            </button>
          </form>
        </div>
      );
    };

export default Login