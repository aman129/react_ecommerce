import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBCPTNH9kz-KIWE1nQ2MYkEGmXZKxFkVhM",
    authDomain: "react-ecommerce-4b77b.firebaseapp.com",
    databaseURL: "https://react-ecommerce-4b77b.firebaseio.com",
    projectId: "react-ecommerce-4b77b",
    storageBucket: "react-ecommerce-4b77b.appspot.com",
    messagingSenderId: "252176288938",
    appId: "1:252176288938:web:f34cb9775202fbb473d4d3",
    measurementId: "G-J7117CDHB9"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.messsage);
      }
    }
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;