import React, { useState , useEffect } from 'react'
import { StyleSheet, SafeAreaView , Text, View, ScrollView } from 'react-native'
import MapView from 'react-native-maps';
import CustomListItem from './CustomListItem';
import app from '../../../Base';
import { useNavigation } from '@react-navigation/core'

require('firebase/firestore');

const Chat = () => {
    const [chats , setChats] = useState([])
    const navigation = useNavigation();
    const db = app.firestore();


    useEffect(() => {
        const getChats =()=>{ 
            db.collection("chats").onSnapshot((snapshot) =>{
        
            setChats( snapshot.docs.map((doc)=>({
                id:doc.id,
                data:doc.data()
            }))
        )}
        )}
        return getChats()
    }, [])

    return (
        <View>

            <View style={styles.header}>
                <Text style={styles.title}>Chats</Text>
            </View>

            <ScrollView>

                {chats.map(({id, data : {chatName}})=>(
                <CustomListItem key={id} id = {id} chatName={chatName} />
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
