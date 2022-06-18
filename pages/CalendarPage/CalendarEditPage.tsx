import { StyleSheet, View, Text } from 'react-native';
import React, { useState, useCallback, useEffect, useContext } from 'react'
import { Input, Icon } from '@rneui/themed';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';
import CalendarContext from './CalendarContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, useToast, Center, Box } from "native-base";
import * as Moment from 'moment';
import moment from 'moment';
import { extendMoment } from 'moment-range';

const extendedMoment = extendMoment(Moment);

export default function CalendarEditPage() {
    const [showDatePickerStart, setShowDatePickerStart] = useState(false);
    const [showTimePickerStart, setShowTimePickerStart] = useState(false);

    const [showDatePickerEnd, setShowDatePickerEnd] = useState(false);
    const [showTimePickerEnd, setShowTimePickerEnd] = useState(false);

    const [name, setname] = useState(null);
    const [location, setLocation] = useState(null);

    const [show, setShow] = React.useState(true);

    const { calendarEvents, addEvent } = useContext(CalendarContext)

    const navigation = useNavigation();
    const route = useRoute();
    const toast = useToast();
    const cellDate = route.params === undefined ? moment(new Date()) : route.params.cellDate;

    const [dateStart, setDateStart] = useState(cellDate.clone());
    const [timeStart, setTimeStart] = useState(cellDate.clone());

    const [dateEnd, setDateEnd] = useState(cellDate.clone());
    const [timeEnd, setTimeEnd] = useState(cellDate.clone());

    const onChangeDateStart = (selectedDate) => {
        const currentDate = selectedDate || dateStart;
        setDateStart(moment(currentDate))
        setShowDatePickerStart(false);
    };

    const onChangeTimeStart = (selectedTime) => {
        const currentTime = selectedTime || timeStart;
        setTimeStart(moment(currentTime));
        setShowTimePickerStart(false);
    };

    const onChangeDateEnd = (selectedDate) => {
        const currentDate = selectedDate || dateEnd;
        setDateEnd(moment(currentDate));
        setShowDatePickerEnd(false);
    };

    const onChangeTimeEnd = (selectedTime) => {
        const currentTime = selectedTime || timeEnd;
        setTimeEnd(moment(currentTime));
        setShowTimePickerEnd(false);
    };

    const callToast = (toastMessage) => {
        toast.show({
            render: () => {
                return <Box bg="red.400" px="2" py="1" rounded="sm" mb={5}>
                    <Text style={styles.toastText}>
                        {toastMessage}
                    </Text>
                </Box>;
            }
        });
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Event name"
                leftIcon={{ type: 'ionicon', name: 'calendar-outline' }}
                onChangeText={value => setname(value)}
            />

            <Input
                placeholder="Location"
                leftIcon={{ type: 'ionicon', name: 'location-outline' }}
                onChangeText={value => setLocation(value)}
            />

            <DateTimePickerModal
                isVisible={showDatePickerStart}
                mode="date"
                onConfirm={onChangeDateStart}
                onCancel={onChangeDateStart}
            />

            <DateTimePickerModal
                isVisible={showTimePickerStart}
                mode="time"
                onConfirm={onChangeTimeStart}
                onCancel={onChangeTimeStart}
            />

            <DateTimePickerModal
                isVisible={showDatePickerEnd}
                mode="date"
                onConfirm={onChangeDateEnd}
                onCancel={onChangeDateEnd}
            />

            <DateTimePickerModal
                isVisible={showTimePickerEnd}
                mode="time"
                onConfirm={onChangeTimeEnd}
                onCancel={onChangeTimeEnd}
            />

            <View style={styles.dateContainer}>
                <View style={styles.dateTimeContainer} >
                    <Icon
                        name='time-outline'
                        type='ionicon'
                        size={25}
                    />

                    <View style={styles.centerContainer}>
                        <Text>
                            {dateStart.format('dddd, MMMM Do YYYY')}
                        </Text>
                    </View>

                    <Icon
                        name='create-outline'
                        type='ionicon'
                        size={25}
                        onPress={() => { setShowDatePickerStart(true) }}
                    />

                    <View style={styles.centerContainer}>
                        <Text>
                            {timeStart.format('HH:mm')}
                        </Text>
                    </View>

                    <Icon
                        name='create-outline'
                        type='ionicon'
                        size={25}
                        onPress={() => { setShowTimePickerStart(true) }}
                    />
                </View>

                <View style={styles.dateTimeContainer} >
                    <Icon
                        name='time-outline'
                        type='ionicon'
                        size={25}
                    />

                    <View style={styles.centerContainer}>
                        <Text>
                            {dateEnd.format('dddd, MMMM Do YYYY')}
                        </Text>
                    </View>

                    <Icon
                        name='create-outline'
                        type='ionicon'
                        size={25}
                        onPress={() => { setShowDatePickerEnd(true) }}
                    />

                    <View style={styles.centerContainer}>
                        <Text>
                            {timeEnd.format('HH:mm')}
                        </Text>
                    </View>

                    <Icon
                        name='create-outline'
                        type='ionicon'
                        size={25}
                        onPress={() => { setShowTimePickerEnd(true) }}
                    />
                </View>
            </View>

            <Icon
                name='save-outline'
                type='ionicon'
                size={25}
                onPress={() => {
                    //check if dateStart is same as dateEnd
                    if (dateStart.format('dddd, MMMM Do YYYY') !== dateEnd.format('dddd, MMMM Do YYYY')) {
                        callToast("Error! Event not added. Start Date must be the same as End Date!")
                    }
                    else if (name === null || name === "") {
                        callToast("Error! Event not added. Event name cannot be empty!")
                    }
                    else if (location === null || location === "") {
                        callToast("Error! Event not added. Location cannot be empty!")
                    }
                    else if (timeEnd.isSameOrBefore(timeStart)) {
                        callToast("Error! Event not added. Start time must be before End Time!")
                    } else {
                        const dateStartMoment = dateStart.set({
                            hour: timeStart.get('hour'),
                            minute: timeStart.get('minute'),
                            second: 0,
                            millisecond: 0,
                        })

                        const dateEndMoment = dateEnd.set({
                            hour: timeEnd.get('hour'),
                            minute: timeEnd.get('minute'),
                            second: 0,
                            millisecond: 0,
                        })


                        //Check if the new event overlaps with an existing event
                        var overlaps = false;
                        for (let i = 0; i < calendarEvents.length; i++) {
                            const event = calendarEvents[i];
                            const range1 = extendedMoment.range(dateStartMoment, dateEndMoment);
                            const range2 = extendedMoment.range(event.dateEndMoment, event.dateEndMoment);
                            if (range1.overlaps(range2)) {
                                overlaps = true;
                                console.log("ok")
                                callToast("Error! Event not added. This event overlaps with an existing event!")
                                break;
                            }
                        }

                        if (!overlaps) {
                            addEvent({ name, location, dateStartMoment, dateEndMoment })
                            navigation.navigate('CalendarOverviewPage')
                        }
                    }


                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    dateContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '3%',
        marginVertical: 20,
    },
    centerContainer: {
        display: 'flex',
        justifyContent: 'center', /* align horizontal */
        alignItems: 'center', /* align vertical */
    },
    toastText: {
        color: 'white',
    }
});
