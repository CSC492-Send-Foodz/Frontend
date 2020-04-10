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

database.auth().onAuthStateChanged(async user => {
  
  if (user) {
    var currentUser = firebase.auth().currentUser;
    console.log("currentUser", currentUser)
    await currentUser.getIdToken(true)
      .then(async token => {
        console.log("token", token)
        store.state.token = token;
        var date = new Date();
        date.setHours(date.getHours() + 1);
        store.state.tokenExpiry = date;
      });

    store.state.id = user.uid;
    store.state.email = user.email;

    
    if (currentUser.metadata.creationTime !== currentUser.metadata.lastSignInTime) {
      await store.dispatch("postCheckAccountType", user.uid).then(async response => {
        if (response.data !== store.state.userType) {
          store.state.userType=response.data==="GroceryStores"?"Grocery Store":"Food Bank";
        }
      }).catch(error => {
        console.log(error)
        store.state.loadingInProgress = false;
        signout();
      });
    }

    if (router.currentRoute.name === "login"||router.currentRoute.name==="signup") {
      store.state.loadingInProgress = false;
      router.push(store.state.userType === "Grocery Store" ? {name:"inventory",params:{id:user.uid}} : {name:"availableGroceryStores"});
    }
  } else {
    store.state.id = "";
    store.state.email = "";
    store.state.token = "";
		store.state.inventoryItems = [];
		store.state.groceryStores = [];
		store.state.activeOrders = [];
		store.state.userType = "";
		store.state.shoppingCart = [];
		store.state.shoppingCartGroceryStoreId = "";
		store.state.showPopupStartNewShoppingCart = false;
		store.state.showCheckoutError = false;
    store.state.showSuccessfullOrderPlace = false;
    store.state.loadingInProgress = false;
    
    if (router.currentRoute.name !== "login") {
      router.push({ name: "login" });
    }
  }
});

async function signin(email, password) {
  database.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(async function () {
    return database.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        if (error.code === "auth/wrong-password") {
          return "Login Failed";
        } else {
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
