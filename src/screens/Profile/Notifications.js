import React , { useEffect }from 'react'
import {Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import Notification from './Notification'
import { useIsFocused } from '@react-navigation/native';
import firebase from "firebase";
import app from '../../../Base'
require('firebase/firestore');

const Notifications = (props) => {
    const isFocused = useIsFocused();
    const db = app.firestore()

    const read = async(id) =>{await db
        .collection('Notification')
        .doc(id)
        .update({
            read : true
        })
        .then(()=>{
            //console.warn('readsettrue')
        })
        .catch((error)=>console.warn(error))
    }

    useEffect(() => {
        if(isFocused ) {
            props.route.params.notifications.map(item => (read(item.id)))        
        }
    })

    return (
        <ScrollView style={{marginBottom : 80,marginTop:5}}>
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
