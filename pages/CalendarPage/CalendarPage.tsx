import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarEditPage from './CalendarEditPage';
import CalendarOverviewPage from './CalendarOverviewPage';
import { CalendarProvider } from './CalendarContext';

const Stack = createNativeStackNavigator();

export default function CalendarPage() {
    const [calendarEvents, setCalendarEvents] = useState([]);
    const addEvent = (event) => {
        setCalendarEvents([...calendarEvents, event]);
    }

    return (
        <CalendarProvider value={{ calendarEvents, addEvent }}>
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
        </CalendarProvider>
    );
}

const styles = StyleSheet.create({
});
