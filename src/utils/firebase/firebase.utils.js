// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  query,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDMEj00keDlX24GjGQIvazlW5X26INglp4',
  authDomain: 'cb-chubby.firebaseapp.com',
  projectId: 'cb-chubby',
  storageBucket: 'cb-chubby.appspot.com',
  messagingSenderId: '872581881803',
  appId: '1:872581881803:web:6404f3ef95258d0546604e',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Authenticate with Google Account
const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()

//Sign in with Google Account Pop Up Window
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

//Sign in with Google Account Redirect
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

//Creates the collection of product categories
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  //uses the collection method to state that we are creating a new collection in the selected db
  const collectionRef = collection(db, collectionKey)

  // this batch call writes a batch to the db we've selected
  const batch = writeBatch(db)

  //multiple set events based on the amount of objects (forEach)
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log('done')
}

//Getting categories
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')

  //Generates a query based on this collection reference (collectionRef)
  const q = query(collectionRef)

  //^ Gives an object to snapshot. Fetches those document snapshots
  const querySnapshot = await getDocs(q)

  //Maps over the query snapshot docs and places it into an array, so now when getCategoriesAndDocuments is called, it returns the categories in an array format
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
}

//Creates the collection of users
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  //if the user DOES NOT exist CREATE / SET the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  //if the user does exist return userDocRef
  return userSnapshot
}

//Sign Up With Email and Password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

//Signs out logged in user
export const signOutUser = async () => await signOut(auth)

// Observes for Auth Changes (if a user signsin/signsup or logs out)
// Callback function is called everytime the auth state changes
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback)

// Checks if theres an active user thats already been authenticated
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe()
        resolve(userAuth)
      },
      reject
    )
    //^ onAuthStateChanged takes a third optional parameter which is a callback that runs whenever there is an error in the process when trying to fetch for the userAuth we will input reject
  })
}
