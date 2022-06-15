import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react'
import { Input, Icon } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    

    const onChangeDateStart = (event, selectedDate) => {
        const currentDate = selectedDate || dateStart;
        setDateStart(currentDate);
        setShowDatePickerStart(false);
    };

    const onChangeTimeStart = (event, selectedTime) => {
        const currentTime = selectedTime || timeStart;
        setTimeStart(currentTime);
        setShowTimePickerStart(false);
    };

    const onChangeDateEnd = (event, selectedDate) => {
        const currentDate = selectedDate || dateEnd;
        setDateEnd(currentDate);
        setShowDatePickerEnd(false);
    };

    const onChangeTimeEnd = (event, selectedTime) => {
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

            {
                showDatePickerStart &&
                <DateTimePicker
                    value={dateStart}
                    onChange={onChangeDateStart}
                    mode='date'
                    timeZoneOffsetInMinutes={0}
                />
            }

            {
                showTimePickerStart &&
                <DateTimePicker
                    value={timeStart}
                    onChange={onChangeTimeStart}
                    mode='time'
                    timeZoneOffsetInMinutes={0}
                />
            }

            {
                showDatePickerEnd &&
                <DateTimePicker
                    value={dateEnd}
                    onChange={onChangeDateEnd}
                    mode='date'
                    timeZoneOffsetInMinutes={0}
                />
            }

            {
                showTimePickerEnd &&
                <DateTimePicker
                    value={timeEnd}
                    onChange={onChangeTimeEnd}
                    mode='time'
                    timeZoneOffsetInMinutes={0}
                />
            }

            <TouchableOpacity onPress={() => {setShowDatePickerStart(true)}}>
                <Text>
                    {moment(dateStart).format('dddd, MMMM Do YYYY')}
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {setShowTimePickerStart(true)}}>
                <Text>
                    {moment(timeStart).format('HH:mm')}
                </Text>
            </TouchableOpacity>
            

            <TouchableOpacity onPress={() => {setShowDatePickerEnd(true)}}>
                <Text>
                    {moment(dateEnd).format('dddd, MMMM Do YYYY')}
                </Text>
            </TouchableOpacity>
            

            <TouchableOpacity onPress={() => {setShowTimePickerEnd(true)}}>
                <Text>
                    {moment(timeEnd).format('HH:mm')}
                </Text>
            </TouchableOpacity>
            

            

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
});
