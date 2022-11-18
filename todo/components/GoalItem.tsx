import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface Props {
    id: string,
    text: string,
    onDelete: (id: string) => void
}
export default function GoalItem({ id, text, onDelete }: Props) {


    function onPress() {
        console.log("Goal Item Deleting");
        onDelete(id)
    }

    return (
        <Pressable onPress={onPress} style={(pressedData) => pressedData.pressed && styles.pressedItem }>
            <View style={styles.goalItem}>
                <Text style={styles.goalText}>{text}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({

    goalsContainer: {
        flex: 5
    },
    goalItem: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 6,
        backgroundColor: "blue",
        padding: 5,
        marginBottom: 5,
        color: "white"
    },
    goalText: {
        color: "white"
    },
    pressedItem: {
        opacity: 0.5
    }


})