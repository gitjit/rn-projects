import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/colors";

interface Props {
    children: JSX.Element | JSX.Element[] | string,
    style?: object
}

export default function Card({children, style}:Props) {
    return (
        <View style={[styles.inputContainer,style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "red",
        padding: 20,
        marginTop: 15,
        width: "80%",
        alignItems: "center",
        backgroundColor: Colors.primary700, //"#3b021f",
        elevation: 4, // android shadow
        shadowColor: 'black' // iOS shadow
    }
})

