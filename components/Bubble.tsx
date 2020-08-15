import {Text, View} from "./Themed";
import * as React from 'react';
import {
    StyleSheet,
} from 'react-native';

export default function Bubble(props: any) {

    const scheme = props.scheme === "light" ? "#99999933" : "#FFFFFF77";

    return (
        <View style={{backgroundColor: scheme, ...styles.section}}>
            <View style={{marginLeft: 5, backgroundColor:  "#0000"}}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        margin: 2,
        padding: 5,
        borderRadius: 10,
        marginTop: 10
    }
})

