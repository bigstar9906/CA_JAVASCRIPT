import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore/lite'

//import firebase from 'firebase'
//import "firebase/firestore"
//
var firebaseConfig = {
  apiKey: "AIzaSyA__w5IIlfbftzjm8PJuSqRC0nyLuHRdJk",
  authDomain: "runstagram-752e9.firebaseapp.com",
  projectId: "runstagram-752e9",
  storageBucket: "runstagram-752e9.appspot.com",
  messagingSenderId: "609901345768",
  appId: "1:609901345768:web:3da3f11f92aafcf193425d",
  measurementId: "G-5S98ZHES7D"
};
//
//// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);




createApp(App).mount('#app')
