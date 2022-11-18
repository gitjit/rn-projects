import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import Title from "../components/Title";
import Colors from "../constants/colors";


interface Props{
    onStartOver : () => void,
    userNumber : number,
    attempts : number
}

export default function GameOverScreen({onStartOver, attempts, userNumber}:Props) {

    function OnStartOver()
    {
        onStartOver();
    }

    return (
        <View style={styles.container}>
            <Title>Game Over</Title>
            <View style={styles.imgContainer}>
                <Image source={require('../assets/images/final.png')} />
            </View>
            <Text>
                Your mobile took <Text style={styles.txtHighlight}>{attempts}</Text> attempts to guess <Text style={styles.txtHighlight}>{userNumber}</Text>
            </Text>
            <PrimaryButton onPress={OnStartOver}>Start Over</PrimaryButton>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        backgroundColor: Colors.accent500
    },
    imgContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 1,
        overflow: "hidden",
        margin:10
    },
    txtHighlight :{
        fontWeight:"bold"
    }

});