import firebase from 'firebase/app';

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLAZDCeoC6qpSwDalhnHK_T5Kriwx2pg8",
  authDomain: "oshsu-handbook.firebaseapp.com",
  projectId: "oshsu-handbook",
  storageBucket: "oshsu-handbook.appspot.com",
  messagingSenderId: "912502237305",
  appId: "1:912502237305:web:7249b1efd5b7e2f08f8ca8",
  measurementId: "G-CQTYWGZ3CK"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
