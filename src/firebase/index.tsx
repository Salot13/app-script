import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1XTX7L3fnfUssP02tGo5FR57td7TwY7o",
  authDomain: "app-script-462ed.firebaseapp.com",
  projectId: "app-script-462ed",
  storageBucket: "app-script-462ed.appspot.com",
  messagingSenderId: "777701098978",
  appId: "1:777701098978:web:719cdfe5b2ec7e255565bb",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { db };
