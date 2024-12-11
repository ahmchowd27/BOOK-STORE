// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6-_LjHujuyFyRbIvqIAXbs2C5iyt6p2A",
  authDomain: "mern-book-store-8d0f6.firebaseapp.com",
  projectId: "mern-book-store-8d0f6",
  storageBucket: "mern-book-store-8d0f6.firebasestorage.app",
  messagingSenderId: "664709286242",
  appId: "1:664709286242:web:76fc5e00412bfc9b45843b",
  measurementId: "G-XWLQMDZZWD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the app as the default export
export default app;
