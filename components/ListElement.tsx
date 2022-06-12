import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Image } from '@rneui/base';
import { Divider } from '@rneui/themed';
import React from 'react';

const BASE_URI = 'https://source.unsplash.com/random?sig=';

export default function App(props) {
    return (
        <>
            <View style={styles.container}>
                <Image
                    source={{ uri: props.imageUri }}
                    containerStyle={styles.image}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <View style={styles.textContainer}>
                    <View style={styles.horizontalContainer}>
                        <Text
                            style={styles.textHeader}
                        >
                            {props.title}
                        </Text>
                        <Text
                            style={styles.textTime}
                        >
                            {props.time}
                        </Text>
                    </View>

                    <Text
                        style={styles.textBody}
                    >
                        {props.lastUser}: {props.lastMessage}
                    </Text>
                </View>
            </View>
            <Divider />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 13,
    },
    image: {
        flex: 1,
        aspectRatio: 1,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    textContainer: {
        flex: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textTime: {
        fontSize: 10,
        fontWeight: "normal",
    },
    textHeader: {
        fontSize: 18,
        fontWeight: "bold",
    },
    textBody: {
        fontSize: 15,
    },
});
