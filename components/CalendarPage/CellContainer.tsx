import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import CalendarContext from '../../pages/CalendarPage/CalendarContext';
import moment from 'moment';

export default function CellContainer(props) {
    const [cellTime, setCellTime] = useState(null);

    const { calendarEvents, addEvent } = useContext(CalendarContext)

    const handleClick = () => {
        console.log(props.cellDate.format("dddd, MMMM Do YYYY, HH:mm:ss"));
    }

    const updateCellStyle = () => {
        for (let i = 0; i < calendarEvents.length; i++) {
            const event = calendarEvents[i];
            const cellDateStart = props.cellDate;
            const cellDateEnd = props.cellDate.clone().add(1, 'hours');

            if (event.dateStart.get('date') !== (cellDateStart.get('date')) ||
                event.dateEnd.get('date') !== (cellDateStart.get('date'))) {
                continue;
            }

            const dateStartMoment = event.dateStart.set({
                hour: event.timeStart.get('hour'),
                minute: event.timeStart.get('minute'),
                second: 0,
                millisecond: 0,
            })

            const dateEndMoment = event.dateEnd.set({
                hour: event.timeEnd.get('hour'),
                minute: event.timeEnd.get('minute'),
                second: 0,
                millisecond: 0,
            })


            console.log("---");
            console.log(cellDateStart.format('dddd, MMMM Do YYYY HH:mm'), dateStartMoment.format('dddd, MMMM Do YYYY HH:mm'), dateEndMoment.format('dddd, MMMM Do YYYY HH:mm'));

            if (dateStartMoment.isSameOrBefore(cellDateStart)) {
                console.log("fk", cellDateEnd.format('dddd, MMMM Do YYYY HH:mm'))
                if (dateEndMoment.isSameOrAfter(cellDateEnd)) {
                    console.log("fk", cellDateEnd.format('dddd, MMMM Do YYYY HH:mm'))
                    console.log("100%")
                    return {
                        height: '100%',
                        top: 0,
                    }
                } else if (cellDateStart.diff(dateEndMoment, 'minutes') <= 60
                    && (dateEndMoment.diff(cellDateStart, 'minutes') / 60) >= 0) {
                    console.log("fk", cellDateEnd.format('dddd, MMMM Do YYYY HH:mm'))
                    console.log(String((dateEndMoment.diff(cellDateStart, 'minutes') / 60) * 100) + "%");

                    return {
                        height: String((dateEndMoment.diff(cellDateStart, 'minutes') / 60) * 100) + "%",
                        top: 0,
                    }
                }
            } else if (dateStartMoment.isSameOrBefore(cellDateEnd)) {
                console.log("fk", cellDateEnd.format('dddd, MMMM Do YYYY HH:mm'))
                if (dateEndMoment.isSameOrAfter(cellDateEnd)) {
                    console.log("fk", cellDateEnd.format('dddd, MMMM Do YYYY HH:mm'))
                    console.log(dateStartMoment.format('dddd, MMMM Do YYYY HH:mm'));
                    console.log(cellDateEnd.diff(dateStartMoment, 'minutes'));
                    return {
                        height: String((cellDateEnd.diff(dateStartMoment, 'minutes') / 60) * 100) + "%",
                        bottom: 0,
                    }
                } else {
                    console.log(String((dateEndMoment.diff(dateStartMoment, 'minutes') / 60) * 100) + "%");
                    console.log(String(100 - ((cellDateEnd.diff(dateEndMoment, 'minutes') / 60) * 100)) + "%");
                    return {
                        height: String((dateEndMoment.diff(dateStartMoment, 'minutes') / 60) * 100) + "%",
                        bottom: String(100 - ((cellDateEnd.diff(dateEndMoment, 'minutes') / 60) * 100)) + "%",
                    }
                }
            }
        }
        return {
            height: '0%',
            bottom: 0
        }
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
        <TouchableOpacity key={props.j} onPress={handleClick} style={{
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
                <View
                    style={{
                        backgroundColor: 'green',
                        width: '100%',
                        position: 'absolute',
                        height: updateCellStyle().height,
                        top: updateCellStyle().top && 0,
                        bottom: updateCellStyle().bottom && 0,
                    }}
                />
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
});
