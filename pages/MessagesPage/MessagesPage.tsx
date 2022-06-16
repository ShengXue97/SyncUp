import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessagesOuterPage from './MessagesOuterPage';
import MessagesInnerPage from './MessagesInnerPage';

const Stack = createNativeStackNavigator();

export default function MessagesPage() {

    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="MessagesOuterPage"
                    component={MessagesOuterPage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MessagesInnerPage"
                    component={MessagesInnerPage}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </>
    );
}

const styles = StyleSheet.create({
});
