import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {

  const [userInputNumber, setUserInputNumber] = useState<number>();
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [attempts, setAttempts] = useState(0);

  let screen = <StartGameScreen userConfirmedInputNumber={userConfirmedInputNumber} />
  if (userInputNumber) {
    screen = <GameScreen userNumber={userInputNumber} onGameOver={onGameOver}/>
  }

  if(gameOver)
  {
     screen = <GameOverScreen onStartOver={startOver} userNumber = {userInputNumber ? userInputNumber: 0 } attempts={attempts} />
  }

  function userConfirmedInputNumber(num: number) {
    setUserInputNumber(num);
  }

  function onGameOver(count:number)
  {
    setAttempts(count);
    setGameOver(true);
  }

  function startOver()
  {
    setUserInputNumber(undefined);
    setGameOver(false);
  }

  return (
    <LinearGradient colors={[Colors.primary800, Colors.accent500]} style={styles.rootScreen} >
      <ImageBackground source={require('./assets/images/background.jpg')} resizeMode="cover" style={styles.rootScreen} imageStyle={styles.backGroundImage}>
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backGroundImage: {
    opacity: 0.15
  }
});
