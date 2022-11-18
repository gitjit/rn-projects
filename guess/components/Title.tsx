import { ReactNode } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../constants/colors";

interface Props {
    children: JSX.Element | string,
    style?: object
}

export default function Title({children, style}:Props) {
    return (
        <Text style={[styles.textHeader, style]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    textHeader: {
        borderWidth: 2,
        borderColor: Colors.accent500,
        padding: 12,
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.accent500,
        marginTop: 25,
        textAlign:'center'
    },
})