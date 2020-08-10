import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import PurdueMapScreen from '../screens/Tab1PurdueMapScreen';
import Tab2LocationTrackerScreen from '../screens/Tab2LocationTrackerScreen';
import {BottomTabParamList, TabFourParamList, TabOneParamList, TabThreeParamList, TabTwoParamList} from '../types';
import Tab3NotificationScreen from "../screens/Tab3NotificationScreen";
import Tab4AboutUsScreen from "../screens/Tab4AboutUsScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="TabOne"
            tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
            <BottomTab.Screen
                name="TabOne"
                component={TabOneNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="TabTwo"
                component={TabTwoNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="TabThree"
                component={TabThreeNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="TabFour"
                component={TabFourNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
    return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="TabOneScreen"
                component={PurdueMapScreen}
                options={{headerTitle: 'Purdue University'}}
            />
        </TabOneStack.Navigator>
    );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="TabTwoScreen"
                component={Tab2LocationTrackerScreen}
                options={{headerTitle: 'Activity'}}
            />
        </TabTwoStack.Navigator>
    );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabThreeStack.Screen
                name="TabThreeScreen"
                component={Tab3NotificationScreen}
                options={{headerTitle: 'Notifications'}}
            />
        </TabTwoStack.Navigator>
    );
}

const TabFourStack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabFourStack.Screen
                name="TabFourScreen"
                component={Tab4AboutUsScreen}
                options={{headerTitle: 'Profile'}}
            />
        </TabTwoStack.Navigator>
    );
}
