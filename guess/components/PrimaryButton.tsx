import { ReactNode } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../constants/colors";

interface Props {
    children: JSX.Element | string,
    onPress: () => void
}

export default function PrimaryButton({ children, onPress }: Props) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden'
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    },
    pressed: {
        opacity: 0.75
    }
})