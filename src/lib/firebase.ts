import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC1-zgdj3JG6dKzHfaonfnEwAPxzNHsULY",
    authDomain: "harvestguard.firebaseapp.com",
    projectId: "harvestguard",
    storageBucket: "harvestguard.firebasestorage.app",
    messagingSenderId: "1001684743908",
    appId: "1:1001684743908:web:758d1d75a8d5b56a17def1",
    measurementId: "G-TQ903V7BFE"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
