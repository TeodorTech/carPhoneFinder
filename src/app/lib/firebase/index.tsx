// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwlwfCP8qtvv0fzDTaZl0Mm4IwtZjk3W0",
  authDomain: "my-nextjs-app-65c02.firebaseapp.com",
  projectId: "my-nextjs-app-65c02",
  storageBucket: "my-nextjs-app-65c02.appspot.com",
  messagingSenderId: "114233907000",
  appId: "1:114233907000:web:40c28e2d1dea8508f053cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db as fireStoreDatabase };
