/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  requireNativeComponent,
  AppRegistry,
  UIManager,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const CustomUserControl = requireNativeComponent('CustomUserControl');
const CustomCheck = requireNativeComponent('CustomCheck');

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function onPress() {
    if (_customControlRef) {
      const tag = findNodeHandle(this._customControlRef);
      UIManager.dispatchViewManagerCommand(
        tag,
        UIManager.getViewManagerConfig('CustomUserControl').Comrmands
          .CustomCommand,
        ['arg1', 'arg2'],
      );
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.header}>Find Your Printers</Text>
        <Button color="#841584" title="Start"></Button>
        <CustomCheck label="New Task" style = {styles.customchk}/>
        <CustomUserControl
          style={styles.customcontrol}
          label="CustomUserControl!"
          ref={ref => {
            this._customControlRef = ref;
          }}
        />
        <Button
          onPress={() => {
            this.onPress();
          }}
          title="Call CustomUserControl Commands!"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  customcontrol: {
    color: '#333333',
    backgroundColor: '#006666',
    width: 200,
    height: 20,
    margin: 10,
  },
  customchk: {
    width: 200,
    height: 20,
    margin: 10,
  },
  header: {
    fontSize: 15,
    color: 'white',
  },
});

export default App;
