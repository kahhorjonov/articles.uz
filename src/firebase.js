import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCsjWqdKWLZMA0qHeSST4GDhEZvzbVcGEE",
  authDomain: "fir-tutorila-db.firebaseapp.com",
  databaseURL: "https://fir-tutorila-db-default-rtdb.firebaseio.com",
  projectId: "fir-tutorila-db",
  storageBucket: "fir-tutorila-db.appspot.com",
  messagingSenderId: "522435963613",
  appId: "1:522435963613:web:bda6424ea10550f3fe0934",
  measurementId: "G-F8EVXWEDM5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
