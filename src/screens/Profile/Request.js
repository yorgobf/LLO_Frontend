import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import firebase from "firebase";
import app from '../../../Base'
import axios from 'axios';
import API from '../../../NGROK';
require('firebase/firestore');

const Request = (props) => {
    const navigation = useNavigation()

    const db = app.firestore()

    const save = () =>{
        const data = {
            userId :  props.item.data.senderId,
            username : props.item.data.sender,
            businessName : props.item.data.businessName,
            businessId : props.item.data.businessId,
            number_adults: props.item.data.numberAdults,
            number_kids: props.item.data.numberKids,
            date : props.item.data.date,
        }

        axios.post(`${API}/api/addreservation`,data)
        .then(
            
        )
        .catch(err=>console.warn(err))
    }

    const accept = async() =>{
        save()
        await db
        .collection('Reservation Request')
        .doc(props.item.id)
        .update({
            read : true
        })
        .then(()=>{
            //console.warn('readsettrue')
        })
        .catch((error)=>console.warn(error))


        await db
        .collection('Notification')
        .add({ 
            read : false,
            sender : props.item.data.recipient ,
            senderId : props.item.data.recipientId ,
            recipient : props.item.data.sender ,
            recipientId : props.item.data.senderId ,
            businessName : props.item.data.businessName,
            date : props.item.data.date,
            status : 'accepted',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
        .then(()=>{
            alert('Reservation accepted!\nThe user will be notified now.')
            navigation.goBack()
        })
        .catch((error)=>alert(error))
    }
    return (
        <View style={styles.container}>
            {/* {console.warn(props.item.id)} */}

            <View style={styles.innerContainer}>
                
                <Text style={{fontWeight:'bold', fontSize:19 , textDecorationLine:'underline'}}>
                    {props.item.data.businessName} :
                </Text>

                <View style={{padding:10 , borderBottomColor:'lightgrey' , borderBottomWidth:1}}>

                    <Text style={{fontSize:17 ,marginBottom:3}}>
                        user : {props.item.data.sender}
                    </Text>

                    <Text style={{fontSize:17 ,marginBottom:3}}>
                        Number of adults : {props.item.data.numberAdults}
                    </Text>

                    <Text style={{fontSize:17 ,marginBottom:3}}>
                        Number of kids : {props.item.data.numberKids}
                    </Text>

                    <Text style={{fontSize:17, marginBottom:8}}>
                        date : {props.item.data.date}
                    </Text>

                </View>

                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>

                    <Pressable onPress={()=>accept()} style={styles.accept}>
                        <Feather name='check' size={35} color='white' />
                    </Pressable>
                    
                    <Pressable style={styles.decline}>
                    <Feather name='x' size={35} color='white' />
                    </Pressable>

                </View>
            </View>
            
        </View>
    )
}

export default Request

const styles = StyleSheet.create({
    container: {
        marginVertical:7,
        marginHorizontal : '4%',
        width : "92%",
        borderWidth : 1,
        borderColor : 'lightgrey',
        borderRadius:15,
        overflow:'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,

    },

    innerContainer:{
        padding :20,
        backgroundColor: 'white'
    },

    accept : {
        backgroundColor:'#0ed145',
        width:70,
        height:45,
        marginLeft:45,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,

    },

    decline : {
        backgroundColor:'red',
        width:70,
        height:45,
        marginRight:45,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,
    },
})
