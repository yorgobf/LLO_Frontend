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
import spinner from 'react-native-loading-spinner-overlay';
import storage from'@react-native-firebase/storage';

require('firebase/firestore');



const Profile = () => {

    const navigation = useNavigation();

    const [spinner,setSpinner]=useState(false)

    const [imagePicked, setImagePicked] = useState('../../../assets/images/profile.png');

    const [username , setUsername] = useState();
    const [userId , setUserId] = useState();
    const [userToken , setUserToken] = useState();
    const [imageUrl, setImageUrl] = useState();

    const upload = async (image) =>{
        const response = await fetch(image);
        const blob = await response.blob()
        const task = app.storage().ref(`Profile/1`).put(blob);

        const taskProgress = snapshot =>{
            console.warn(`transferred : ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.ref.getDownloadURL()
            .then((snapshot)=>{
                console.warn(snapshot)
            })
        }

        const taskError = snapshot =>{
            console.warn(snapshot)
        }

        task.on("state_changed", taskProgress , taskError , taskCompleted)

        // const storageRef = app.storage().ref()
        // var imagesRef = storageRef.child('Profile Photos');
        // imagesRef.put(image)
        // .then(
        //     console.warn('Uploaded a blob or file!'),
        //   ) 
        //   .catch(e=>{
        //       console.warn(e)
        //   });
        // setImageUrl(await imageRef.getDownloadURL())
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          cropping: true,
          compressImageQuality: 0.7
        }).then(image => {
          setImagePicked(image.path);
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
            console.warn(image)
            //let path = getPlatformPath(image).value
            //  let fileName = getFileName(image.fileName, path);
            //uploadImageToStorage(path, fileName);
            upload(image.path)
            setImagePicked(image.path);
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
        var name = await AsyncStorage.getItem('username')
        setUsername(name)
        var profile = await AsyncStorage.getItem('profile')
        setImagePicked(profile)
        var id = await AsyncStorage.getItem('user_id')
        id = parseInt(id,10)
        setUserId(id)
        const token = await AsyncStorage.getItem('token')
        setUserToken(token)        
        } catch(e) {
          
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

    useEffect(() => {
        getData()
    }, [])

    return (
        <ScrollView>
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
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <View style={styles.img}>
                    <Image source={{uri: imagePicked}} style={{width:130,height:130}} />
                </View>
                <Pressable onPress={() => bs.current.snapTo(0)}>
                    <Text style={styles.profileimage}>Edit your profile image</Text>
                </Pressable>
                <Text style={styles.profiletext}>{username}</Text>
            </View>

            <View style={styles.options}>
                <Pressable 
                    style={styles.row}
                    onPress={()=> navigation.navigate("Change Password",{userId , userToken})}
                    >                  
                        <Text style={styles.locationText}>Change Password</Text>
                        <Feather name={'chevron-right'} size={15} style={{marginLeft:'45%'}}/>
                </Pressable>

                <Pressable 
                    style={styles.row}
                    // onPress={()=> navigation.navigate("SearchResults")}
                    >                  
                        <Text style={styles.locationText}>Notifications</Text>
                        <Feather name={'chevron-right'} size={15} style={{marginLeft:'57%'}}/>
                </Pressable>

                <Pressable 
                    style={styles.row}
                    // onPress={()=> navigation.navigate("SearchResults")}
                    >                  
                        <Text style={styles.locationText}>Edit Businesses</Text>
                        <Feather name={'chevron-right'} size={15} style={{marginLeft:'50%'}}/>
                </Pressable>

                <Pressable 
                    style={styles.row}
                    // onPress={()=> navigation.navigate("SearchResults")}
                    >                  
                        <Text style={styles.locationText}>Reservations</Text>
                        <Feather name={'chevron-right'} size={15} style={{marginLeft:'57%'}}/>
                </Pressable>

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
        height:130,
        width:130,
        borderWidth:1,
        borderColor:'lightgrey',
        borderRadius:75,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        // marginLeft:'30%',
        marginTop:'5%'
    },

    profiletext:{
        marginTop:9,
        fontSize:30
    },

    profileimage:{
        marginTop:5,
        fontSize:12,
        color:'blue',
        textDecorationLine:'underline'
    },

    options: {
        marginTop:'10%',
        marginHorizontal:20
    },

    row: {
        height:70,
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
