import * as React from 'react';
import {Appearance, Button, ScrollView, StyleSheet, useColorScheme} from 'react-native';
import {Checkbox} from 'react-native-material-ui';

import {Text, View} from '../components/Themed';
import * as Calendar from "expo-calendar";
import {useEffect} from "react";
const login = [{title: "Facebook"}, {title: "Google"}, {title: "Email"}];

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
                let calendar = Object.assign([], calendarsFromCalendar);
                for (let i in calendar) {
                    calendar["checked"] = false;
                }
                this.setState({calendar: calendar});
            }
        })();
        const theme = Appearance.getColorScheme();
        this.setState({theme: theme});
    }

    render() {
        const scheme = this.state.theme == "light"? "#00000077": "#FFFFFF77";
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
                    </View>
                </ScrollView>
            </View>
        );
    }

    CalendarList(calendar: any) {
        return (
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
                    <Checkbox label={""} onCheck={(value) => {
                        calendar["checked"] = value;
                        this.setState({});
                    }} checked={calendar["checked"]} value={calendar}/>
                </View>
            </View>
        );
    }

    LoginList(login: any) {
        return (
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
