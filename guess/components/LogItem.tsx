import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";

interface Props {
    children : JSX.Element | string
}

export default function LogItem({ children }: Props) {

    return (
        <View style={styles.logItem}>
            <Text>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logItem: {
        backgroundColor: Colors.accent500,
        padding: 5,
        borderWidth: 1,
        borderColor: "red",
        borderRadius: 10,
        margin: 5,
        alignItems: "center"
    }
})