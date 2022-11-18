import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal, Image } from "react-native";

interface Props {
    visible: boolean,
    addGoalHandler: (goalText: string) => void,
    cancelHandler: () => void
}
export default function GoalInput({ visible, addGoalHandler, cancelHandler }: Props) {

    const [goal, setGoal] = useState('');

    function goalInputHandler(enteredText: string) {
        console.log(enteredText);
        setGoal(enteredText);
    }

    function insertGoal() {
        if (goal.length > 0) {
            addGoalHandler(goal)
            setGoal('');
        }
    }



    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require('../assets/goal.png')}/>
                <TextInput style={styles.textInput} placeholder='Enter your goal' onChangeText={goalInputHandler} value={goal} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title='Add Goal' onPress={insertGoal} />
                    </View>
                    <View>
                        <Button title='Cancel' onPress={cancelHandler} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        borderBottomColor: "#cccccc",
        borderBottomWidth: 2,
        flex: 1
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
        //flex:2,
        width: '70%',
        marginRight: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-evenly"

    },
    button:{
        marginHorizontal:8
    },
    image:{
        width:100,
        height:100
    }


});