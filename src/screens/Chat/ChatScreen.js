import { useNavigation } from '@react-navigation/native'
import { dumpToBuffer } from 'bser'
import React , {useLayoutEffect , useEffect, useState} from 'react'
import { Platform, StyleSheet, TouchableWithoutFeedback, Text, View , KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from "react-native-vector-icons/Ionicons"
import app from '../../../Base';
import firebase from "firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
require('firebase/firestore');

const ChatScreen = ({route}) => {
    const navigation = useNavigation()
    const name = route.params.chatName
    const [message,setMessage] = useState('')
    const db = app.firestore();
    const [username , setUsername] = useState();
    const [profile , setProfile] = useState();
    const [messages , setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            title : name
        })
    }, [navigation,messages])

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id)
                .collection('messages').orderBy('timestamp','desc')
                .onSnapshot(snapshot=>
                    setMessages(
                    snapshot.docs.map(doc => ({
                        id : doc.id ,
                        data : doc.data()
                    }))
                ))

        return unsubscribe;
    }, [route])

    const sendMessage = (message , username , profile) => {
        Keyboard.dismiss();
        var input = JSON.parse(message)
        console.warn(input)

        // db.collection('chats').doc(route.params.id).collection('messages').add({
        //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //     message: message,
        //     displayName : username ,
        //     photo : profile,
        // })
        // setMessage('')
    }

    const getData = async () => {
        try {
        var name = await AsyncStorage.getItem('username')
        setUsername(name)
        var profile = await AsyncStorage.getItem('profile')
        setProfile(profile)      
        } catch(e) {
            console.warn("getdata", e)
        }

    }

    useEffect(() => {
        getData()
    },[])

    return (
        <SafeAreaView style={{flex:1, }}>
            {console.warn(message)}
            <KeyboardAvoidingView
                behavior={Platform.OS ==="ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
                        <View style={styles.container}>
                            <ScrollView contentContainerStyle={{paddingTop:15}}>
                                {messages.map(({id,data})=> (
                                    data.username === username ? (
                                        <View key={id} style={styles.sender}>
                                            <Image style={styles.imageSender} source={{uri : data.poto}}/>
                                            <Text style={styles.senderName}>{data.displayName}</Text>
                                            <Text style={styles.senderText}>{data.message}</Text>
                                        </View>
                                    ) : (
                                        <View key={id} style={styles.receiver}>
                                            <Image style={styles.imageReceiver} source={{uri : data.poto}}/>
                                            <Text style={styles.receiverName}>{data.displayName}</Text>
                                            <Text style={styles.receiverText}>{data.message}</Text>
                                        </View>
                                    )
                                ))}                                
                            </ScrollView>
                            <View style={styles.footer}>
                                <TextInput
                                value={message}
                                onChange={text => setMessage(text)}
                                placeholder="Enter Message here"
                                style={styles.textInput}
                                onSubmitEditing={()=>sendMessage(username , profile , message)} />
                                <TouchableOpacity onPress={()=>sendMessage()} activeOpacity={0.5}>
                                    <Ionicons name="send" size={24} color="#363636"/>
                                </TouchableOpacity>
                                    
                            </View>
                    </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },

    footer: {
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:15,
        backgroundColor:'white',
        //borderTopColor:'lightgrey',
        //borderTopWidth:1
    },

    imageSender:{ 
        padding:10,
        width:28,
        height:28,
        borderRadius:45,
        position:'absolute',
        right:-5,
        bottom:-15
    },

    sender: {
        padding:15,
        backgroundColor:"#2868e6",
        alignSelf:"flex-start",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:'80%',
        position:'relative'
    }, 

    senderText: {
        color:"white",
        fontWeight:"500",
        marginLeft: 10,
        marginBottom:15
    },

    senderName: {
        left:10,
        paddingRight: 10,
        fontSize:  10,
        color: 'white'
    },

    imageReceiver:{ 
        padding:10,
        width:28,
        height:28,
        borderRadius:45,
        position:'absolute',
        left:-5,
        bottom:-15
    },

    receiver: {
        padding:15,
        backgroundColor:"#e6e6e6",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:'80%',
        position:'relative'
    },

    receiverText: {
        color:"black",
        fontWeight:"500",
        marginLeft: 10,
        marginBottom:15
    },

    receiverName: {
        left:10,
        paddingRight: 10,
        fontSize:  10,
        color: 'black'
    },

    textInput: {
        bottom:0,
        height:45,
        flex:1,
        marginRight:15,
        borderColor:"transparent",
        borderWidth:1,
        backgroundColor:"#e6e6e6",
        padding:10,
        color:'grey',
        borderRadius:30
    },
})
