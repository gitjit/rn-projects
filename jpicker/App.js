import React, {useState, useEffect} from 'react';
import {
  NativeModules,
  NativeEventEmitter,
  StyleSheet,
  Text,
} from 'react-native';
import Picker from './picker';

const PickerNativeEventEmitter = new NativeEventEmitter(
  NativeModules.PickerNative,
);

export default function App() {
  return <Picker />;
}

const styles = StyleSheet.create({});
