import * as React from 'react';
import {
    ActivityIndicator,
    Appearance,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView, Platform
} from 'react-native';
import {Checkbox} from 'react-native-material-ui';

import {Text, View} from '../components/Themed';
import * as Calendar from "expo-calendar";
import FirebaseInterface from "../src/FirebaseInterface";
import Bubble from "../components/Bubble";
import firebase from "firebase";
import FirebaseCredential from "../src/FirebaseCredential";
import FirebaseUserConfig, {MyCalendar} from "../src/FirebaseUserConfig";

interface MyAccounts {
    type: number,
    title: string,
    signFunc: any,
    viewFunc: any,
    openFunc: any,
    used: boolean,
    providerId: string
}

const loginAvailable = [
    {type: 0, title: "Facebook ", signFunc: FirebaseCredential.loginWithFacebook, providerId: "facebook.com"},
    {type: 0, title: "Google ", signFunc: FirebaseCredential.loginWithGoogle, providerId: "google.com"},
    {type: 2, title: "Email ", providerId: "password"}
];

function ViewAccountModal(props: any) {
    const {visible, setModalVisible} = props;

    return (
        <View style={{backgroundColor: "#0000", ...styles.centeredView}}>
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    props.navigation.navigate("")
                    alert("Modal has been closed.");
                }}>
                <View style={{backgroundColor: "#0009", ...styles.centeredView}}>
                    <View style={styles.modalView}>
                    </View>
                </View>
            </Modal>
            {props.children}
        </View>
    )
}

export default class Tab4AboutUsScreen extends React.Component<any, any> {

    private isMounted: boolean;

    constructor(props: any) {
        super(props);
        this.state = {isReady: false, calendar: [], theme: "light", uid: null, login: [], modalVisible: false};
        this.isMounted = false;
    }

    async componentDidMount() {
        this.isMounted = true;
        const theme = await Appearance.getColorScheme();
        this.setState({theme: theme});

        try {
            // Load the Calendar
            const calendarRequest = await Calendar.requestCalendarPermissionsAsync();
            const reminderRequest = Platform.OS == "ios" ? await Calendar.requestRemindersPermissionsAsync(): {status: "granted"}
            let calendar: MyCalendar[] = [];
            if (calendarRequest.status === 'granted' && reminderRequest.status === 'granted') {
                const calendarsFromCalendar = await Calendar.getCalendarsAsync();
                calendar = Object.assign([], calendarsFromCalendar);
                for (let i = 0; i < calendar.length; i++) {
                    calendar[i].checked = false;
                }
            }

            // Load the Uid + Update State
            FirebaseCredential.onLoggedIn(async (user: firebase.User | null) => {
                // Set the Accounts
                const account = Tab4AboutUsScreen.AccountProviderChange(user);

                // Set Calendars
                const resultCalendars = await FirebaseUserConfig.getListCalendar(user, calendar);

                // Update State
                if (this.isMounted) {
                    this.setState({calendar: resultCalendars, login: account,isReady: true, loggedIn: user != null});
                }
            });

        } catch (e) {
            alert("Error Loading: " + e.toString());
            this.setState({isReady: true});
        }
    }

    static AccountProviderChange(user: any) {
        // Load the Accounts
        let accounts: MyAccounts[] = Object.assign([], loginAvailable);
        for (let i = 0; i < accounts.length; i++) {
            accounts[i].used = false;
            if (user != null) {
                for (let a of user.providerData) {
                    accounts[i].used = accounts[i].used || (accounts[i].providerId == a?.providerId);
                }
            }
        }
        return accounts;
    }

