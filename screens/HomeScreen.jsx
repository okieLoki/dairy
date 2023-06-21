import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {screens} from '../config/navConfig'


const HomeScreen = () => {
  const navigator = useNavigation();

  useLayoutEffect(() => {
    navigator.setOptions({ headerShown: false });
  }, [navigator]);

  const handleNavigation = (component) => {
    navigator.navigate(component);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />

      {screens.map(({ name, component }) => (
        <TouchableOpacity
          key={component}
          style={styles.button}
          onPress={() => handleNavigation(component)}
        >
          <Text>{name}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  }
});

export default HomeScreen;