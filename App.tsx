import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '@rneui/themed';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx sssssto start working on your app!</Text>
      <StatusBar style="auto" />
      <Icon
        name='sc-telegram'
        type='evilicon'
        color='#517fa4'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
