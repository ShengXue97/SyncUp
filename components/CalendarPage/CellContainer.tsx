import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function CellContainer(props) {

    return (
        //Cell container needs to use inline style for dynamic update of width and height during rotation
        //i is column count, j is row count
        <TouchableOpacity key={props.j} style={{
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
                }}>{props.j < 10 ? 0 : null}{props.j}:00</Text>
                : 
                //Other cells
                <Text></Text>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
});
