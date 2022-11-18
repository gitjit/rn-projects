/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
//import RNFS from 'react-native-fs';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
  Image,
  FlatList,
} from 'react-native';

import {NativeModules, NativeEventEmitter} from 'react-native';
import {useEffect} from 'react';

const PickerNativeEventEmitter = new NativeEventEmitter(
  NativeModules.PickerNative,
);

function onPress() {
  console.log('clicked...');
  NativeModules.PickerNative.add(
    /* arg a */ NativeModules.PickerNative.Pi,
    /* arg b */ NativeModules.PickerNative.E,
    /* callback */ function (result) {
      Alert.alert(
        'PickerNative',
        `PickerNative says ${NativeModules.PickerNative.Pi} + ${NativeModules.PickerNative.E} = ${result}`,
        [{text: 'OK'}],
        {cancelable: false},
      );
    },
  );
}

function onGetDevice() {
  console.log('on get device');
  NativeModules.PickerNative.getDevice(device => {
    console.log(device);
  });
}

const Appcopy = () => {
  const [imgPath, setPath] = useState('https://reactjs.org/logo-og.png');
  const [downloadsFolder, setDownloadsFolder] = useState(
    'C:UsersjitheshAppDataLocalPackagesc2adb4ae-b3b7-421a-a615-76d6f0dca295_785eemcf1050jLocalState\rn.png',
  );

  const [imagePath, setImagePath] = useState(
    'file://C:\\Users\\jithesh\\AppData\\Local\\Packages\\c2adb4ae-b3b7-421a-a615-76d6f0dca295_785eemcf1050j\\LocalState\\rn.png',
  );

  useEffect(() => {
    PickerNativeEventEmitter.addListener('AddEvent', addEventHandler, this);
    PickerNativeEventEmitter.addListener(
      'AddDeviceEvent',
      addDeviceEventHandler,
      this,
    );
    PickerNativeEventEmitter.addListener(
      'DiscoveryCompletedEvent',
      discoCompltedEventHandler,
      this,
    );
    //setDownloadsFolder(RNFS.DownloadDirectoryPath);
  }, []);

  useEffect(() => {
    return () => {
      console.log('cleaned up');
      PickerNativeEventEmitter.removeListener(
        'AddEvent',
        addEventHandler,
        this,
      );
      PickerNativeEventEmitter.removeListener(
        'AddDeviceEvent',
        addDeviceEventHandler,
        this,
      );
      PickerNativeEventEmitter.removeListener(
        'DiscoveryCompletedEvent',
        discoCompltedEventHandler,
        this,
      );
    };
  }, []);

  const [devices, setDevices] = useState(['one1', 'two2', 'three3', 'four4']);

  const [items, setItems] = useState(['one', 'two', 'three', 'four', 'five']);

  function onLocalFolder() {
    console.log('on get device');
    NativeModules.PickerNative.getImagePath(result => {
      console.log(result.Name);
      setDownloadsFolder('file://' + result);
    });
  }

  function onChangeImage() {
    console.log('onChangeImage');
    NativeModules.PickerNative.getRandomImage(result => {
      console.log(result);
      setImagePath('file://' + result);
    });
  }

  function onTest() {
    console.log('Total devices = ' + devices.length);
  }

  function onStartDiscovery() {
    console.log('onChangeImage');
    NativeModules.PickerNative.startDiscovery(result => {
      console.log(result);
    });
  }

  //const images = require.context('./assets/images', true);

  function addEventHandler(result) {
    console.log('Event was fired with: ' + result);
    setPath('https://picsum.photos/200');
  }

  function addDeviceEventHandler(device) {
    console.log(
      ' Add Device Event was fired with: ' + device.Name + device.ImagePath,
    );
    setDevices(currentDevices => [...currentDevices, device.Name]);
  }

  function discoCompltedEventHandler(result) {
    console.log('Discovery Completed Event was fired with: ' + result);
  }

  const localFile =
    'file://C:\\Users\\jithesh\\AppData\\Local\\Packages\\c2adb4ae-b3b7-421a-a615-76d6f0dca295_785eemcf1050j\\LocalState\\rn.png';
  return (
    <SafeAreaView>
      <View>
        <Button title="Add" onPress={onPress}></Button>
        <Button title="GetDevice" onPress={onGetDevice}></Button>
        <Button title="LocalFolder" onPress={onLocalFolder}></Button>
        <Button title="NextImage" onPress={onChangeImage}></Button>
        <Button title="StartDiscovery" onPress={onStartDiscovery}></Button>
        <Button title="Test" onPress={onTest}></Button>
        <FlatList
          data={devices}
          renderItem={({item}) => <Text style={styles.titleText}>{item}</Text>}
        />

        {/* <Image source={{uri: imgPath}} style={{width: 400, height: 400}} /> */}
        <Image
          style={{height: 50, width: 50}}
          source={{uri: downloadsFolder}}
        />
        <Image style={{height: 250, width: 450}} source={{uri: imagePath}} />
        <Text> Image Path: {imagePath}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default App;
