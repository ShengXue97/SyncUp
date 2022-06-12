import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Header as HeaderRNE } from '@rneui/themed';

export default function Header(props) {

    return (
        <>
            <HeaderRNE
                backgroundColor="#5DB075"
                // leftComponent={{
                //     icon: 'arrow-back-outline',
                //     color: '#fff',
                //     type: 'ionicon',
                // }}
                centerComponent={{ text: props.title, style: styles.heading }}
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
