import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarEditPage from './CalendarEditPage';
import CalendarOverviewPage from './CalendarOverviewPage';
import { CalendarProvider } from './CalendarContext';
import AppContext from '../AppContext';

const Stack = createNativeStackNavigator();

export default function CalendarPage() {
    const [calendarEvents, setCalendarEvents] = useState([]);
    const addEvent = (event) => {
        setCalendarEvents([...calendarEvents, event]);
    }
    const removeEvent = (id) => {
        console.log("Deleting event: " + id);
        setCalendarEvents(calendarEvents.filter(e => e.id !== id));
    }

    return (
        <CalendarProvider value={{ calendarEvents, addEvent, removeEvent }}>
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
