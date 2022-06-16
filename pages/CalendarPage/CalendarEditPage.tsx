import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useCallback, useEffect, useContext } from 'react'
import { Input, Icon } from '@rneui/themed';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';
import CalendarContext from './CalendarContext';
import { useNavigation } from '@react-navigation/native';

export default function CalendarEditPage() {
    const [showDatePickerStart, setShowDatePickerStart] = useState(false);
    const [showTimePickerStart, setShowTimePickerStart] = useState(false);

    const [showDatePickerEnd, setShowDatePickerEnd] = useState(false);
    const [showTimePickerEnd, setShowTimePickerEnd] = useState(false);

    const [name, setname] = useState(null);
    const [location, setLocation] = useState(null);

    const [dateStart, setDateStart] = useState(new Date());
    const [timeStart, setTimeStart] = useState(new Date());
    
    const [dateEnd, setDateEnd] = useState(new Date());
    const [timeEnd, setTimeEnd] = useState(new Date());
    
    const {calendarEvents, addEvent} = useContext(CalendarContext)

    const navigation = useNavigation();
    
    const onChangeDateStart = (selectedDate) => {
        const currentDate = selectedDate || dateStart;
        setDateStart(currentDate)
        setShowDatePickerStart(false);
    };

    const onChangeTimeStart = (selectedTime) => {
        const currentTime = selectedTime || timeStart;
        setTimeStart(currentTime);
        setShowTimePickerStart(false);
    };

    const onChangeDateEnd = (selectedDate) => {
        const currentDate = selectedDate || dateEnd;
        setDateEnd(currentDate);
        setShowDatePickerEnd(false);
    };

    const onChangeTimeEnd = (selectedTime) => {
        const currentTime = selectedTime || timeEnd;
        setTimeEnd(currentTime);
        setShowTimePickerEnd(false);
    };

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
                            {moment(dateStart).format('dddd, MMMM Do YYYY')}
                        </Text>
                    </View>
                    
                    <Icon
                        name='create-outline'
                        type='ionicon'
                        size={25}
                        onPress={() => {setShowDatePickerStart(true)}}
                    />

                    <View style={styles.centerContainer}>
                        <Text>
                            {moment(timeStart).format('HH:mm')}
                        </Text>
                    </View>

                    <Icon
                        name='create-outline'
                        type='ionicon'
                        size={25}
                        onPress={() => {setShowTimePickerStart(true)}}
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
                            {moment(dateEnd).format('dddd, MMMM Do YYYY')}
                        </Text>
                    </View>
                    
                    <Icon
                        name='create-outline'
                        type='ionicon'
                        size={25}
                        onPress={() => {setShowDatePickerEnd(true)}}
                    />

                    <View style={styles.centerContainer}>
                        <Text>
                            {moment(timeEnd).format('HH:mm')}
                        </Text>
                    </View>
                    
                    <Icon
                        name='create-outline'
                        type='ionicon'
                        size={25}
                        onPress={() => {setShowTimePickerEnd(true)}}
                    />
                </View>
            </View>

            <Icon
                name='save-outline'
                type='ionicon'
                size={25}
                onPress={() => {
                    addEvent({ name, location, dateStart, timeStart, dateEnd, timeEnd})
                    navigation.navigate('CalendarOverviewPage')
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
    }
});
