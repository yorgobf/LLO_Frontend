import { useNavigation } from '@react-navigation/core'
import React , { useState , useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, ImageBackground , Image , Button, Pressable } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MapView, { Marker } from 'react-native-maps';
import app from '../../../Base'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import API from '../../../NGROK'

require('firebase/firestore');

const PostScreen = (props) => {

    const navigation = useNavigation()

    const [hostname,setHostname] = useState(props.route.params.item.hostname)
    const [lessons,setLessons] = useState(props.route.params.item.lessons)
    const [wifi,setWifi] = useState(props.route.params.item.wifi)
    const [toilets,setToilets] = useState(props.route.params.item.toilets)
    const [water,setWater] = useState(props.route.params.item.water)
    const [shower,setShower] = useState(props.route.params.item.shower)
    const [parking,setParking] = useState(props.route.params.item.parking)
    const [fire,setFire] = useState(props.route.params.item.fire)
    const [chats , setChats] = useState([])

    const [username , setUsername] = useState();


    const [coordinates,setCoordinates] = useState( JSON.parse(props.route.params.item.location_coordinate))

    const goToBookingScreen = () =>{
            navigation.navigate("Book")
    }

    const db = app.firestore()
    
    const createChat = async (username , hostname) => {
        await db
        .collection('chats')
        .add({ 
            participants: [ hostname , username]  })
        .then(()=>{
            alert('chat Added')
        //navigation.goBack()
        })
        .catch((error)=>alert(error))
    }

    const deletePost = (id) =>{

        axios.delete(`${API}/api/delete/${id}`)
        .then(res=>{
            alert(res.data.message),
            navigation.goBack()
        })
        .catch(err =>console.warn(err))
        

    }
    

    const checkChat = async (username , hostname) => {
        
        var exist = false;
        let create 
        
        let u 
        await db.
                collection("chats")
                .where( "participants" , "array-contains", username)
                .onSnapshot(
                    (snapshot) =>{
                        setChats( snapshot.docs.map((doc)=>({
                            data:doc.data()
                        }))
                            //console.warn(exist)
                            //exist = n.includes(hostname)
                        )
                        //return alert('Chat already exist!\nGo to the chat Screen to chat with the host')
                    }
                )
                .catch((error)=>alert(error))

            console.warn(chats)

    }

    const getUserData = async () => {
        try {
        var name = await AsyncStorage.getItem('username')
        setUsername(name)}
        catch(e) {
            console.warn(e)
        }
    }
    
    useEffect(() => {
        getUserData()
    }, [])

    return (
        <View style={{height:'100%'}}>
        <ScrollView style={styles.mainContainer}>
            <View >

            {/*image */}
                <ImageBackground source={{uri : props.route.params.item.photo_url}} style={styles.image}>
                <Pressable>
                    <Octicons name={'x'} size={30} style={{padding:10,marginTop:5}} color={'white'} onPress={()=>navigation.goBack()}/>
                </Pressable>
                </ImageBackground>
            </View>

                <View style={{padding: 14}}>
                {/*Location */}
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Ionicons name={'location-sharp'} size={15} color={'#111'}/>
                <Text style={styles.loc}> {props.route.params.item.location} </Text>
                </View>

                <View style={{
                    paddingLeft:5,
                    borderBottomWidth: 1,
                    borderColor: 'lightgrey',
                    flexDirection:'row',
                    alignItems:'center'
                    }}>
                        <View style={{borderRightColor:'lightgrey',borderRightWidth:1,width:'50%'}}>

                            <Text style={{fontWeight:'bold',fontSize:25}}>{props.route.params.item.name}</Text>
                            <View style={{flexDirection:'row', }}>
                                <Text>Hosted by : </Text>
                                <Text style={{textDecorationLine: 'underline',marginBottom:4}}>{props.route.params.item.hostname}</Text>
                            </View>
                            <View style={{flexDirection:'row', }}>
                                <Ionicons name={'call-sharp'} size={15} color={'#111'} style={{marginTop:3}}/>
                                <Text style={{marginBottom:6}}> : {props.route.params.item.phone_num} </Text>
                            </View>
                        </View>
                        
                        <View style={{marginLeft:5}}>
                            <Text style={{fontSize:15, fontWeight:'bold' ,marginBottom:3 ,marginLeft:5}}>Category :</Text>
                            <Text style = {{marginBottom:7}} > {props.route.params.item.category}</Text>
                        </View>
                </View>

                <View  style={{padding: 7,paddingLeft:5, borderBottomWidth: 1, borderColor: 'lightgrey'}} >
                    <Text style={{fontSize:17, fontWeight:'bold'}}>Description :</Text>
                    <Text style={styles.description}>{props.route.params.item.description}</Text>
                </View>

                {/*Fees : */}
                <View  style={{padding: 7,paddingLeft:5, borderBottomWidth: 1, borderColor: 'lightgrey'}} >
                    <Text style={{fontSize:17, fontWeight:'bold' ,marginBottom:3 }}>Fees :</Text>
                    <View style={{flexDirection:'row',padding:5}}>
                        <Image source={require('../../../assets/tabIcons/adults.png')} style={{height:25,width:25,tintColor:'#5a5a5a'}}/>
                        <Text style={{marginLeft:7,fontSize:17}}>Adults :</Text>
                        <Text style={{marginLeft:6,fontSize:17}}>{props.route.params.item.price_adults}</Text>
                        <FontAwesome name={'dollar'} size={15} style={styles.icon1} />
                    </View>
                    <View style={{flexDirection:'row',padding:5}}>
                        <Image source={require('../../../assets/tabIcons/kid.png')} style={{height:25,width:25,tintColor:'#5a5a5a'}}/>
                        <Text style={{marginLeft:7,fontSize:17}}>Kids :</Text>
                        <Text style={{marginLeft:7,fontSize:17}}>{props.route.params.item.price_kids}</Text>
                        <FontAwesome name={'dollar'} size={15} style={styles.icon} />
                    </View>
                </View>

                {/*Amenities : */}
                <View  style={{padding: 7,paddingLeft:5, borderBottomWidth: 1, borderColor: 'lightgrey'}} >

                    <Text style={{fontSize:17, fontWeight:'bold' ,marginBottom:10 }}>Amenities :</Text>

                    <View style={{borderWidth:1,borderColor:'grey',borderRadius:5,flexDirection:'row',marginBottom:10}}>

                        <View>
                            <View style={{flexDirection:'row',marginLeft:7, padding:10, alignItems:'center'}}>
                                <Feather name={'wifi'} size={30} style={{color: wifi==1?'black' : 'lightgrey'}}/>
                                <Text style={{...styles.amenity , color: wifi==1?'black' : 'lightgrey'}}>Wifi</Text>
                            </View>

                            <View style={{flexDirection:'row',marginLeft:11, padding:8, alignItems:'center' , marginBottom:7}}>
                                <FontAwesome5 name={'toilet'} size={29} style={{color: toilets==1?'black' : 'lightgrey'}}/>
                                <Text style={{...styles.amenity , color: toilets==1?'black' : 'lightgrey'}}>Toilets</Text>
                            </View>

                            <View style={{flexDirection:'row',marginLeft:9, padding:6, alignItems:'center' , marginBottom:7}}>
                                <Ionicons name={'water-outline'} size={29} style={{color: water==1?'black' : 'lightgrey'}}/>
                                <Text style={{...styles.amenity , color: water==1?'black' : 'lightgrey'}}>Potable Water</Text>
                            </View>
                        </View>

                        <View style={{marginLeft:10}}>
                            <View style={{flexDirection:'row',marginLeft:7, padding:11, alignItems:'center'}}>
                                <FontAwesome name={'shower'} size={28} style={{color: shower==1?'black' : 'lightgrey'}}/>
                                <Text style={{...styles.amenity , color: shower==1?'black' : 'lightgrey'}}>Shower</Text>
                            </View>

                            <View style={{flexDirection:'row',marginLeft:7, padding:9, alignItems:'center' , marginBottom:5}}>
                            <Image source={require('../../../assets/tabIcons/parking.png')} style={{height:32,width:30,tintColor:parking==1?'black' : 'lightgrey'}}/>
                                <Text style={{...styles.amenity , color: parking==1?'black' : 'lightgrey'}}>Parking</Text>
                            </View>

                            <View style={{flexDirection:'row',marginLeft:9, padding:6, alignItems:'center' , marginBottom:7}}>
                                <Ionicons name={'bonfire-outline'} size={29} style={{color: fire==1?'black' : 'lightgrey'}}/>
                                <Text style={{...styles.amenity , color: fire==1?'black' : 'lightgrey'}}>Camp Fire</Text>
                            </View>
                        </View>
    
                    </View>
                    
                </View>

                {/*Lessons */}
                {lessons ==1 && (
                    <View style={{padding: 7,paddingLeft:5, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
                        <Text style={{fontSize:17, fontWeight:'bold'}}>Lessons are also available :</Text>
                        <Text style={{fontSize: 16,lineHeight: 26,padding : 5}}>{props.route.params.item.lessons_details}</Text>
                    </View>
                )}

                {/*Location */}
                <View style={{padding: 7,paddingLeft:5, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
                    <Text style={{fontSize:17, fontWeight:'bold', marginBottom:10}}>Location on maps :</Text>
                    <View style={styles.map}>
                        <MapView
                            style={{width:'100%',height:'100%'}}
                            initialRegion={{
                            longitude: coordinates.longitude,
                            latitude: coordinates.latitude,
                            latitudeDelta: 0.04,
                            longitudeDelta: 0.01,
                            }}
                            >

                            <Marker
                                coordinate={coordinates}
                            />
                            
                        </MapView>
                    </View>                    
                </View>

                {/*Chat with host */}
                <Pressable onPress={()=>checkChat(username , hostname)} style={{padding: 7,paddingLeft:5, borderBottomWidth: 1, borderColor: 'lightgrey', flexDirection: 'row' , alignItems: 'center',}} >
                    <View>
                        <Text style={{fontSize:17, fontWeight:'bold' ,marginBottom:3 }}>Have a Question?</Text>
                        <Text style={{fontSize:17,marginBottom:5}}>Send {props.route.params.item.hostname} a message!</Text>
                    </View>
                    <Feather name={'chevron-right'} size={30} style={{marginLeft:'38%'}}/>
                </Pressable>

            </View>

        </ScrollView>

        {/*Book  */}
        <View style={styles.book}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{justifyContent: 'center',marginLeft:30}}>
                    {/**Price */}
                    <Text style={styles.prices}>
                        <Text style={styles.price}> {props.route.params.item.price_adults} $ </Text>
                        / Adult
                    </Text>
                </View >
                {(username === hostname )?(
                <Pressable 
                onPress={()=>deletePost(props.route.params.item.id)}
                style={{                    
                    backgroundColor:'red',
                    width:125,
                    alignSelf:'flex-end',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height:45 ,
                    //position:'relative',
                    marginRight : 30,
                    borderRadius: 10,
                    
            }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight:'bold',
                        color: 'white'
                        }}>Delete</Text>
                </Pressable>
            ):(
                <Pressable 
                onPress={goToBookingScreen}
                style={{                    
                    backgroundColor:'#f15454',
                    width:125,
                    alignSelf:'flex-end',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height:45 ,
                    marginRight : 30,
                    borderRadius: 10,
            }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight:'bold',
                        color: 'white'
                        }}>Book</Text>
                </Pressable>
            )
            }
            
            </View>

        </View>
        
        </View>
    )
}

export default PostScreen

const styles = StyleSheet.create({

    mainContainer: {
        height:'90%',
    },

    image:{
        height:200,
        width: Dimensions.get('screen').width,
        aspectRatio: 24/12,
        resizeMode: 'cover',
        marginTop : 10 ,
    },

    description:{
        fontSize: 18,
        lineHeight: 26,
        padding: 5
    },

    map:{
        width : Dimensions.get('screen').width - 40,
        height: Dimensions.get('screen').width - 40, 
        borderWidth:2,
        borderColor:'grey',
        borderRadius: 5,
        marginBottom:10
    },

    nbPers: {
        marginVertical: 10,
        color: '#5b5b5b',
    },

    amenity:{
        fontSize:17,
        marginLeft:5
    },

    loc: {
        marginVertical: 10,
        color: '#111',

    },

    prices: {
        fontSize: 18,
        //marginLeft: '6%',
        //marginRight: '15%'
    },

    oldprice: {
        color: '#5b5b5b',
        textDecorationLine: 'line-through',
    },

    price:{
        fontWeight: 'bold',
    },

    totalPrice:{
        color: '#5b5b5b',
        textDecorationLine: 'underline'
    },

    book: {
        width:Dimensions.get('screen').width,
        height: '12%',
        backgroundColor:'#1111',
        justifyContent: 'center',
        
    },
    
    icon: {
        //position: 'absolute',
        //right: '69%',
        marginLeft:5,
        top:4,
        opacity: 0.5,
        color:'black'
    },

    icon1: {
        // position: 'absolute',
        // right: '64.5%',
        // top:10,
        // opacity: 0.5,
        // color:'black'
        marginLeft:5,
        top:4,
        opacity: 0.5,
        color:'black'
    },
})
