import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: "evernote-clone-5acd4",
  storageBucket: process.env.REACT_APP_STRAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_STRAGE_BUCKETREACT_APP_APP_ID
};
const firebaseApp = firebase.initializeApp(config);
export const firestore = firebaseApp.firestore();