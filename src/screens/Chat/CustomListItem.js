import { useNavigation } from '@react-navigation/native'
import React , {useEffect , useState} from 'react'
import { StyleSheet,SafeAreaView , Text, View , Image ,Pressable, Dimensions } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { NavigationEvents } from 'react-navigation'
import firebase from "firebase";
import app from '../../../Base';
require('firebase/firestore');

const CustomListItem = ({id , chatName}) => {
    const navigation = useNavigation()
    const [ chatMessages , setChatMessages] = useState([])
    const db = app.firestore();

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
    },)
    return (
        <View>
            <Pressable style={styles.container} onPress={()=>navigation.navigate('Chat Screen',{chatName , id })}>
                <View>
                    <Image
                        style={styles.image}
                        source={{
                            uri: `https://firebasestorage.googleapis.com/v0/b/lebanonlivedoutdoors.appspot.com/o/Profile%2F0.9644275800425436?alt=media&token=8f724984-c0e2-42b6-bf80-9a807f9b8861`
                        }}
                    />
                </View>
                < View style={styles.container2}>
                    <View>
                        <Text style={styles.name}>
                            {chatName}
                        </Text>

                        <Text style={styles.message}>
                            {chatMessages?.[0]?.message}
                        </Text>

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
        fontSize: 17,
        color: 'grey',
        marginBottom:5

    },

    icon : {
        position:'absolute',
        left: 250
    },

})
