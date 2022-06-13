import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function CalendarPage() {
    const [dimensions, setDimensions] = useState({ window, screen });

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            "change",
            ({ window, screen }) => {
                setDimensions({ window, screen });
            }
        );
        return () => subscription?.remove();
    });

    return (
        <ScrollView>
            <View style={styles.weekContainer}>
                {
                    Array(8).fill(0).map((_, i) =>
                        <View key={i} style={styles.dayContainer}>
                            {
                                Array(24).fill(0).map((_, j) =>
                                    //Cell container needs to use inline style for dynamic update of width and height during rotation
                                    <View key={j} style={{
                                        flex: 1,
                                        borderWidth: 0.5,
                                        borderColor: '#D3D3D3',
                                        width: dimensions.window.width / 8,
                                        height: dimensions.window.height / 15,
                                    }}>
                                        {i == 0 ?
                                            //First column is special, showing the time
                                            <Text style={{
                                                fontSize: 12,
                                            }}>{j < 10 ? 0 : null}{j}:00</Text>
                                            : <Text></Text>
                                        }
                                    </View>
                                )
                            }
                        </View>
                    )
                }
            </View >
        </ScrollView >

    );
}

const styles = StyleSheet.create({
    weekContainer: {
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    dayContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
});
