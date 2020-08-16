import * as firebase from "firebase";
import "firebase/firestore"
import * as GoogleSignIn from "expo-google-sign-in";
import * as Facebook from "expo-facebook";
import FirebaseInterface from "./FirebaseInterface";

function isAsync(fn: any): boolean {
    return fn.constructor.name === "AsyncFunction"
}

export default class FirebaseCredentials {

    private static runHandler(user: firebase.User | null, handler: any) {
        if (isAsync(handler)) {
            handler(user).then();
        } else {
            handler(user);
        }
    }

    static onLoggedIn(handler: Function) {
        if (FirebaseInterface.user == null) {
            FirebaseInterface.shared.getFirebase().auth()
                .onAuthStateChanged((user: firebase.User | null) => {
                    FirebaseInterface.user = user;
                    FirebaseCredentials.runHandler(user, handler);
                });
        } else {
            FirebaseCredentials.runHandler(FirebaseInterface.user, handler);
        }
    }

    static async loginWithGoogle(handler: any) {
        try {
            await GoogleSignIn.initAsync();
            await GoogleSignIn.askForPlayServicesAsync();
            const result = await GoogleSignIn.signInAsync();
            if (result.type === 'success') {
                alert("Successfully Connected Google Account: " + result.user?.email);
                const credentials = FirebaseInterface.shared.getFirebase().auth.GoogleAuthProvider.credential(result.user?.auth?.idToken);
                await FirebaseCredentials.loginHandler(credentials, handler);
            } else {
                let e: Error = new Error("Login: Cannot Login with Google");
                handler(null, e);
            }
        } catch (e) {
            handler(null, e);
        }
    }

    static async loginWithFacebook(handler: any) {
        await Facebook.initializeAsync(
            '308701397014423',
        );

        const result = await Facebook.logInWithReadPermissionsAsync(
            {permissions: ['public_profile', 'email']}
        );

        if (result.type === 'success') {
            // Build Firebase credential with the Facebook access token.
            const credential = FirebaseInterface.shared.getFirebase().auth.FacebookAuthProvider.credential(result.token);
            await FirebaseCredentials.loginHandler(credential, handler);
        } else {
            let e: Error = new Error("Error: Cannot Login Into Facebook");
            handler(null, e);
        }
    }

    private static async loginHandler(credential: any, handler: any) {
        let user = FirebaseInterface.shared.getFirebase().auth().currentUser;
        if (user == null) {
            FirebaseInterface.shared.getFirebase().auth().signInWithCredential(credential).catch((error: any) => {
                handler(null, error);
            }).then((result: firebase.auth.UserCredential) => {
                handler(result, null);
            });
        } else {
            let containsProvider: boolean = false;
            for (let i of FirebaseInterface.shared.getCurrentUser().providerData) {
                containsProvider = containsProvider || (i.providerId == credential.providerId);
            }
            if (!containsProvider) {
                user.linkWithCredential(credential).then((linkResult: firebase.auth.UserCredential) => {
                    if (linkResult.credential) {
                        firebase.auth().signInWithCredential(linkResult.credential)
                            .then((result: firebase.auth.UserCredential) => {
                                handler(result, null);
                            }).catch((error: any) => handler(null, error));
                    }
                }).catch((error: any) => {
                    handler(null, error);
                })
            } else {
                let cleanerName = "";
                if (credential.providerId == "password") {
                    cleanerName = "Email Account";
                } else if (credential.providerId == "google.com") {
                    cleanerName = "Google Account";
                } else if (credential.providerId == "facebook.com") {
                    cleanerName = "Facebook Account";
                }
                let e: Error = new Error("Cannot Link More Than 1 " + cleanerName + " to account");
                handler(null, e);
            }
        }
    }

    static async loginWithEmailAndPassword(email: string, password: string, handler: any) {
        const credential = FirebaseInterface.shared.getFirebase().auth.EmailAuthProvider.credential(email, password);
        await FirebaseCredentials.loginHandler(credential, handler);
    }

    static async signUpWithEmailAndPassword(email: string, password: string) {
        await FirebaseInterface.shared.getFirebase().auth().createUserWithEmailAndPassword(email, password).catch((error: any) => {
            alert(error.toString());
        });
    }

    static async logout() {
        FirebaseInterface.shared.getFirebase().auth().signOut().catch((error: any) => {
            alert(error.toString());
        })
    }
}