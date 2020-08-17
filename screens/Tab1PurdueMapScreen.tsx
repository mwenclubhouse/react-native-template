import * as React from 'react';
import {Dimensions, KeyboardAvoidingView, NativeModules, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import {Text, View} from '../components/Themed';
import Bubble from "../components/Bubble";
import useColorScheme from "../hooks/useColorScheme";
import {TextInput} from "react-native-paper";
import FirebaseCredential from "../src/FirebaseCredential";
import firebase from "firebase";
// import MapView from 'react-native-maps';

export default function PurdueMapScreen() {

    const [loggedIn, setState] = React.useState(false);
    const [temp, setTemp] = React.useState("");

    const {ToastModule, BluetoothModule} = NativeModules;

    function _showToast() {
        if (BluetoothModule == null) {
            ToastModule.showToast("There is no bluetooth module found")
        }
        else {
            FirebaseCredential.onLoggedIn((user: firebase.User | null) => {
                if (user != null) {
                    BluetoothModule.bindManger();
                }
            });
        }
    }

    FirebaseCredential.onLoggedIn(async (user: firebase.User | null) => {
        setState(user != null);
    });

    return (
        <KeyboardAvoidingView enabled behavior={undefined} style={{flex: 1}}
        >
        <ScrollView>
            <Text style={styles.title}>Purdue University</Text>
            <TouchableOpacity
                onPress={() => {
                    _showToast();
                }}>
                <Bubble
                    scheme={useColorScheme()}>
                    <Text style={styles.title}>Tap Me for Toast Message</Text>
                </Bubble>
            </TouchableOpacity>
            {/*<MapView style={styles.mapStyle}/>*/}
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: Math.round(Dimensions.get('window').height)
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
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    textInputStyle: {
        width: "100%",
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 10
    },
});
