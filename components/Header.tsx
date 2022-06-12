import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Header as HeaderRNE } from '@rneui/themed';

export default function App() {

    return (
        <>
            <HeaderRNE
                backgroundColor="#5DB075"
                leftComponent={{
                    icon: 'arrow-back-outline',
                    color: '#fff',
                    type: 'ionicon',
                }}
                centerComponent={{ text: 'Messages', style: styles.heading }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
});
