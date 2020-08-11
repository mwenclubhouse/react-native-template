import * as React from 'react';
import {Appearance, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Checkbox} from 'react-native-material-ui';

import {Text, View} from '../components/Themed';
import * as Permissions from "expo-permissions";
import * as Calendar from "expo-calendar";
import firebaseInterface from "../src/firebaseInterface";
const login = [{title: "Facebook", func: firebaseInterface.loginWithFacebook}, {title: "Google", func: null}, {title: "Email", func: null}];

interface MyCalendar{
    title: string,
    checked: boolean
}

export default class Tab2LocationTrackerScreen extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {calendar: [], theme: "light"};
    }

    componentDidMount() {
        (async () => {
            const {status} = await Calendar.requestCalendarPermissionsAsync();
            if (status === 'granted') {
                const calendarsFromCalendar = await Calendar.getCalendarsAsync();
                let calendar: MyCalendar[] = Object.assign([], calendarsFromCalendar);
                for (let i = 0; i < calendar.length; i++) {
                    calendar[i].checked = true;
                }
                this.setState({calendar: calendar});
            }
        })();
        const theme = Appearance.getColorScheme();
        this.setState({theme: theme});
    }

    CalendarList(calendar: any) {
        return (
            <TouchableOpacity
            onPress={() => {
                calendar["checked"] = !calendar["checked"];
                this.setState({});
            }}>
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
                        <Checkbox label={""} checked={calendar["checked"]} value={calendar} disabled={true} 
                         onCheck={() => {}}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    LoginList(login: any) {
        return (
            <TouchableOpacity
                onPress={ async () => {
                    if (login.func != null) {
                        await login.func();
                    }
                }}>
                <View style={{...styles.calendarView}}>
                    <View style={{backgroundColor: "#0000", minHeight: 50}}>
                        <Text style={{
                            marginLeft: 10,
                            marginTop: "auto",
                            marginBottom: "auto",
                            fontSize: 15,
                            fontWeight: "bold"
                        }}>{login["title"]}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const scheme = this.state.theme == "light"? "#99999933": "#FFFFFF77";
        return (
            <View style={styles.container}>
                <ScrollView style={{flex: 1}}>
                    <View style={{backgroundColor: scheme, ...styles.section}}>
                        <Text style={{ marginLeft: 5, ...styles.title}}>Tracking Account</Text>
                        {login.map((item: any) =>
                            this.LoginList(item)
                        )}
                    </View>
                    <View style={{backgroundColor: scheme, ...styles.section}}>
                        <Text style={{ marginLeft: 5, ...styles.title}}>Calendars</Text>
                        {this.state.calendar.map((row: any) =>
                            this.CalendarList(row)
                        )}
                        {this.state.calendar.length == 0 &&
                            <Text style={{marginLeft: 5}}>No Calendars Found</Text>
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    }
});
