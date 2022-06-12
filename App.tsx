import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import React from 'react';
import Messages from './pages/Messages';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import { Icon } from "@rneui/themed";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Calendar"
            component={Calendar}
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
            component={Messages}
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
            component={Profile}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
