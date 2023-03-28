import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {

};

// init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
