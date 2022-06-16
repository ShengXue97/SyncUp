import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarEditPage from './CalendarEditPage';
import CalendarOverviewPage from './CalendarOverviewPage';

const Stack = createNativeStackNavigator();

export default function CalendarPage() {

    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="CalendarOverviewPage"
                    component={CalendarOverviewPage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CalendarEditPage"
                    component={CalendarEditPage}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </>
    );
}

const styles = StyleSheet.create({
});
