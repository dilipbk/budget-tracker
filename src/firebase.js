// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
  collection,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw1aTPaix0hZ_CVmx16eNGbQoPIOOL1HE",
  authDomain: "expense-tracker-1c50d.firebaseapp.com",
  projectId: "expense-tracker-1c50d",
  storageBucket: "expense-tracker-1c50d.appspot.com",
  messagingSenderId: "181370316392",
  appId: "1:181370316392:web:7101e2588fae1b912cfddd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});
export const auth = getAuth(app);

// collections
const feedbackConverter = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name,
      text: data.text,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
  toFirestore(data) {
    return {
      name: data.name,
      text: data.text,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
};
export const feedbacksCollection = collection(
  firestore,
  "feedbacks"
).withConverter(feedbackConverter);

export default app;
