import * as firebase from 'firebase';
import "firebase/auth";
import * as Facebook from "expo-facebook";
import * as GoogleSignIn from 'expo-google-sign-in';

const config = {
    apiKey: "AIzaSyD-PDKxqvJnEMwr_QYNiORAreNraCAHuZM",
    authDomain: "purdue-contact-tracing.firebaseapp.com",
    databaseURL: "https://purdue-contact-tracing.firebaseio.com",
    storageBucket: "purdue-contact-tracing.appspot.com",
    projectId: "purdue-contact-tracing"
};

class FirebaseInterface {
    static s: boolean = false;
    static shared: FirebaseInterface;
    static user: firebase.User | null;

    googleProvider: any;
    facebookProvider: any;

    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.googleProvider = new firebase.auth.GoogleAuthProvider();
        this.facebookProvider = new firebase.auth.FacebookAuthProvider();
    }

    getCurrentUser(): any {
        return firebase.auth().currentUser;
    }

    getFirebase(): any {
        return firebase;
    }

    getRealTimeDatabase(): firebase.database.Database {
        return firebase.database();
    }

    getCollectionDatabase(): firebase.firestore.Firestore {
        return firebase.firestore();
    }

    static getRealTimeDatabase() {
        return FirebaseInterface.shared.getRealTimeDatabase();
    }

    static getCollectionDatabase(): firebase.firestore.Firestore {
        return FirebaseInterface.shared.getCollectionDatabase();
    }

    static getCurrentUser() {
        if (FirebaseInterface.shared.getFirebase().auth().currentUser != null) {
            return FirebaseInterface.shared.getFirebase().auth().currentUser?.uid;
        }
        return null;
    }
}

FirebaseInterface.shared = new FirebaseInterface();
export default FirebaseInterface;
