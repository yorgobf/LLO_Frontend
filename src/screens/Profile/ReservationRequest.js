import React from 'react'
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import Request from './Request'

const ReservationRequest = (props) => {
    return (
        <ScrollView style={{marginBottom : 80}}>

        {!props.route.params.item[0]  && (
                <View style={{
                    width:Dimensions.get('screen').width,
                    height:Dimensions.get('screen').height-300,
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Text style={{
                        color:'grey',
                        fontSize:25,
                        marginHorizontal:10,
                        textAlign: 'center'
                    }}>There is no reservation requests yet!</Text>
                    
                </View>
            )}
            
            <FlatList
                //keyExtractor={(item) => item.id}
                data={props.route.params.item}
                renderItem={({item}) => (
                    <Request
                        item={item} 
                    />)} />
            
        </ScrollView>
    )
}

export default ReservationRequest

const styles = StyleSheet.create({})
