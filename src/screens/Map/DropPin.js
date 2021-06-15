import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView , {Marker}  from 'react-native-maps';

const DropPin = (props) => {
    var coordinates = JSON.parse(props.item.location_coordinate)
    return (
        <Marker coordinate={coordinates} >
                <View style={{
                    backgroundColor: props.isSelected ? 'black' : 'white' , 
                    padding:5 ,
                    borderWidth:1,
                    borderRadius:20,
                    borderColor: 'grey'
                    }}>
                    <Text 
                    style={{
                        fontWeight: 'bold',
                        color: props.isSelected ? 'white' : 'black' 
                    }}>
                    {props.item.price_adults} $
                    </Text>
                </View>
        </Marker>
    )
}

export default DropPin

const styles = StyleSheet.create({})
