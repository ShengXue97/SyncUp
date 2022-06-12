import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';

export default function CalendarPage() {

    return (
        <View style={styles.container}>
            <Text> Calendar page is under construction! </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});
