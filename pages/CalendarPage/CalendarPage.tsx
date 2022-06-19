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
        setCalendarEvents(calendarEvents.filter(e => e.id !== id));
    }

    const editEvent = (id, newEvent) => {
        const newEvents = calendarEvents.filter(e => e.id !== id);
        newEvents.push(newEvent);
        setCalendarEvents(newEvents);
    }

    return (
        <CalendarProvider value={{ calendarEvents, addEvent, removeEvent, editEvent }}>
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
