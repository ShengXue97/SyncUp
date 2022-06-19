import { StyleSheet, View, Text } from 'react-native';
import React, { useState, useCallback, useEffect, useContext } from 'react'
import { Input, Icon } from '@rneui/themed';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CalendarContext from './CalendarContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, useToast, Center, Box } from "native-base";
import * as Moment from 'moment';
import moment from 'moment';
import { extendMoment } from 'moment-range';
import uniqid from 'uniqid';
import AppContext from '../AppContext';
import App from '../../App';

const extendedMoment = extendMoment(Moment);

export default function CalendarEditPage(props) {
    const route = useRoute();

    const defaultName = route.params.name || "";
    const defaultLocation = route.params.location || "";
    const dateStartMoment = route.params.dateStartMoment || moment(new Date());
    const dateEndMoment = route.params.dateEndMoment || moment(new Date());

    const [name, setname] = useState(defaultName);
    const [location, setLocation] = useState(defaultLocation);

    const [dateStart, setDateStart] = useState(dateStartMoment.clone());
    const [timeStart, setTimeStart] = useState(dateStartMoment.clone());

    const [dateEnd, setDateEnd] = useState(dateEndMoment.clone());
    const [timeEnd, setTimeEnd] = useState(dateEndMoment.clone());

    return (
        <ScrollView>
            <View style={styles.container} >
                <Input
                    placeholder="Event name"
                    leftIcon={{ type: 'ionicon', name: 'calendar-outline' }}
                    defaultValue={defaultName}
                    disabled={true}
                />

                <Input
                    placeholder="Location"
                    leftIcon={{ type: 'ionicon', name: 'location-outline' }}
                    defaultValue={location}
                    disabled={true}
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

                        <View style={styles.centerContainer}>
                            <Text>
                                {timeStart.format('HH:mm')}
                            </Text>
                        </View>
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

                        <View style={styles.centerContainer}>
                            <Text>
                                {timeEnd.format('HH:mm')}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView >
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
