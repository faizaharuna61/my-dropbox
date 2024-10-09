import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAS83QqdG3mDPCtUeN3KlCul8bGWGF07jg",
  authDomain: "boxdrop-34d75.firebaseapp.com",
  projectId: "boxdrop-34d75",
  storageBucket: "boxdrop-34d75.appspot.com",
  messagingSenderId: "1000975427347",
  appId: "1:1000975427347:web:30db194296af2e25e51ce6"
})

const firestore = firebaseApp.firestore()

export const db = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: doc => ({ id: doc.id, ...doc.data() }),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
}

export const storage = firebaseApp.storage()
export const auth = firebaseApp.auth()

export default firebaseApp
