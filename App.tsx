import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '@rneui/themed';
import ListElement from './components/ListElement';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <ListElement />
        <ListElement />
        <ListElement />
        <ListElement />
        <ListElement />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    marginTop: 50,
  },
});
