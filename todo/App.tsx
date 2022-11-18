import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {

  interface IGoal {
    text: string,
    id: string
  }

  const [modalVisible, SetModalVisible] = useState(false);
  const [goals, addGoal] = useState<IGoal[]>([]);

  function addGoalHandler(goal: string) {
    console.log('Adding goal ' + goal);
    addGoal((currentGoals) => [...currentGoals, { text: goal, id: Math.random().toString() }]);
    onCancel();
  }

  function deleteGoalHandler(id: string) {
    console.log("Deleting : " + id);
    addGoal((currentGoals) => currentGoals.filter((g) => g.id != id));
  }

  function startAddGoal() {
    SetModalVisible(!modalVisible);
  }

  function onCancel(){
    SetModalVisible(false);
 }

  return (
    <View style={styles.container}>
      <Button title='Add Goal' onPress={startAddGoal } />
      <GoalInput visible={modalVisible} addGoalHandler={addGoalHandler} cancelHandler={onCancel} />
      <View style={styles.goalsContainer}>
        <FlatList
          data={goals}
          renderItem={(itemData) => {
            return (
              <GoalItem id={itemData.item.id} text={itemData.item.text} onDelete={deleteGoalHandler} />
            )
          }
          }
          keyExtractor={(item, index) => { return item.id }}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1
  },

  goalsContainer: {
    marginTop:10
    // flex: 5
  }

});
