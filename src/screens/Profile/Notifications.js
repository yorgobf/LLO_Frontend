import React from 'react'
import {Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import Notification from './Notification'

const Notifications = (props) => {
    return (
        <ScrollView>
            {!props.route.params.notifications[0]  && (
                <View style={{
                    width:Dimensions.get('screen').width,
                    height:Dimensions.get('screen').height-300,
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Text style={{
                        color:'grey',
                        fontSize:25,
                        textAlign: 'center'
                    }}>There is no notifications yet!</Text>
                    
                </View>
            )}
            <FlatList
                //keyExtractor={(item) => item.id}
                data={props.route.params.notifications}
                renderItem={({item}) => (
                    <Notification
                        item={item} 
                    />)} />
        </ScrollView>
    )
}

export default Notifications

const styles = StyleSheet.create({})
