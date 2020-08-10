import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import { Checkbox } from 'react-native-material-ui';

import {Text, View} from '../components/Themed';
import * as Calendar from "expo-calendar";

export default class Tab2LocationTrackerScreen extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {calendar: []};
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
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{flex: 1}}>
                    <Text style={styles.title}>Calendars</Text>
                    {this.state.calendar.map((row: any) =>
                        this.CalendarList(row)
                    )}
                </ScrollView>
            </View>
        );
    }

    CalendarList(calendar: any) {
        return (
            <View style={{backgroundColor: calendar["color"], ...styles.calendarView}} >
                <Text style={{flex: 10}}>{calendar["title"]}</Text>
                <Checkbox style={{container: {marginTop: -15, marginBottom: -15, marginRight: 5, padding: 0}}} label={""}  onCheck={(value) => {
                    calendar["checked"] = value;
                    this.setState({});
                }} checked={calendar["checked"]} value={calendar}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        padding: 20,
        margin: 5,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
