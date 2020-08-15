import {NavigationContainer, DefaultTheme as NativeDefault, DarkTheme as NativeDark} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName, View} from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList} from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import LoginScreen from "../screens/LoginScreen";
import {Appbar} from "react-native-paper";
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {DefaultTheme, DarkTheme} from "react-native-paper";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    const isDark = colorScheme === 'dark';
    let defaultTheme = Object.assign({}, DefaultTheme);
    defaultTheme.colors.primary = "#CEB888";
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={isDark ? NativeDark : NativeDefault}>
            <RootNavigator theme={isDark? DarkTheme: defaultTheme}/>
        </NavigationContainer>
    );
}

const Header = (props: any) => {
    const {scene, previous, navigation} = props;
    let routeName = scene.route.name;
    let title = "";
    if (routeName == "Root" || routeName == "") {
        routeName = getFocusedRouteNameFromRoute(scene.route);
        if (routeName == "TabTwo") {
            title = "Activity";
        } else if (routeName == "TabThree") {
            title = "Notifications";
        } else if (routeName == "TabFour") {
            title = "Profile";
        } else {
            title = "Purdue University";
        }
    } else {
        const {options} = scene.descriptor;
        title = options.headerTitle !== undefined ? options.headerTitle :
            options.title !== undefined ? options.title : "";
    }
    const theme = props.theme;
    return (
        <Appbar.Header theme={{colors: {primary: theme.colors.primary}}}>
            {scene.route.name != "Root" &&
            <Appbar.BackAction
                onPress={() => {
                navigation.goBack();
            }}/>
            }
            <Appbar.Content title={title}/>
        </Appbar.Header>
    );
};

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(props: any) {
    return (
        <Stack.Navigator
            headerMode={"screen"}
            screenOptions={{
                header: ({scene, previous, navigation}) => (
                    <Header scene={scene} previous={previous} navigation={navigation} theme={props.theme}/>
                )
            }}>
            <Stack.Screen name="Root" component={BottomTabNavigator}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerTitle: "Enter Your Credentials"}}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
        </Stack.Navigator>
    );
}
