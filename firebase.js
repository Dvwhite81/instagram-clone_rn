/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  collectionGroup,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from 'firebase/firestore';

// Replace these value with your firebase config data
const firebaseConfig = {
  apiKey: 'AIzaSyDo4RyCsOy_N8JJsNZf33rQwcuncSJlMRE',
  authDomain: 'instagram-clone-fa38f.firebaseapp.com',
  databaseURL: 'https://instagram-clone-fa38f-default-rtdb.firebaseio.com',
  projectId: 'instagram-clone-fa38f',
  storageBucket: 'instagram-clone-fa38f.appspot.com',
  messagingSenderId: '153354590240',
  appId: '1:153354590240:web:b2e0bec7f6408b05908445',
  measurementId: 'G-200F30CTNR',
};

if (!getApps().length) initializeApp(firebaseConfig);

export {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  collection,
  collectionGroup,
  addDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  getDoc,
  getDocs,
  setDoc,
  doc,
  arrayUnion,
  arrayRemove,
  updateDoc,
};
