// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwMcs2ZRvJ8uPq7c155aufF97enuXeTu8",
  authDomain: "ai-travel-planner-app-6c709.firebaseapp.com",
  projectId: "ai-travel-planner-app-6c709",
  storageBucket: "ai-travel-planner-app-6c709.appspot.com",
  messagingSenderId: "961215662112",
  appId: "1:961215662112:web:320dd12c1243ee5bba1445"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app)