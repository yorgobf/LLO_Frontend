import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { useState ,useEffect } from 'react'
import { useContext } from 'react'
import { StyleSheet, Platform, Text, View ,Image,TouchableOpacity, Pressable, ScrollView} from 'react-native'
import { set } from 'react-native-reanimated'
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from '../../../Context'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { createRef } from 'react'
import app from '../../../Base'


import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import storage from'@react-native-firebase/storage';
import axios from 'axios'
import API from '../../../NGROK'

require('firebase/firestore');

const Profile = (username) => {

    let userName = username.username

    const db = app.firestore()

    var rn = require('random-number');

    const navigation = useNavigation();

    const [spinner,setSpinner]=useState(false)

    const [userId , setUserId] = useState();
    const [userToken , setUserToken] = useState();

    const [user,setUser] = useState([]);
    const [profile , setProfile] = useState('https:\/\/firebasestorage.googleapis.com\/v0\/b\/lebanonlivedoutdoors.appspot.com\/o\/profile.png?alt=media&token=009102f0-b999-47f6-a5f6-25408b95d4e4');

    const updatePhoto = (photo) =>{
        const data = {
            profile:photo
        }
        //console.warn(data)

        axios.post(`${API}/api/updateprofilephoto/${userId}`, data,  { headers: {authorization: `Bearer ${userToken}`} })
        .then(
            alert('Profile photo updated successfully!'),
            setProfile(photo),
            updateLocalStorage(photo),
            setSpinner(false)
        )
        .catch(err=>{
            console.warn(err)
            setSpinner(false)
        })
    }

    const updateLocalStorage = (photo) => {
        try{
            AsyncStorage.setItem('profile', photo)
        } catch (error){
            console.warn(error)
          }

    }

    const upload = async (image) =>{
        let random = rn()
        const response = await fetch(image);
        const blob = await response.blob()
        const task = app.storage().ref(`Profile/${random}`).put(blob);
        setSpinner(true)

        const taskProgress = snapshot =>{
            //.warn(`transferred : ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL()
            .then((snapshot)=>{ 
                updatePhoto(snapshot)
                
            })
        }

        const taskError = snapshot =>{
            //console.warn(snapshot)
            setSpinner(false)
        }

        task.on("state_changed", taskProgress , taskError , taskCompleted)

    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          cropping: true,
          compressImageQuality: 0.7
        }).then(image => {
          upload(image.path)
          bs.current.snapTo(1);
        });
    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            upload(image.path)
            bs.current.snapTo(1);
        });
    } 

    const getFileName= (filename, path) => {
        if (filename != null) { return filename; }

        if (Platform.OS === "ios") {
            path = "~" + path.substring(path.indexOf("/Documents"));
        }
        return path.split("/").pop();
    }


    const renderInner = () => (
    <View style={styles.panel}>
        <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
        </View>
        <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
    </View>
    );

    const renderHeader = () => (
    <View style={styles.header}>
        <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
        </View>
    </View>
    );

    const bs = createRef();
    const fall = new Animated.Value(1);

    const getData = async () => {
        try {
        var profile = await AsyncStorage.getItem('profile')
        setProfile(profile)
        var id = await AsyncStorage.getItem('user_id')
        id = parseInt(id,10)
        setUserId(id)
        const token = await AsyncStorage.getItem('token')
        setUserToken(token)        
        } catch(e) {
            console.warn("getdata", e)
        }

    }

    const clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
            alert(e)
        }
    }

    const signout = () => {
        clearAll()
        navigation.navigate('Login')     
    }

    const getProfile = () =>{
        axios.get(`${API}/api/profile/${userId}`, { headers: {authorization: `Bearer ${userToken}`} })
        .then(res=>{
            setUser(res.data.user)
            setProfile(res.data.user.profile)
        }
        )
        .catch(error=>{
            console.warn("profile" ,error)}
        )
    }

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        getData()
    }, [])

    const[numRequests , setNumRequests] = useState(0)
    
    useEffect(() => {
        db.collection("Reservation Request")
            .where( "recipient" , "==", userName)
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot) => {  
            //console.warn('from onSnapshot:', snapshot.docs.data());
            let request = snapshot.docs.map(doc => 
                ({
                    id:doc.id,
                    data:doc.data()
                }))
                //  setRequests(request);
            let filtered = request.filter(item => item.data.read === false)
            let length = filtered.length
            setNumRequests(length)
            setRequests(filtered) 

            
            //console.warn(requests)
            })
            //console.warn(requests)
            // setRequests(filtered)
    }, [])

    const [notifications, setNotifications] = useState([])
    const [numNotifications , setNumNotifications] = useState(0)

    useEffect(() => {
        db.collection("Notification")
            .where( "recipient" , "==", userName)
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot) => {  
            //console.warn('from onSnapshot:', snapshot.docs.data());
            let notification = snapshot.docs.map(doc => 
                ({
                    id:doc.id,
                    data:doc.data()
                }))
                let filtered = notification.filter(item => item.data.read === false)
                let length = filtered.length
                setNumNotifications(length)
            setNotifications(notification) 
            
            })
            //console.warn(notifications)

    }, [])


    
    return (
        <ScrollView style={{marginBottom:70}}>

            {/* {console.warn(reservations)} */}
            
            <BottomSheet
                ref={bs}
                snapPoints={[330, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
            <Animated.View style={{margin: 20,
                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}>

            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
                />

            <View style={{justifyContent:'center',alignItems:'center'}}>
                <View style={styles.img}>

                    {/* <Image source={{uri: imagePicked}} style={{width:130,height:130}} /> */}

                    <Image source={{uri : profile}} style={{width:120,height:120}} />

                </View>
                <Pressable onPress={() => bs.current.snapTo(0)}>
                    <Text style={styles.profileimage}>Edit your profile image</Text>
                </Pressable>
                <Text style={styles.profiletext}>{userName}</Text>
            </View>


            <View style={styles.options}>

                {/*Change Password */}
                <Pressable 
                    style={styles.row}
                    onPress={()=> navigation.navigate("Change Password",{userId , userToken})}
                    >                  
                        <Text style={styles.locationText}>Change Password</Text>
                        <Feather name={'chevron-right'} size={15} style={{marginLeft:'42%'}}/>
                </Pressable>

                {/**Notifications */}
                <Pressable 
                    style={styles.row}
                    onPress={()=> navigation.navigate("Notifications", {notifications})}
                    >                  
                        <Text style={styles.locationText}>Notifications</Text>
                        {(numNotifications===0)?(
                        <Feather name={'chevron-right'} size={15} style={{marginLeft:'56%'}}/>)
                        :(
                        <View style={{flexDirection:'row'}}>
                            <View style={{marginLeft:'60%',backgroundColor:'red', width:30,height:25,borderRadius:25,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'white'}}>{numNotifications}</Text>
                            </View>
                            <Feather name={'chevron-right'} size={15} style={{marginLeft:'2%',marginTop:5}}/>
                        </View>
                        
                        )
                        }
                </Pressable>

                {/*Businesses */}
                <Pressable 
                    style={styles.row}
                    onPress={()=> navigation.navigate("Businesses", {userId , userToken , userName})}
                    >                  
                        <Text style={styles.locationText}>Businesses</Text>
                        <Feather name={'chevron-right'} size={15} style={{marginLeft:'60%'}}/>
                </Pressable>

                {/*Reservation Requests */}
                <Pressable 
                    style={styles.row}
                    onPress={()=> navigation.navigate("Reservation Requests",{item:requests})}
                    >                  
                        <Text style={styles.locationText}>Reservations Requests</Text>
                        {(numRequests===0)?(
                        <Feather name={'chevron-right'} size={15} style={{marginLeft:'29%'}}/>)
                        :(
                        <View style={{flexDirection:'row'}}>
                            <View style={{marginLeft:'35%',backgroundColor:'red', width:30,height:25,borderRadius:25,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'white'}}>{numRequests}</Text>
                            </View>
                            <Feather name={'chevron-right'} size={15} style={{marginLeft:'2%',marginTop:5}}/>
                        </View>
                        
                        )
                        }
                        
                        <Feather name={'chevron-right'} size={15} style={{marginLeft:'29%'}}/>
                </Pressable>

                {/*Reservation Squedule */}
                <Pressable 
                    style={styles.row}
                    onPress={()=> navigation.navigate("Reservations",{userId , userToken , userName})}
                    >                  
                        <Text style={styles.locationText}>Reservations Schedule</Text>
                        <Feather name={'chevron-right'} size={15} style={{marginLeft:'29%'}}/>
                </Pressable>

                {/*Sign Out */}
                <Pressable 
                    style={styles.row}
                    onPress={()=>signout()} 
                    >                  
                        <Text style={{fontSize: 19,marginLeft:8,color:'red'}} >Logout</Text>
                        <Feather name={'log-out'} size={20} color={'red'} style={{marginLeft:'70%'}}/>
                </Pressable>
            </View>
            </Animated.View>
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    img:{
        height:120,
        width:120,
        borderWidth:1,
        borderColor:'lightgrey',
        borderRadius:75,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        // marginLeft:'30%',
        marginTop:'2.5%'
    },

    spinnerTextStyle: {
        color: '#FFF'
    },


    profiletext:{
        marginTop:8,
        fontSize:30
    },

    profileimage:{
        marginTop:5,
        fontSize:12,
        color:'blue',
        textDecorationLine:'underline'
    },

    options: {
        marginTop:'6%',
        marginHorizontal:20
    },

    row: {
        height:65,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgrey'
    },

    locationText: {
        fontSize: 19,
        marginLeft:8

    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },

    panelHeader: {
        alignItems: 'center',
    },

    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },

    panelTitle: {
        fontSize: 27,
        height: 35,
    },

    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },

    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },

    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },

    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        //elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },


})
