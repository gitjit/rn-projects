
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import Title from "../components/Title";
import Colors from "../constants/colors";
import Card from "../components/Card"
import LogItem from "../components/LogItem";
import { Ionicons } from '@expo/vector-icons'

interface Props {
    userNumber: number,
    onGameOver: (count:number) => void
}


let min = 1;
let max = 100;
let count = 1;



export default function GameScreen({ userNumber, onGameOver }: Props) {

    const initialGuess = generateRandom(1, 100, userNumber);
    const [guess, setGuess] = useState(initialGuess);
    const [logs, addLog] = useState<string[]>([`#${count}  Opponent's Guess:${initialGuess}`]);

    //generateRandom(64,66,66);

    useEffect(() => {
        if (guess === userNumber) {
            onGameOver(count);
        }
    }, [guess, userNumber, onGameOver])

    function generateRandom(min: number, max: number, exclude: number) {
        let rand = Math.random();
        // console.log(`min is ${min}, max is ${max} and rand is ${rand}`)
        let result = (Math.floor(rand * (max - min)) + min);
        if (result === exclude) {
            console.log("Excluded : " + result);
            result = generateRandom(min, max, exclude);
        }
        // console.log(`Guess is ${result}`);
        return result;
    }

    function doGuess(min: number, max: number, exclude: number = 0) {
        count++;
        console.log(`min is ${min} and max is ${max}, exclude is ${exclude}`);
        let result:number;
        if(min - max == 1)
        {
            result = min + 1;
        }
        else 
        {
             result = generateRandom(min, max, exclude);
        }
        console.log("Guess is " + result);
        let log = `#${count}  Opponent's Guess:${result}`;
        addLog((currentLogs) => [log, ...currentLogs]);
        return result;
    }

    function onLower() {
        console.log("onLower");
        if (guess < userNumber) {
            Alert.alert("Don't Lie", "You know its wrong", [{ text: 'Sorry!', style: 'cancel' }])
            return;
        }
        max = guess;
        var newGuess = doGuess(min, max, guess);
        if (newGuess === userNumber) {
            addLog((currentLogs) => [...currentLogs, "Success"]);
        }
        setGuess(newGuess)


    }
    function onHigher() {
        console.log("onHigher");
        if (guess > userNumber) {
            Alert.alert("Don't Lie", "You know its wrong", [{ text: 'Sorry!', style: 'cancel' }])
        }
        min = guess;
        var newGuess = doGuess(min, max, guess);
        if (newGuess === userNumber) {
            addLog((currentLogs) => [...currentLogs, "Success"]);
        }
        setGuess(newGuess)
    }

    return (

        <View style={styles.container}>
            <Title>Opponent's Guess</Title>
            <Title>{guess.toString()}</Title>
            {/* <View style={styles.actionContainer}> */}
            <Card>
                <Text style={styles.textHeader}>Higher or lower?</Text>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={onLower}>
                            <Ionicons name="md-remove"  size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={onHigher}>
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>


            {/* </View> */}
            <View style={styles.logContainer}>
                <FlatList data={logs} renderItem={(logData) => {
                    return (
                        // <View style={styles.logItem}>
                        //     <Text>{logData.item}</Text>
                        // </View>
                        <LogItem>{logData.item}</LogItem>
                    )
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: "100%",
        alignItems: "center",
        marginTop: 25,
        // borderWidth:2,
        // borderColor:"#fff"
    },
    textHeader: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#ddb52f"
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    },
    logContainer: {
        marginVertical: 10,
        width: "70%"

    },

})