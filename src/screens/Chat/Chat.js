import React, { useState , useEffect } from 'react'
import { StyleSheet, SafeAreaView , Text, View, ScrollView, Dimensions } from 'react-native'
import MapView from 'react-native-maps';
import CustomListItem from './CustomListItem';
import app from '../../../Base';
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage';

require('firebase/firestore');

const Chat = (username) => {
    //const [username , setUsername] = useState();
    const [chats , setChats] = useState([])
    const navigation = useNavigation();
    const db = app.firestore();
    //var user = "Jad"

    useEffect(()=>{
        const getChats =(user)=>{ 
            db.collection("chats").where( "participants" , "array-contains", user)
            //.orderBy('timestamp')
            .onSnapshot((snapshot) =>{
        
            setChats( snapshot.docs.map((doc)=>({
                id:doc.id,
                data:doc.data()
            }))
        )}
        )}

        //console.warn(user)

        return getChats(username.username)
    },[])


    return (
        <View>

            <View style={styles.header}>
                <Text style={styles.title}>Chats</Text>
            </View>

            <ScrollView>
            {!chats[0] && (
                            <View style={{
                                width:Dimensions.get('screen').width,
                                height:Dimensions.get('screen').height-300,
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                                <Text style={{
                                    color:'grey',
                                    fontSize:25
                                }}>No chats yet...</Text>
                                
                                <Text style={{
                                    color:'grey',
                                    fontSize:25,
                                    marginHorizontal:25,
                                    marginTop:10
                                }}>Pick the activity you like </Text>

                                <Text style={{
                                    color:'grey',
                                    fontSize:25,
                                    marginHorizontal:25,
                                    textAlign: 'center'
                                }}>and start chatting with the host</Text>
                            </View>
            )}

                {chats.map(({id, data : {participants}})=>(
                    // console.warn(participants),
                <CustomListItem key={id} id = {id} participants={participants} username = {username} />
                ))}

            </ScrollView>
        </View>
    )
}

export default Chat

const styles = StyleSheet.create({

    header: {
        backgroundColor:'#fff',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        borderBottomColor:'grey'
    },

    title: {
        fontWeight:'800',
        fontSize:21
    },
})