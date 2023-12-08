import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom"; // Step 1: Import
import "./tailwind.output.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/index";

// Import Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAVWzHHDk2qI0mQGuHXm5qa3Sqpo_J_Uc",
  authDomain: "blackcars-21f5f.firebaseapp.com",
  projectId: "blackcars-21f5f",
  storageBucket: "blackcars-21f5f.appspot.com",
  messagingSenderId: "872415723478",
  appId: "1:872415723478:web:2c872684a23bf1a6ba6e77",
  measurementId: "G-690BZQQZQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <Router> 
      <App />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
