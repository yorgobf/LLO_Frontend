import React , { useState , useEffect} from 'react'
import { StyleSheet, TouchableOpacity , Text, View , Image , Dimensions, Pressable, ImageBackground, ScrollView, TextInput} from 'react-native'
import RadioButtonRN from 'radio-buttons-react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/core';
import API from '../../../NGROK'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import checkbox from '../../../assets/tabIcons/check.png'
import checkboxChecked from '../../../assets/tabIcons/checked.png'
import Spinner from 'react-native-loading-spinner-overlay';
import PlacesInput from 'react-native-places-input';
import MapView, { Marker } from 'react-native-maps';
import ImagePicker from 'react-native-image-crop-picker';
import app from '../../../Base'
import storage from'@react-native-firebase/storage';

require('firebase/firestore');

const Host = () => {

    var rn = require('random-number');

    const navigation = useNavigation();

    const [spinner,setSpinner] = useState(false)

    const [userId , setUserId] = useState();
    const [userToken , setUserToken] = useState();
    const [username , setUsername] = useState();

    const [componentNumb,setComponentNumber]= useState(1);
    const [selected,setSelected] = useState('')
    const [category,setCategory] = useState('')
    const [name,setName] = useState('')
    const [priceAdults,setPriceAdults] = useState(0)
    const [priceKids,setPriceKids] = useState(0)
    const [description,setDescription] = useState('')
    const [location,setLocation] = useState()
    const [coordinates,setCoordinates] = useState()
    const [lessons,setLessons] = useState(0)
    const [lessonsDetails,setLessonsDetails] = useState(null)

    const [phone_num, setPhone_num] = useState()
    const [photo_url , setPhoto_url] = useState()

    const [wifi,setWifi] = useState(false)
    const [toilets,setToilets] = useState(false)
    const [water,setWater] = useState(false)
    const [shower,setShower] = useState(false)
    const [parking,setParking] = useState(false)
    const [fire,setFire] = useState(false)

    const data1 = [
        {label: 'Tent camping site'},
        {label: 'Glamping'},  
        {label: 'Hiking group'},
        {label: 'Climbing gym'},
        {label: 'Surfing school'},  
        {label: 'Diving'},
        {label: 'Paraglading'},
        {label: 'Horseback Riding'},    
        {label: 'Water Sports equipments'},
    ];

    const getData = async () => {
        try {
            var name = await AsyncStorage.getItem('username')
            setUsername(name)
            var id = await AsyncStorage.getItem('user_id')
            id = parseInt(id,10)
            setUserId(id)
            const token = await AsyncStorage.getItem('token')
            setUserToken(token)        
        } catch(e) {
            console.warn(e)
        }
    }

    const data2 = [{label: 'No'},{label: 'Yes'}];

    const next = () =>{
        if(selected != ''){
        setCategory(selected.label)
        setSelected('')
        setComponentNumber(componentNumb+1)
        getData()
        }
    }

    const next2 = () =>{
        if(!name | !location | !priceAdults | !priceKids | !description ){
            return alert('Please fill all the fields.')
        }
        else if(phone_num.length > 8 ){
            return alert('phone number should be of 8 numbers')
        }else{
            setComponentNumber(componentNumb+1)
        }


    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 550,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            //console.warn(image.path)
            upload(image.path)
            //setImagePicked(image.path);
        })
        .catch(err=>console.warn(err));
    } 

    const upload = async (image) =>{
        let random = rn()
        const response = await fetch(image);
        const blob = await response.blob()
        const task = app.storage().ref(`Business/${random}`).put(blob);
        setSpinner(true)

        const taskProgress = snapshot =>{
            //console.warn(`transferred : ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL()
            .then((snapshot)=>{ 
                setPhoto_url(snapshot)
            })
            setSpinner(false)
        }

        const taskError = snapshot =>{
            //console.warn(snapshot)
            setSpinner(false)
        }

        task.on("state_changed", taskProgress , taskError , taskCompleted)

    }


    useEffect(() => {
        (selected.label === 'Yes')?setLessons(1):setLessons(0)
    }, [selected])

    const create = () => {
        if(!coordinates ){ 
            return alert('Please set your location on map')
        }else if(!photo_url){
            return alert('Please upload an image')
        }
        //setSpinner(true)

        var wifiNum= Number(wifi)
        var waterNum = Number(water)
        var fireNum = Number(fire)
        var parkingNum = Number(parking)
        var showerNum = Number(shower)
        var toiletsNum = Number(toilets)

        var price_adults = parseInt(priceAdults,10) 
        var price_kids = parseInt(priceKids,10)

        const data = {
            name : name ,
            hosted_by: userId,
            hostname: username,
            phone_num:phone_num,
            photo_url:photo_url,
            category : category,
            location : location,
            location_coordinate : coordinates,
            price_adults : price_adults ,
            price_kids : price_kids ,
            description : description,
            lessons : lessons,
            lessons_details : lessonsDetails,
            wifi : wifiNum,
            water : waterNum,
            shower : showerNum,
            parking : parkingNum,
            fire : fireNum,
            toilets : toiletsNum
        }
        //console.warn(data)
        
        axios.post(`${API}/api/addbusiness`,data , {
            headers: {
                authorization: `Bearer ${userToken}` 
            }
          })
        .then(
            setSpinner(false),
            ///console.warn(data),
            //console.warn(res)
            alert('Business Added Successfully'),
            navigation.replace('HomeNavigator')
            )
        .catch(err => {
            alert("failed"),
            console.warn(err)
            setSpinner(false)
        })
    
    }

    return (
        
        <View>
            <ScrollView >
                
            <View style={styles.imageCont}>
                
                <ImageBackground source={require('../../../assets/gif/host.gif')} style={styles.gif}>
                <Pressable>
                    <Octicons name={'x'} size={30} style={{padding:18,marginTop:5}} color={'black'} onPress={()=>navigation.replace('HomeNavigator')}/>
                </Pressable>
                </ImageBackground>
            </View>

            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            
            
            {componentNumb === 1 &&(
                <View style={styles.container}>

                        {/*Category */}
                        <Text style={{fontSize:17,marginTop:'1%'}}>What kind of business do you have? :</Text>
                        <RadioButtonRN
                            data={data1}
                            selectedBtn={(e) => setSelected(e)}
                            style={{marginTop:15}}
                        />


                        {/*Back and Next Button */}
                        <View style={{flexDirection:'row',justifyContent:'center',marginTop:50}}>
                            <Pressable style={styles.backbtn}>
                            <Entypo name={'chevron-left'} size={23} style={{marginRight:'7%'}} color={'#d3d3d3'}/>
                                <Text style={{
                                    fontSize: 23,
                                    color: '#d3d3d3',
                                    marginBottom:2
                                    }}>Back</Text>
                            </Pressable>

                            <Pressable style={styles.nextbtn} onPress={()=>next()}>
                                <Text style={{
                                    fontSize: 23,
                                    color: '#f15454',
                                    marginLeft:'10%',
                                    marginBottom:2
                                    }}>Next</Text>
                                    <Entypo name={'chevron-right'} size={23} style={{marginLeft:'7%'}} color={'#f15454'}/>
                            </Pressable>
                        </View>
                      
                </View>
            )}

            {componentNumb === 2 &&(
                
                <View style={styles.container}>
                    {/* <Text style={{fontSize:15}}>Please fill the form below :</Text> */}
                    
                    {/*Business Name */}
                    <View >
                        <Text style={styles.label}>Business name :</Text>
                        <TextInput
                            placeholder={'Name'}
                            placeholderTextColor={'lightgrey'}
                            underlineColorAndroid='transparent'
                            onChangeText={name => setName(name)} 
                            value={name}
                            style={styles.textInput}
                        />
                    </View>

                    {/*Location */}
                    <View style={{marginTop:10}}>
                        <Text style={{...styles.label}}>Location :</Text>
                        <TextInput
                            placeholder={'Location'}
                            placeholderTextColor={'lightgrey'}
                            underlineColorAndroid='transparent'
                            onChangeText={location => setLocation(location)} 
                            value={location}
                            style={styles.textInput}
                        />

                    </View>

                    {/*Phone number */}
                    <View style={{marginTop:10}}>
                        <Text style={styles.label}>Phone number :</Text>
                        <TextInput
                            placeholder={'03 333 333'}
                            placeholderTextColor={'lightgrey'}
                            keyboardType='numeric'
                            underlineColorAndroid='transparent'
                            onChangeText={phone_num => setPhone_num(phone_num)} 
                            value={phone_num}
                            style={styles.textInput}                        
                        />
                    </View>

                    {/*Amenities */}
                    <View style={{marginTop:15}}>
                        <Text style={{...styles.label,marginBottom:10}}>Available amenities :</Text>
                        <View style={{borderWidth:1,borderColor:'grey',borderRadius:5,flexDirection:'row',marginBottom:10}}>
                            <View style={{marginLeft:15}}>
                                <BouncyCheckbox
                                    style={{ marginTop: 16 }}
                                    isChecked={wifi}
                                    text="Wifi"
                                    textStyle={{
                                        textDecorationLine: "none",
                                        }}
                                    bounceFriction={10}
                                    size={17}
                                    //fillColor={'#f15454'}
                                    disableBuiltInState
                                    onPress={() => setWifi(!wifi)}
                                />

                                <BouncyCheckbox
                                    style={{ marginTop: 16 }}
                                    isChecked={toilets}
                                    text="Toilets"
                                    textStyle={{
                                        textDecorationLine: "none",
                                        }}
                                    bounceFriction={10}
                                    size={17}
                                    //fillColor={'#f15454'}
                                    disableBuiltInState
                                    onPress={() => setToilets(!toilets)}
                                />

                                <BouncyCheckbox
                                    style={{ marginTop: 16 }}
                                    isChecked={water}
                                    text="Potable Water"
                                    textStyle={{
                                        textDecorationLine: "none",
                                        }}
                                    bounceFriction={10}
                                    size={17}
                                    //fillColor={'#f15454'}
                                    disableBuiltInState
                                    onPress={() => setWater(!water)}
                                />
                            </View>
                        
                        <View style={{marginLeft:'17%', marginBottom:15}}>
                            <BouncyCheckbox
                                    style={{ marginTop: 16 }}
                                    isChecked={shower}
                                    text="Shower"
                                    textStyle={{
                                        textDecorationLine: "none",
                                        }}
                                    bounceFriction={10}
                                    size={17}
                                    //fillColor={'#f15454'}
                                    disableBuiltInState
                                    onPress={() => setShower(!shower)}
                                />

                                <BouncyCheckbox
                                    style={{ marginTop: 16 }}
                                    isChecked={parking}
                                    text="Parking"
                                    textStyle={{
                                        textDecorationLine: "none",
                                        }}
                                    bounceFriction={10}
                                    size={17}
                                    //fillColor={'#f15454'}
                                    disableBuiltInState
                                    onPress={() => setParking(!parking)}
                                />

                                <BouncyCheckbox
                                    style={{ marginTop: 16 }}
                                    isChecked={fire}
                                    text="Camp Fire"
                                    textStyle={{
                                        textDecorationLine: "none",
                                        }}
                                    bounceFriction={10}
                                    size={17}
                                    //fillColor={'#f15454'}
                                    disableBuiltInState
                                    onPress={() => setFire(!fire)}
                                />
                            </View>
                        </View>
                    </View>

                    {/*Price Adults */}
                    <View style={{marginTop:10}}>
                        <Text style={styles.label}>Price for adults :</Text>
                        <TextInput
                            placeholder={'Price'}
                            placeholderTextColor={'lightgrey'}
                            keyboardType='numeric'
                            underlineColorAndroid='transparent'
                            onChangeText={priceAdults => setPriceAdults(priceAdults)} 
                            value={priceAdults}
                            style={styles.textInput}                        
                        />
                        <FontAwesome name={'dollar'} size={20} style={styles.icon} />
                    </View>

                    {/*Price Kids */}
                    <View style={{marginTop:10, marginBottom:10}}>
                        <Text style={styles.label}>Price for kids :</Text>
                        <TextInput
                            placeholder={'Price'}
                            placeholderTextColor={'lightgrey'}
                            keyboardType='numeric'
                            underlineColorAndroid='transparent'
                            onChangeText={priceKids => setPriceKids(priceKids)} 
                            value={priceKids}
                            style={styles.textInput}                        
                        />
                        <FontAwesome name={'dollar'} size={20} style={styles.icon} />
                    </View>


                    {/*Lessons */}
                    <View style={{marginTop:10}}>
                        <Text style={styles.label}>Do you give lessons :</Text>
                        <View >
                            <RadioButtonRN
                                data={data2}
                                box={false}
                                initial={1}
                                circleSize={10}
                                selectedBtn={(e) => setSelected(e)}
                                style={{marginTop:5}}
                            />
                        </View>
                    </View>

                    {/*Lesson Description */}
                    {selected.label === 'Yes' && (
                        
                        <View style={{marginTop:10}}>
                            <Text style={styles.label}>Lessons details :</Text>
                            <TextInput
                                placeholder={'Enter all your lessons details here...'}
                                multiline
                                numberOfLines={2}
                                maxLength={1000}
                                placeholderTextColor={'lightgrey'}
                                underlineColorAndroid='transparent'
                                onChangeText={lessonsDetails => setLessonsDetails(lessonsDetails) } 
                                value={lessonsDetails}
                                style={styles.description}
                            />
                        </View>   
                    )}

                    {/*Description */}
                    <View style={{marginTop:10}}>
                        <Text style={styles.label}>Description :</Text>
                        <TextInput
                            placeholder={'Enter all your business details here...'}
                            multiline
                            numberOfLines={2}
                            maxLength={1000}
                            placeholderTextColor={'lightgrey'}
                            underlineColorAndroid='transparent'
                            onChangeText={description => setDescription(description)} 
                            value={description}
                            style={styles.description}
                        />
                    </View>    

                    {/*Buttons Back and Next */}
                    <View style={{flexDirection:'row',justifyContent:'center',marginTop:50}}>
                        <Pressable style={styles.backbtn} 
                            onPress={()=>setComponentNumber(componentNumb-1)}
                        >
                        <Entypo name={'chevron-left'} size={23} style={{marginRight:'7%'}} color={'grey'}/>
                            <Text style={{
                                fontSize: 23,
                                color: 'grey',
                                marginBottom:2
                                }}>Back</Text>
                        </Pressable>

                        <Pressable style={styles.nextbtn} onPress={()=>next2()}>
                            <Text style={{
                                fontSize: 23,
                                color: '#f15454',
                                marginLeft:'10%',
                                marginBottom:2
                                }}>Next</Text>
                                <Entypo name={'chevron-right'} size={23} style={{marginLeft:'7%'}} color={'#f15454'}/>
                        </Pressable>
                    </View>
                        
                </View>
            )}

            {componentNumb === 3 &&(
                <View style={styles.container}>
                
                    {/*Google maps coordinates */}
                    <View style={{marginTop:5}}>
                        <Text style={{fontSize:15,marginBottom:5}}>Location on maps :</Text>
                        <Text style={{color:'grey',fontSize:12,marginBottom:7}}>Long press on the the map to set the location .</Text>

                            <View style={styles.map}>
                            <MapView
                                style={{width:'100%',height:'100%'}}
                                onLongPress={(e)=>setCoordinates(JSON.stringify(e.nativeEvent.coordinate))}
                                initialRegion={{
                                latitude: 33.888630,
                                longitude: 35.495480,
                                latitudeDelta: 0.2,
                                longitudeDelta: 0.04,
                                }}
                                >
                                    
                                    {coordinates &&(
                                        <Marker
                                            coordinate={JSON.parse(coordinates)}
                                        />
                                    )}
                                    
                                </MapView>
                            </View>
                            <View style={{flexDirection:'row'}}>

                                <Text style={{fontSize:15,marginTop:10}}>Upload an image :</Text>
                                <TouchableOpacity style={styles.addButton} onPress={choosePhotoFromLibrary}>
                                    <Text style={styles.panelButtonTitle}>Choose From Library</Text>
                                </TouchableOpacity>
                            </View>
                            
                            {photo_url &&(
                                
                                <View style={{width : Dimensions.get('screen').width - 50,
                                            height: 180, 
                                            borderWidth:2,
                                            borderColor:'lightgrey',
                                            borderRadius: 7,
                                            marginTop:10,
                                            overflow:'hidden'}}
                                        >

                                <Image source={{uri : photo_url}} style={styles.image}/>

                                </View>
                            )}
                            

                    </View>

                    {/*Buttons Back and Next */}
                    <View style={{flexDirection:'row',justifyContent:'center',marginTop:25}}>
                        <Pressable style={styles.backbtn} 
                            onPress={()=>setComponentNumber(componentNumb-1)}
                        >
                        <Entypo name={'chevron-left'} size={23} style={{marginRight:'7%'}} color={'grey'}/>
                            <Text style={{
                                fontSize: 23,
                                color: 'grey',
                                marginBottom:2
                                }}>Back</Text>
                        </Pressable>


                        <Pressable style={styles.nextbtn} onPress={()=>create()}>
                            <Text style={{
                                fontSize: 23,
                                color: '#f15454',
                                marginLeft:'10%',
                                marginBottom:2
                                }}>Post</Text>
                                <Entypo name={'chevron-right'} size={23} style={{marginLeft:'7%'}} color={'#f15454'}/>
                        </Pressable>
                    </View>
              
        </View>
            )}
                
            </ScrollView> 
        </View>
    )
}

