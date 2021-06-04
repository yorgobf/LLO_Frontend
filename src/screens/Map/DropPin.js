import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DropPin = (props) => {
    return (
        <Marker coordinate={{ latitude : latitude , longitude : longitude }} >
                <View style={{
                    backgroundColor: isSelected ? 'black' : 'white' , 
                    padding:5 ,
                    borderWidth:1,
                    borderRadius:20,
                    borderColor: 'grey'
                    }}>
                    <Text 
                    style={{
                        fontWeight: 'bold',
                        color: isSelected ? 'white' : 'Black' 
                    }}>
                    {price.props}
                    </Text>
                </View>
        </Marker>
    )
}

export default DropPin

const styles = StyleSheet.create({})
