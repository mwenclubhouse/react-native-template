import * as React from 'react';
import {Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import {Text, View} from '../components/Themed';
import FirebaseInterface from "../src/FirebaseInterface";
import Bubble from "../components/Bubble";
import useColorScheme from "../hooks/useColorScheme";
import {TextInput} from "react-native-paper";
import firebase from "firebase";
// import MapView from 'react-native-maps';

export default function PurdueMapScreen() {

    const [loggedIn, setState] = React.useState(false);
    const [temp, setTemp] = React.useState("");

    // FirebaseInterface.onLoggedIn((user: firebase.User | null) => {
    //     setState(user != null);
    // });

    return (
        <KeyboardAvoidingView enabled behavior={undefined} style={{flex: 1}}
        >
        <ScrollView>
            <Text style={styles.title}>Purdue University</Text>
            <Bubble
                scheme={useColorScheme()}>
                <Text style={{fontSize: 20}}>
                    {loggedIn &&
                    "You Are Logged In"
                    }
                    {!loggedIn &&
                    "You Are Not Logged In"
                    }
                </Text>
                <TextInput
                    label={"Test Keyboard"}
                    value={temp}
                    onChangeText={(v: string) => setTemp(v)}
                    style={styles.textInputStyle}
                />
            </Bubble>
            <Bubble
                scheme={useColorScheme()}>
                <Text style={{fontSize: 20}}>
                    {loggedIn &&
                    "You Are Logged In"
                    }
                    {!loggedIn &&
                    "You Are Not Logged In"
                    }
                </Text>
                <TextInput
                    label={"Test Keyboard"}
                    value={temp}
                    onChangeText={(v: string) => setTemp(v)}
                    style={styles.textInputStyle}
                />
            </Bubble>
            <Bubble
                scheme={useColorScheme()}>
                <Text style={{fontSize: 20}}>
                    {loggedIn &&
                    "You Are Logged In"
                    }
                    {!loggedIn &&
                    "You Are Not Logged In"
                    }
                </Text>
                <TextInput
                    label={"Test Keyboard"}
                    value={temp}
                    onChangeText={(v: string) => setTemp(v)}
                    style={styles.textInputStyle}
                />
            </Bubble>
            <Bubble
                scheme={useColorScheme()}>
                <Text style={{fontSize: 20}}>
                    {loggedIn &&
                    "You Are Logged In"
                    }
                    {!loggedIn &&
                    "You Are Not Logged In"
                    }
                </Text>
                <TextInput
                    label={"Test Keyboard"}
                    value={temp}
                    onChangeText={(v: string) => setTemp(v)}
                    style={styles.textInputStyle}
                />
            </Bubble>
            <Bubble
                scheme={useColorScheme()}>
                <Text style={{fontSize: 20}}>
                    {loggedIn &&
                    "You Are Logged In"
                    }
                    {!loggedIn &&
                    "You Are Not Logged In"
                    }
                </Text>
                <TextInput
                    label={"Test Keyboard"}
                    value={temp}
                    onChangeText={(v: string) => setTemp(v)}
                    style={styles.textInputStyle}
                />
            </Bubble>
            <Bubble
                scheme={useColorScheme()}>
                <Text style={{fontSize: 20}}>
                    {loggedIn &&
                    "You Are Logged In"
                    }
                    {!loggedIn &&
                    "You Are Not Logged In"
                    }
                </Text>
                <TextInput
                    label={"Test Keyboard"}
                    value={temp}
                    onChangeText={(v: string) => setTemp(v)}
                    style={styles.textInputStyle}
                />
            </Bubble>
            <Bubble
                scheme={useColorScheme()}>
                <Text style={{fontSize: 20}}>
                    {loggedIn &&
                    "You Are Logged In"
                    }
                    {!loggedIn &&
                    "You Are Not Logged In"
                    }
                </Text>
                <TextInput
                    label={"Test Keyboard"}
                    value={temp}
                    onChangeText={(v: string) => setTemp(v)}
                    style={styles.textInputStyle}
                />
            </Bubble>
            <Bubble
                scheme={useColorScheme()}>
                <Text style={{fontSize: 20}}>
                    {loggedIn &&
                    "You Are Logged In"
                    }
                    {!loggedIn &&
                    "You Are Not Logged In"
                    }
                </Text>
                <TextInput
                    label={"Test Keyboard"}
                    value={temp}
                    onChangeText={(v: string) => setTemp(v)}
                    style={styles.textInputStyle}
                />
            </Bubble>
            <Bubble
                scheme={useColorScheme()}>
                <Text style={{fontSize: 20}}>
                    {loggedIn &&
                    "You Are Logged In"
                    }
                    {!loggedIn &&
                    "You Are Not Logged In"
                    }
                </Text>
                <TextInput
                    label={"Test Keyboard"}
                    value={temp}
                    onChangeText={(v: string) => setTemp(v)}
                    style={styles.textInputStyle}
                />
            </Bubble>
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
