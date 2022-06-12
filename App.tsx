import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React from 'react';
import Messages from './pages/Messages';
import Header from './components/Header';

export default function App() {

  return (
    <>
      <StatusBar style="auto" />
      <Header />
      <Messages />
    </>
  );
}

const styles = StyleSheet.create({
});
