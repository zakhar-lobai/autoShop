import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration shared with the web app.
// For full parity, this should match web/src/lib/firebase.ts.
const firebaseConfig = {
  apiKey: 'AIzaSyCAVWzHHDk2qI0mQGuHXm5qa3Sqpo_J_Uc',
  authDomain: 'blackcars-21f5f.firebaseapp.com',
  databaseURL: 'https://blackcars-21f5f-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'blackcars-21f5f',
  storageBucket: 'blackcars-21f5f.appspot.com',
  messagingSenderId: '872415723478',
  appId: '1:872415723478:web:85adea80313f38a5ba6e77',
  measurementId: 'G-492YRD9N83',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

