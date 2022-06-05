import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCK1KZvmu5wseA1Tx1CqswgP-Hct_JRmU0",
  authDomain: "cool-piw-project.firebaseapp.com",
  projectId: "cool-piw-project",
  storageBucket: "cool-piw-project.appspot.com",
  messagingSenderId: "548158819330",
  appId: "1:548158819330:web:6f31cf7ccbf3c688db2b1b"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);