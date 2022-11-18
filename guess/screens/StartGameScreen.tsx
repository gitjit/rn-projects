import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import Title from "../components/Title";
import Colors from "../constants/colors";

interface Props {
    userConfirmedInputNumber: (num: number) => void
}

export default function StartGameScreen({ userConfirmedInputNumber }: Props) {

    const [enteredNumber, setEnteredNumber] = useState('');

    function numberInputHandler(enteredText: string) {
        setEnteredNumber(enteredText);
    }

    function confirmInputHandler() {
        console.log("Inside Confirm input handler");
        const chosenNumber = parseInt(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber >= 99) {
            Alert.alert(
                'Invalid number !',
                'Number has to be a number between 1 and 99.',
                [{ text: 'Ok', style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        }
        console.log('Valid Number' + chosenNumber);
        userConfirmedInputNumber(chosenNumber);
    }

    function resetInputHandler() {
        console.log("Resetp input handler");
        setEnteredNumber('');
    }

    return (
        <View style={styles.container}>
            <Title style={styles.outTitle}>Guess My Number</Title>
            {/* <View style={styles.inputContainer}> */}
            <Card>
                <Text style={styles.inputTitle}>Enter a Number</Text>
                <TextInput style={styles.textInput} maxLength={2} keyboardType="number-pad" autoCapitalize="none" autoCorrect={false} value={enteredNumber} onChangeText={numberInputHandler} />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 25,
        // borderWidth:1,
        // borderColor:"#fff"

    },
    inputTitle: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#f3ff00"
    },
    outTitle:{
        borderColor:"#fff"
    },
    // inputContainer: {
    //     borderWidth: 1,
    //     borderRadius: 6,
    //     borderColor: "red",
    //     padding: 20,
    //     marginTop: 15,
    //     width: "80%",
    //     alignItems: "center",
    //     backgroundColor: Colors.primary700, //"#3b021f",
    //     elevation: 4, // android shadow
    //     shadowColor: 'black' // iOS shadow
    // },

    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.accent500,
        height: 50,
        width: 50,
        fontSize: 32,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: "bold",
        textAlign: "center"
        // borderColor:"red"
    },
    textHeader: {
        borderWidth: 3,
        borderColor: "#fff",
        padding: 20,
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 60
    },


    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttonContainer: {
        flex: 1
    },
})