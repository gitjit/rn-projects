import React, {useState, useEffect} from 'react';
import {
  Animated,
  NativeModules,
  NativeEventEmitter,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from 'react-native';

const marginBottomItem = 20;
const paddingItem = 10;
const imgHeight = 100;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;

const PickerNativeEventEmitter = new NativeEventEmitter(
  NativeModules.PickerNative,
);

const Picker = () => {
  
  const [devices, setDevices] = useState(['one1', 'two2', 'three3', 'four4']);
  const [data, setData] = useState([
    {
      id: 1,
      picture:
        'file://C:\\Users\\jithesh\\AppData\\Local\\Packages\\c2adb4ae-b3b7-421a-a615-76d6f0dca295_785eemcf1050j\\LocalState\\a.png',
      title: 'HP Smart officejet 8090',
    },
    {
      id: 2,
      picture:
        'file://C:\\Users\\jithesh\\AppData\\Local\\Packages\\c2adb4ae-b3b7-421a-a615-76d6f0dca295_785eemcf1050j\\LocalState\\b.png',
      title: 'HP Smart officejet 8090',
    },
  ]);
  useEffect(() => {
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
    NativeModules.PickerNative.startDiscovery(result => {
        console.log(result);
      });
    //setDownloadsFolder(RNFS.DownloadDirectoryPath);
  }, []);

  useEffect(() => {
    return () => {
      console.log('cleaned up');
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

  function addDeviceEventHandler(device) {
    console.log(
      ' Add Device Event was fired with: ' + device.Name + device.ImagePath,
    );
    //setDevices(currentDevices => [...currentDevices, device.Name]);
    let imgPath = 'file://C:\\Users\\jithesh\\AppData\\Local\\Packages\\c2adb4ae-b3b7-421a-a615-76d6f0dca295_785eemcf1050j\\LocalState\\' + 'a.png'
    setData(currentDevices => [...currentDevices, {title:device.Name, id:Math.random.toString(), picture:imgPath}]);
  }

  function discoCompltedEventHandler(result) {
    console.log('Discovery Completed Event was fired with: ' + result);
  }

  const Yscroll = React.useRef(new Animated.Value(0)).current;

  const renderUser = ({item, index}) => {
    const scale = Yscroll.interpolate({
      inputRange: [-1, 0, sizeOfItem * index, sizeOfItem * (index + 2)],
      outputRange: [1, 1, 1, 0],
    });

    return (
      <Animated.View
        style={[
          styles.item,
          {
            transform: [{scale}],
          },
        ]}>
        <Image
          style={styles.image}
          source={{uri: item.picture}}
          resizeMode="contain"
          contentContainerStyle={{padding: 20}}
        />
        <View style={styles.wrapText}>
          <Text style={styles.fontSize}>{`${item.title}`}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image
        source={{ uri: backgroundImg }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
      /> */}
      {
        <Animated.FlatList
          data={data}
          keyExtractor={item => `key-${item.id}`}
          renderItem={renderUser}
          contentContainerStyle={{
            padding: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: Yscroll}}}],
            {useNativeDriver: true},
          )}
        />
      }
    </SafeAreaView>
  );
  // <View style={styles.container}>
  //   <View style={styles.header}>
  //     <Text style={styles.headTxt}>Find Your Printers</Text>
  //     <Button color="#841584" title="Start"></Button>
  //   </View>
  //   <View style={styles.body}>
  //     <Text style={styles.txt}>Device -Picker</Text>
  //   </View>
  // </View>
  //);
};
export default Picker;

const styles = StyleSheet.create({
  fontSize: {
    fontSize: 15,
    color: 'black',
  },
  image: {
    width: 100,
    height: imgHeight,
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  item: {
    // flexDirection: 'row',
    marginBottom: marginBottomItem,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    padding: 5, //paddingItem,
    width: 200,
    height: 150,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  container: {
    flex: 1,
  },
  //   container: {
  //     flex: 1,
  //     margin: 15,
  //     backgroundColor: '#ddd',
  //   },
  //   header: {
  //     flex: 2,
  //     flexDirection: 'row',
  //     borderWidth: 1,
  //     backgroundColor: 'grey',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  //   headTxt: {
  //     color: 'black',
  //     fontSize: 40,
  //     borderColor: 'black',
  //     padding: 5,
  //     margin: 5,
  //   },
  //   btn: {
  //     backgroundColor: 'blue',
  //     color: 'black',
  //   },
  //   body: {
  //     flex: 15,
  //     backgroundColor: 'white',
  //   },
});
