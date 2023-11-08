import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOicL9cDqJcMRUDKcv3UG2_VC6qCH0UnA",
  authDomain: "app-script-c1c9a.firebaseapp.com",
  projectId: "app-script-c1c9a",
  storageBucket: "app-script-c1c9a.appspot.com",
  messagingSenderId: "43617262979",
  appId: "1:43617262979:web:03e0aaf975a84e22566ab6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { db };
