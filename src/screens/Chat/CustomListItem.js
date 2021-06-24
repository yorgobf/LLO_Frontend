import { useNavigation } from '@react-navigation/native'
import React , {useEffect , useState} from 'react'
import { StyleSheet,SafeAreaView , Text, View , Image ,Pressable, Dimensions } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { NavigationEvents } from 'react-navigation'
import firebase from "firebase";
import app from '../../../Base';
import axios from 'axios'
import API from '../../../NGROK'
require('firebase/firestore');

const CustomListItem = ({id , username , participants}) => {
    const navigation = useNavigation()
    const [ chatMessages , setChatMessages] = useState([])
    const db = app.firestore();
    const [secondUser,setSecondUser] = useState()
    const  [photo , setPhoto] = useState('https://firebasestorage.googleapis.com/v0/b/lebanonlivedoutdoors.appspot.com/o/profile.png?alt=media&token=009102f0-b999-47f6-a5f6-25408b95d4e4')
    let otherUser = participants.filter((name)=> name != username.username)

    useEffect(() => {
        axios.get(`${API}/api/getUser/${otherUser}`)
        .then(res=>{
            setSecondUser(res.data),
            setPhoto(res.data.profile)}
        )
        .catch(err=>console.warn("cus" , err))
    }, [])

    useEffect(() => {
        const unsubscribe = db.collection('chats')
                                .doc(id)
                                .collection('messages')
                                .orderBy('timestamp','desc')
                                .onSnapshot(
                                    (snapshot)=> setChatMessages(
                                        snapshot.docs.map(
                                           (doc)=>doc.data())));

        return unsubscribe;
    },[])

    return (
        <View>
            <Pressable style={styles.container} onPress={()=>navigation.navigate('Chat Screen',{secondUser , id })}>
                <View>
                    <Image
                        style={styles.image}
                        source={{
                            uri: photo
                        }}
                    />
                </View>
                < View style={styles.container2}>
                    <View>
                        <Text style={styles.name}>
                            {otherUser}
                        </Text>

                            {(chatMessages?.[0]?.displayName === username.username)?
                            (
                                <View style={{flexDirection:'row',alignItems:'center',marginTop:3}}>
                                    <Text>You : </Text>
                                    <Text style={styles.message}>{chatMessages?.[0]?.message}</Text>
                                </View>
                            ):
                            (<Text style={styles.message}>{chatMessages?.[0]?.message}</Text>)
                            }

                    </View>
                    <Feather name={'chevron-right'} size={20} style={styles.icon}/>
                </View>
            </Pressable>
        </View>
    )
}

export default CustomListItem

const styles = StyleSheet.create({
    container: {
        backgroundColor : 'white',
        borderBottomColor : 'lightgrey',
        borderBottomWidth : 1,
        height  :90,
        width : Dimensions.get('screen').width,
        flexDirection:'row'

    },

    image:{ 
        margin:15,
        width:60,
        height:60,
        borderRadius:45,
    },

    container2: {
        flexDirection:'row',
        alignItems:'center',

    },

    name: {
        fontWeight : '800',
        fontSize: 20

    },

    message: {
        fontSize: 16,
        color: 'grey',
        //marginBottom:5

    },

    icon : {
        position:'absolute',
        left: 250
    },

})
