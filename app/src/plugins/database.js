import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import router from '../router/index'
import store from "../../store/index";

Vue.use(firestorePlugin)

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDrRUKi6kby_GoIb3H6l1m7AkX0Kg7_zPg",
  authDomain: "send-foodz-1a677.firebaseapp.com",
  databaseURL: "https://send-foodz-1a677.firebaseio.com",
  projectId: "send-foodz-1a677",
  storageBucket: "send-foodz-1a677.appspot.com",
  messagingSenderId: "813090925215",
  appId: "1:813090925215:web:15e62c6478e7e58837d0aa",
  measurementId: "G-YCKNHS7GM7"
};

const database = firebase.initializeApp(firebaseConfig)

database.auth().onAuthStateChanged(user => {
  if (user) {
    store.state.id = user.uid;
    store.state.email = user.email;
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(token => {
        store.state.token = token;
        var date = new Date;
        date.setHours(date.getHours() + 1);
        store.state.tokenExpiry = date;
      });
    router.push("../");
  } else {
    store.state.id = "";
    store.state.email = "";
    store.state.token = "";
    console.log("logout");
  }
});

async function signin(email, password) {
  return database.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(async function () {
    return database.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        if (error.code === "auth/wrong-password") {
          return "Login Failed";
        } else {
          console.log(error.message);
          return "Something went wrong. Try again later";
        }
      });
  });
}

async function signup(email, password) {
  return database.auth().createUserWithEmailAndPassword(email, password)
    .catch(error => {
      return error.message;
    });
}

async function refreshToken() {
  await firebase
    .auth()
    .currentUser.getIdToken(true)
    .then(async token => {
      store.state.token = token;
      var date = new Date;
      date.setHours(date.getHours() + 1);
      store.state.tokenExpiry = date;
    });
}

function signout() {
  database.auth().signOut();
}

function firestore() {
  return database.firestore()
}

export default { database, signin, signup, refreshToken, signout, firestore }; 