    CalendarItem(calendar: any) {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (this.state.loggedIn) {
                        calendar["checked"] = !calendar["checked"];
                        FirebaseUserConfig.sendListCalendar(this.state.calendar);
                    }
                    else {
                        calendar["checked"] = false;
                        alert("You Have to Sign In to Get Notified About COVID19 Events at Purdue Based Off Your Schedule");
                    }
                    this.setState({});
                }}
                style={{marginLeft: -5}}
            >
                <View style={{backgroundColor: calendar["color"], ...styles.calendarView}}>
                    <View style={{backgroundColor: "#0000", flex: 1}}>
                        <Text style={{
                            marginLeft: 10,
                            marginTop: "auto",
                            marginBottom: "auto",
                            fontSize: 15,
                            fontWeight: "bold"
                        }}>{calendar["title"]}</Text>
                    </View>
                    <View style={{backgroundColor: "#0000"}}>
                        <Checkbox label={""} checked={calendar["checked"] == null ? false : calendar["checked"]}
                                  value={""} disabled={true}
                                  onCheck={() => {
                                  }}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    LoginItem(login: MyAccounts): any {
        let item: MyAccounts = Object.assign({}, login);
        if (login.type == 1) {
            item.type = 0;
            item.signFunc = async () => {
                this.setState({modalVisible: true});
            }
            return (<ViewAccountModal
                visible={this.state.modalVisible}
                setModalVisible={(visible: boolean) => {
                    this.setState({modalVisible: visible});
                }}>
                {this.LoginItem(item)}
            </ViewAccountModal>);
        } else if (login.type == 2) {
            item.type = 0;
            item.openFunc = () => {
                this.props.navigation.navigate("Login");
            }
            return this.LoginItem(item);
        }
        return (
            <TouchableOpacity
                onPress={async () => {
                    if (!login.used && login.signFunc !== undefined) {
                        let handler = (value: any, error: any) => {
                            if (error != null)   {
                                alert(error.toString());
                                return;
                            }
                            let accounts = Tab4AboutUsScreen.AccountProviderChange(FirebaseInterface.user);
                            for (let a of accounts) {
                                if (a.providerId == item.providerId) {
                                    a.used = true;
                                }
                            }
                            this.setState({login: accounts});
                        }
                        await login.signFunc(handler).then();
                    }
                    if (login.used && login.viewFunc !== undefined) {
                        login.viewFunc().then(() => {

                        });
                    }
                    if (login.openFunc !== undefined) {
                        if (FirebaseInterface.user != null) {
                            alert("You have to Request a Reset on Password Since You Either " +
                                "Used a Facebook or Google Account to Sign Up."
                            );
                        }
                        else {
                            login.openFunc();
                        }
                    }
                }}>
                <View style={{...styles.calendarView, marginBottom: 2, marginTop: 2, marginLeft: -5}}>
                    <View style={{backgroundColor: "#0000", minHeight: 50, flex: 1}}>
                        <Text style={{
                            marginLeft: 10,
                            marginTop: "auto",
                            marginBottom: "auto",
                            fontSize: 15,
                            fontWeight: "bold"
                        }}>{login["title"]} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    LoginList(title: string, list: MyAccounts[], noItems: string) {
        const scheme = this.state.theme;
        return (
            <Bubble
                scheme={scheme}>
                <Text style={styles.title}>{title}</Text>
                {list.map((item: any) =>
                    this.LoginItem(item)
                )}
                {list.length == 0 &&
                <Text>{noItems}</Text>
                }
            </Bubble>
        )
    }

    componentWillMount() {
        this.isMounted = false;
    }

    getScheme(): string {
        return this.state.theme === "light" ? "#99999933" : "#FFFFFF77";
    }

    render() {
        if (!this.state.isReady) {
            return (
                <View style={styles.centeredView}>
                    <ActivityIndicator size={"large"}/>
                </View>
            );
        }
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <ScrollView style={{flex: 1}}>
                    {this.state.loggedIn &&
                    <Bubble
                        scheme={this.state.theme}>
                        <Text style={styles.title}>Logged In</Text>
                    </Bubble>}

                    {this.state.loggedIn &&
                    this.LoginList("Accounts Connected to Profile",
                        this.state.login.filter((i: MyAccounts) => i.used),
                        "No Connected Accounts")}

                    {this.state.loggedIn &&
                    this.LoginList("Add Accounts to Profile",
                        this.state.login.filter((i: MyAccounts) => !i.used),
                        "All Accounts Added to Profile")}

                    {!this.state.loggedIn &&
                    this.LoginList("Login/SignUp to Help Purdue Contact Trace",
                        this.state.login.filter((i: MyAccounts) => !i.used),
                        "Error: Cannot Connect Account for Contact Tracking")}

                    <Bubble
                        scheme={this.state.theme}>
                        <Text style={styles.title}>Calendars</Text>
                        {this.state.calendar.map((row: any) =>
                            this.CalendarItem(row)
                        )}
                        {this.state.calendar.length == 0 &&
                        <Text>No Calendars Found</Text>
                        }
                    </Bubble>

                    {this.state.loggedIn &&
                    <TouchableOpacity
                        style={{marginBottom: 10}}
                        onPress={() => {
                            alert("Logging Out");
                            FirebaseCredential.logout().then();
                            this.componentDidMount().then();
                        }}>
                        <Bubble
                            scheme={this.state.theme}>
                            <Text style={{
                                ...styles.title,
                                textAlign: "center",
                                alignSelf: "center",
                                justifyContent: "center"
                            }}>Logout </Text>
                        </Bubble>
                    </TouchableOpacity>
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
    },
    container: {
        flex: 1,
    },
    section: {
        margin: 2,
        padding: 5,
        borderRadius: 10,
        marginTop: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    calendarView: {
        margin: 5,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    modalView: {
        width: "100%",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    }
});
