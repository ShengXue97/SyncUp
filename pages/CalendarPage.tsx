import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

import CellContainer from '../components/CalendarPage/CellContainer';
import moment from 'moment';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function CalendarPage() {
    const [dimensions, setDimensions] = useState({ window, screen });
    const [currentDates, setCurrentDates] = useState({
        start: null,
        end: null,
    })

    const ref = useRef(null);
    
    const onWeekChanged = (start, end) => {
        setCurrentDates({start, end})
    }

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
                ref={ref}
                onWeekChanged={onWeekChanged}
            />
            <ScrollView>
                <View style={styles.weekContainer}>
                    {
                        // i is the column count, j is the row count
                        Array(9).fill(0).map((_, i) =>
                            <View key={i} style={[styles.dayContainer, { flex: i == 8 ? 0.7 : i == 0 ? 0.9 : 1 }]}>
                                {
                                    Array(24).fill(0).map((_, j) =>
                                        <CellContainer
                                            i={i}
                                            j={j}
                                            dimensions={dimensions}
                                            key={j}
                                            cellDate={moment(currentDates.start)
                                                        .add(i - 1, 'd')
                                                        .subtract(12 - j, 'h')
                                                    }
                                        />
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
