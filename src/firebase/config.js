import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBqzBt21Q4UDTlicKSm8xexi-HGiYcKth8",
    authDomain: "simple-tasks-17ad1.firebaseapp.com",
    projectId: "simple-tasks-17ad1",
    storageBucket: "simple-tasks-17ad1.appspot.com",
    messagingSenderId: "758941660933",
    appId: "1:758941660933:web:bb1fb6dffd73bbecece96c"
};

// init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();

export { projectFirestore };