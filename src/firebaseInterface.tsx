import * as firebase from 'firebase';
import "firebase/auth";
import * as Facebook from "expo-facebook";

const config = {
    apiKey: "AIzaSyD-PDKxqvJnEMwr_QYNiORAreNraCAHuZM",
    authDomain: "purdue-contact-tracing.firebaseapp.com",
    databaseURL: "https://purdue-contact-tracing.firebaseio.com",
    storageBucket: "purdue-contact-tracing.appspot.com"
};

class firebaseInterface {
    static d: any;
    static s: boolean = false;

    static setup() {
        firebase.initializeApp(config);
        firebaseInterface.d = firebase.database();
        firebaseInterface.s = true;
    }

    static getDatabase() {
        if (firebaseInterface.d == null) {
            firebaseInterface.setup();
        }
        return firebaseInterface.d;
    }

    static async loginWithFacebook() {
        if (!firebaseInterface.s) {
            firebaseInterface.setup();
        }
        await Facebook.initializeAsync(
            '308701397014423',
        );

        const result = await Facebook.logInWithReadPermissionsAsync(
            { permissions: ['public_profile'] }
        );

        if (result.type === 'success') {
            // Build Firebase credential with the Facebook access token.
            console.log(result.token);
            const credential = firebase.auth.FacebookAuthProvider.credential(result.token);

            // Sign in with credential from the Facebook user.
            firebase.auth().signInWithCredential(credential).catch((error) => {
                // Handle Errors here.
                console.log(error);
            });
        }
    }
}

export default firebaseInterface;
