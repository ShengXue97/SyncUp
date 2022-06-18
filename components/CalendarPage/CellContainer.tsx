import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import CalendarContext from '../../pages/CalendarPage/CalendarContext';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../../pages/AppContext';

export default function CellContainer(props) {
    const [cellTime, setCellTime] = useState(null);

    const { calendarEvents, addEvent } = useContext(CalendarContext)

    const navigation = useNavigation();
    const { pageTitle, changePageTitle } = useContext(AppContext)

    const handlePress = () => {
        console.log(props.cellDate.format('YYYY-MM-DD HH:mm:ss'));
        changePageTitle('Add Event');

        navigation.navigate('CalendarEditPage', {
            status: 'add_selected',
            cellDate: props.cellDate,
        })
    }

    useEffect(() => {
        var time = props.j + ":00";
        if (props.j < 10) {
            time = "0" + time;
        }
        setCellTime(time);
    });

    return (
        //Cell container needs to use inline style for dynamic update of width and height during rotation
        //i is column count, j is row count
        <TouchableOpacity key={props.j} onPress={handlePress} style={{
            flex: 1,
            borderColor: '#D3D3D3',
            borderBottomWidth: props.i == 8 ? 0 : props.i == 0 ? 0 : 1,
            borderLeftWidth: 1,
            width: props.dimensions.window.width / 7.77,
            height: props.dimensions.window.height / 15,
            backgroundColor: 'white',
        }}>
            {props.i == 0 ?
                //First column is special, showing the time
                <Text style={{
                    fontSize: 10,
                    textAlign: 'center',
                }}>{cellTime}</Text>
                :
                //Other cells
                <View />
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
});
