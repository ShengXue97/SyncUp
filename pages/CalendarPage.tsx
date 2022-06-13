import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

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
        <View style={styles.container}>
            <CalendarStrip
                style={{ height: 80, paddingTop: 20, paddingBottom: 10 }}
                calendarColor={'white'}
                calendarHeaderStyle={{ color: 'black' }}
                dateNumberStyle={{ color: 'black' }}
                dateNameStyle={{ color: 'black' }}
                iconContainer={{ flex: 0.12 }}
            />
            <ScrollView>
                <View style={styles.weekContainer}>
                    {
                        Array(9).fill(0).map((_, i) =>
                            <View key={i} style={[styles.dayContainer, { flex: i == 8 ? 0.7 : i == 0 ? 0.9 : 1 }]}>
                                {
                                    Array(24).fill(0).map((_, j) =>
                                        //Cell container needs to use inline style for dynamic update of width and height during rotation
                                        <TouchableOpacity key={j} style={{
                                            flex: 1,
                                            borderColor: '#D3D3D3',
                                            borderBottomWidth: i == 8 ? 0 : i == 0 ? 0 : 1,
                                            borderLeftWidth: 1,
                                            width: dimensions.window.width / 7.77,
                                            height: dimensions.window.height / 15,
                                            backgroundColor: 'white',
                                        }}>
                                            {i == 0 ?
                                                //First column is special, showing the time
                                                <Text style={{
                                                    fontSize: 10,
                                                    textAlign: 'center',
                                                }}>{j < 10 ? 0 : null}{j}:00</Text>
                                                : <Text></Text>
                                            }
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        )
                    }
                </View >
            </ScrollView >
        </View >
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    weekContainer: {
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    dayContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
});
