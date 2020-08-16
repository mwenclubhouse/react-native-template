import firebase from "firebase";
import FirebaseInterface from "./FirebaseInterface";
import FirebaseCredential from "./FirebaseCredential";

export interface MyCalendar {
    title: string,
    checked: boolean
}

class FirebaseUserConfig {

    static sendListCalendar(listCalendars: MyCalendar[]) {
        const handler = (user: firebase.User | null) => {
            let database: firebase.firestore.Firestore = FirebaseInterface.shared.getCollectionDatabase();
            if (user != null && database != null) {
                let docRef = database.collection("usersConfig").doc(user.uid);
                docRef.set({
                    "calendars": listCalendars
                }).catch((e) => {
                    alert(e.toString());
                });
            }
        };
        FirebaseCredential.onLoggedIn(handler);
    }

    static async getListCalendar(user: firebase.User | null, listCalendarByUser: MyCalendar[]) {
        let database: firebase.firestore.Firestore = FirebaseInterface.shared.getCollectionDatabase();
        if (user != null && database != null) {
            let docRef = database.collection("usersConfig").doc(user.uid);
            try {
                let data = await docRef.get();
                if (data.exists) {
                    let databaseCalendars: MyCalendar[] = data.data()?.calendars;
                    for (let i = 0; i < listCalendarByUser.length; i++) {
                        for (let c of databaseCalendars) {
                            if (listCalendarByUser[i].title === c.title) {
                                listCalendarByUser[i].checked = c.checked;
                            }
                        }
                    }
                }
            } catch (e) {
                alert(e.toString());
            }
        }
        return listCalendarByUser;
    }

}
export default FirebaseUserConfig