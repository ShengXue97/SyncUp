import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import React from 'react';
import MessagesPage from './pages/MessagesPage';
import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/ProfilePage';
import { Icon } from "@rneui/themed";
import AppLoading from 'expo-app-loading';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';

const Tab = createBottomTabNavigator();

let customFonts = {
  'Helvetica Neue': require('./assets/fonts/Helvetica.ttf'),
};

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    console.log("lo");
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Calendar"
              component={CalendarPage}
              options={{
                tabBarIcon: ({ size, color }) => (<Icon
                  name='calendar-outline'
                  type='ionicon'
                  size={size}
                  color={color}
                />),
                headerStyle: {
                  backgroundColor: '#5DB075',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Tab.Screen
              name="Messages"
              component={MessagesPage}
              options={{
                tabBarIcon: ({ size, color }) => (<Icon
                  name='mail-outline'
                  type='ionicon'
                  size={size}
                  color={color}
                />),
                headerStyle: {
                  backgroundColor: '#5DB075',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfilePage}
              options={{
                tabBarIcon: ({ size, color }) => (<Icon
                  name='person-circle-outline'
                  type='ionicon'
                  size={size}
                  color={color}
                />),
                headerStyle: {
                  backgroundColor: '#5DB075',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
