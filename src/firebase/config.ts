import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage, ref } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA91cgAZ4jcRDbty1JQ2_opOSsstSRndak",
  authDomain: "portful-v1.firebaseapp.com",
  projectId: "portful-v1",
  storageBucket: "portful-v1.appspot.com",
  messagingSenderId: "913556072636",
  appId: "1:913556072636:web:207eda56f40026528608b9",
  measurementId: "G-M06PVMM7BE"
};

// init firebase
initializeApp(firebaseConfig)

// init firestore
const db = getFirestore()

// int firebase auth
const auth = getAuth()

// init firebase storage
const storage = getStorage()

export { db, auth, storage }