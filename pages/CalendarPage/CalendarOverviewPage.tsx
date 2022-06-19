import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Dimensions } from 'react-native';
import { Icon } from "@rneui/themed";
import CalendarStrip from 'react-native-calendar-strip';
import { useNavigation } from '@react-navigation/native';
import CalendarContext from './CalendarContext';

import CellContainer from '../../components/CalendarPage/CellContainer';
import moment from 'moment';
import { Button, Modal } from "native-base";
import AppContext from '../AppContext';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function CalendarOverviewPage() {
    const navigation = useNavigation();
    const [dimensions, setDimensions] = useState({ window, screen });
    //The very first start date when entering the app, do not change this value
    const [cachedStartDate, setCachedStartDate] = useState(null);
    const [currentDates, setCurrentDates] = useState({
        start: null,
        end: null,
    })
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const ref = useRef(null);
    const { calendarEvents, addEvent, removeEvent, editEvent } = useContext(CalendarContext)
    const { pageTitle, changePageTitle } = useContext(AppContext)

    const onWeekChanged = (start, end) => {
        if (cachedStartDate === null) {
            setCachedStartDate(start);
        }
        setCurrentDates({ start, end })
    }

    const handleResetClick = () => {
        console.log(cachedStartDate);
        ref.current.updateWeekView(cachedStartDate);
    }

    const handleClickEvent = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    }

    const handleEditEvent = () => {
        changePageTitle('Edit Event');
        navigation.navigate('CalendarEditPage', {
            status: 'edit',
            name: selectedEvent.name,
            location: selectedEvent.location,
            dateStartMoment: selectedEvent.dateStartMoment,
            dateEndMoment: selectedEvent.dateEndMoment,
            id: selectedEvent.id,
        })
    }

    useEffect(() => {
        console.log(calendarEvents);
        const subscription = Dimensions.addEventListener(
            "change",
            ({ window, screen }) => {
                setDimensions({ window, screen });
            }
        );
        return () => subscription?.remove();
    });

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Contact Us</Modal.Header>
                    <Modal.Body>
                        <Button style={styles.button} onPress={() => {
                            setShowModal(false);
                        }}>
                            View event
                        </Button>
                        <Button style={styles.button} onPress={() => {
                            setShowModal(false);
                            handleEditEvent();
                        }}>
                            Edit event
                        </Button>
                        <Button style={styles.button} onPress={() => {
                            setShowModal(false);
                            removeEvent(selectedEvent.id);
                        }}>
                            Delete event
                        </Button>
                        <Button style={styles.button} onPress={() => {
                            setShowModal(false);
                        }}>
                            Duplicate
                        </Button>
                        <Button style={styles.button} onPress={() => {
                            setShowModal(false);
                        }}>
                            Copy
                        </Button>
                        <Button style={styles.button} onPress={() => {
                            setShowModal(false);
                        }}>
                            Cut
                        </Button>
                    </Modal.Body>
                </Modal.Content>
            </Modal>

            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={handleResetClick}>
                        <Icon
                            name='calendar-outline'
                            type='ionicon'
                            size={40}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        changePageTitle('Add event'); navigation.navigate('CalendarEditPage', {
                            status: 'add_blank',
                        })
                    }}>
                        <Icon
                            name='add-circle-outline'
                            type='ionicon'
                            size={40}
                        />
                    </TouchableOpacity>

                </View>

                <CalendarStrip
                    style={{ height: 80, paddingBottom: 10 }}
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

                                    {
                                        (i === 0 || i === 8) ? null :
                                            calendarEvents.map(event => {
                                                const cellDate = moment(currentDates.start)
                                                    .add(i - 1, 'd')
                                                    .subtract(12, 'h');
                                                if (event.dateStartMoment.get('date') === (cellDate.get('date')) &&
                                                    event.dateEndMoment.get('date') === (cellDate.get('date'))) {
                                                    console.log("real")
                                                    console.log(event.dateStartMoment.format('dddd, MMMM Do YYYY HH:mm'))
                                                    console.log(event.dateEndMoment.format('dddd, MMMM Do YYYY HH:mm'))
                                                    console.log(cellDate.format('dddd, MMMM Do YYYY HH:mm'))
                                                    console.log(event.dateEndMoment.diff(event.dateStartMoment, 'minutes'))
                                                    console.log(event.dateStartMoment.diff(cellDate, 'minutes'))
                                                    return <TouchableOpacity
                                                        style={{
                                                            backgroundColor: 'orange',
                                                            width: '100%',
                                                            position: 'absolute',
                                                            height: ((event.dateEndMoment.diff(event.dateStartMoment, 'minutes')) / 60) *
                                                                (dimensions.window.height / 15),
                                                            top: ((event.dateStartMoment.diff(cellDate, 'minutes')) / 60) *
                                                                (dimensions.window.height / 15),
                                                            opacity: 1,
                                                        }}
                                                        onPress={() => handleClickEvent(event)}
                                                    >
                                                        <Text style={styles.eventText}>
                                                            {event.name} @ {event.location}
                                                        </Text>

                                                    </TouchableOpacity>
                                                }

                                            })
                                    }
                                </View>
                            )
                        }
                    </View >
                </ScrollView >
            </View >
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10,
    },
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
    eventText: {
        color: 'white',
        textAlign: 'center',
    },
    button: {
        marginVertical: 5,
    }
});
