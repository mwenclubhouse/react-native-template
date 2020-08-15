import * as React from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput, Button} from "react-native-paper";
import {Text, View} from '../components/Themed';
import Bubble from "../components/Bubble";
import useColorScheme from "../hooks/useColorScheme";
import FirebaseInterface from "../src/FirebaseInterface";
import FirebaseCredential from "../src/FirebaseCredential";

export default function LoginScreen(props: any) {
    const [email, onChangeEmail] = React.useState('');
    const [pwd1, onChangePWD1] = React.useState('');
    const [pwd2, onChangePWD2] = React.useState('');

    const scheme = useColorScheme();
    const [isSigningUp, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSigningUp);

    return (
        <KeyboardAvoidingView style={styles.container} behavior={undefined} enabled>
        <ScrollView >
                    <Bubble
                        scheme={scheme}>
                        <TouchableOpacity
                            onPress={onToggleSwitch}>
                            <Text style={{
                                marginLeft: "auto",
                                marginRight: "auto", ...styles.title
                            }}>{isSigningUp ? "Tap to Sign In Instead" : "Tap to Sign Up Instead"}</Text>
                        </TouchableOpacity>
                    </Bubble>
                    <Bubble
                        scheme={scheme}>
                        <Text>Email</Text>
                        <TextInput
                            label={"Email"}
                            value={email}
                            keyboardType={"email-address"}
                            onChangeText={(v: string) => onChangeEmail(v)}
                            style={styles.textInputStyle}
                        />
                        <Text>Password</Text>
                        <TextInput
                            label={"Password"}
                            keyboardType={"visible-password"}
                            value={pwd1}
                            onChangeText={(v: string) => onChangePWD1(v)}
                            style={styles.textInputStyle}
                        />
                        {isSigningUp && (
                            <View style={{backgroundColor: "#0000"}}>
                                <Text>Password Again</Text>
                                <TextInput
                                    label={"Password Again"}
                                    keyboardType={"visible-password"}
                                    value={pwd2}
                                    onChangeText={(v: string) => onChangePWD2(v)}
                                    style={styles.textInputStyle}
                                />
                            </View>
                        )}
                    </Bubble>
                    <Bubble
                        style={scheme}>
                        <Button onPress={() => props.navigation.goBack()}>
                            Cancel
                        </Button>
                        <Button onPress={() => {
                            if (isSigningUp) {
                                if (pwd1 === pwd2) {
                                    FirebaseCredential.signUpWithEmailAndPassword(email, pwd1).then(props.navigation.goBack());
                                } else {
                                    alert("Passwords Do Not Match");
                                }
                            } else {
                                let handler = (value: any, error: any) => {
                                    props.navigation.goBack();
                                }
                                FirebaseCredential.loginWithEmailAndPassword(email, pwd1, handler).then();
                            }
                        }}>
                            {isSigningUp ? "SignUp" : "SignIn"}
                        </Button>
                    </Bubble>
                </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textInputStyle: {
        width: "100%",
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 10
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    }
});

