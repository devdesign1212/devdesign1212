import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDUTnHlv1sZAL6_C60F8UwESh8BE5O-M90',
  authDomain: 'devdesign1212-54697.firebaseapp.com',
  projectId: 'devdesign1212-54697',
  storageBucket: 'devdesign1212-54697.firebasestorage.app',
  messagingSenderId: '1007224870925',
  appId: '1:1007224870925:web:8ed65e1801a727aad39d44',
  measurementId: 'G-4B48S767XW',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