export default Host;

const styles = StyleSheet.create({
    gif: {
        width: Dimensions.get('screen').width,
        height: undefined,
        aspectRatio: 3/2,
        // marginHorizontal:5,
    },

    container:{
        //height:'60%',
        //color:'#81b254',

        bottom:'1%',
        padding: 20,
        marginBottom:20,
        marginHorizontal:5 ,
        borderTopStartRadius:40,
        borderTopEndRadius:40,
        borderBottomStartRadius:40,
        borderBottomEndRadius:40,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'lightgrey',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    spinnerTextStyle: {
        color: '#FFF'
    },

    addButton: {
        borderWidth:1,
        borderColor:'lightgrey',
        height:40,
        width:150,
        marginLeft:20,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        
        elevation: 1,
        
    },

    backbtn:{
        marginBottom:20,
        backgroundColor:'transparent',
        alignItems: 'center', 
        justifyContent: 'center', 
        height:50 ,
        marginHorizontal: 20,
        borderRadius: 10,
        width:100,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },

    map:{
        width : Dimensions.get('screen').width - 50,
        height: Dimensions.get('screen').width - 40, 
        borderWidth:2,
        borderColor:'lightgrey',
        borderRadius: 5,
        marginBottom:10
    },

    spinnerTextStyle: {
        color: '#FFF'
    },

    nextbtn:{
        marginBottom:20,
        backgroundColor:'transparent',
        alignItems: 'center', 
        justifyContent: 'center', 
        height:50 ,
        marginHorizontal: 20,
        borderRadius: 10,
        width:100,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:'25%'
    },

    textInput: {        
        fontSize: 17,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: 'lightgrey'
    },

    description: {        
        fontSize: 17,
        paddingVertical: 8,
        borderWidth: 1,
        marginTop:10,
        borderColor: 'lightgrey'
    },


    icon: {
        position: 'absolute',
        top: 30,
        right: 10,
        opacity: 0.5,
        color:'black'
    },

    
    image:{
        height:180,
        width: '100%',
        aspectRatio: 24/12,
        resizeMode: 'cover',
    },


})
