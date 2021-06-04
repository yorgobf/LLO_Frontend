import React , { useState , useEffect} from 'react'
import { StyleSheet, Text, View , Image , Dimensions, Pressable, ImageBackground, ScrollView, TextInput} from 'react-native'
import RadioButtonRN from 'radio-buttons-react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import API from '../../../NGROK'
import axios from 'axios'
import { useNavigation } from '@react-navigation/core';


const Host = () => {

    const navigation = useNavigation();

    const [componentNumb,setComponentNumber]= useState(1);
    const [selected,setSelected] = useState('')
    const [category,setCategory] = useState('')
    const [name,setName] = useState('')
    const [priceAdults,setPriceAdults] = useState(0)
    const [priceKids,setPriceKids] = useState(0)
    const [description,setDescription] = useState('')
    const [location,setLocation] = useState('')
    const [coordinates,setCoordinates] = useState('')
    const [lessons,setLessons] = useState(0)
    const [lessonsDetails,setLessonsDetails] = useState(' ')

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

    const data2 = [{label: 'No'},{label: 'Yes'}];

    const next = () =>{
        if(selected != ''){
        setCategory(selected.label)
        setSelected('')     
        setComponentNumber(componentNumb+1)
        }
    }    

    useEffect(() => {
        (selected.label === 'Yes')?setLessons(1):setLessons(0)        
    }, [selected])

    const create = () => {

        if( !category | !name | !location | !coordinates){ 
            return alert('Please fill all the fields.')
        }else if(!priceAdults | !priceKids | !description ){
            return alert('Please fill all the fields.')
        }

        var price_adults = parseInt(priceAdults,10) 
        var price_kids = parseInt(priceKids,10)

        const data = {
            name : name ,
            hosted_by: 5,
            category : category,
            location : location,
            location_coordinate : coordinates,
            price_adults : price_adults ,
            price_kids : price_kids ,
            description : description,
            lessons : lessons,
            lessons_details : lessonsDetails
        }

        console.warn(data)
    
        axios.post(`${API}/api/addbusiness`,data)
        .then(
            alert('business added successfully')
            ).catch(err => {
            console.warn(err)
            })
        
    }

    return (
        
        <View>
            <ScrollView >
            <View style={styles.imageCont}>
                
                <ImageBackground source={require('../../../assets/gif/gif1.gif')} style={styles.gif}>
                <Pressable>
                    <Octicons name={'x'} size={30} style={{padding:18,marginTop:5}} color={'black'} onPress={()=>navigation.replace('HomeNavigator')}/>
                </Pressable>
                </ImageBackground>
            </View>
            
            
            {componentNumb === 1 &&(
                <View style={styles.container}>
                    
                        <Text style={{fontSize:17,marginTop:'1%'}}>What kind of business do you have? :</Text>
                        <RadioButtonRN
                            data={data1}
                            selectedBtn={(e) => setSelected(e)}
                            style={{marginTop:15}}
                        />

                        <View style={{flexDirection:'row',justifyContent:'center',marginTop:50}}>
                            <Pressable style={styles.backbtn}>
                            <Entypo name={'chevron-left'} size={23} style={{marginRight:'7%'}} color={'#d3d3d3'}/>
                                <Text style={{
                                    fontSize: 23,
                                    color: '#d3d3d3',
                                    marginBottom:2
                                    }}>Back</Text>
                            </Pressable>

                            <Pressable style={styles.nextbtn} onPress={next}>
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
                        <Text style={styles.label}>Location :</Text>
                        <TextInput
                            placeholder={'Location'}
                            placeholderTextColor={'lightgrey'}
                            underlineColorAndroid='transparent'
                            onChangeText={location => setLocation(location)} 
                            value={location}
                            style={styles.textInput}
                        />
                    </View>

                    {/*Google maps coordinates */}
                    <View style={{marginTop:10}}>
                        <Text style={styles.label}>Google maps coordinates :</Text>
                        <View style={{padding:5}}>
                            <Text style={{color:'grey',fontSize:12}}>1. open the Google Maps app .</Text>
                            <Text style={{color:'grey',fontSize:12}}>2. Touch and hold an area of the map that isn't labeled. You'll see a red pin appear .</Text>
                            <Text style={{color:'grey',fontSize:12}}>3. You'll see the coordinates in the search box at the top .</Text>
                            <Text style={{color:'grey',fontSize:12}}>4. Copy and Paste the coordiates here .</Text>
                        </View>
                        <TextInput
                            placeholder={'Coordinates'}
                            placeholderTextColor={'lightgrey'}
                            underlineColorAndroid='transparent'
                            onChangeText={coordinates => setCoordinates(coordinates)} 
                            value={coordinates}
                            style={{fontSize: 17,
                                paddingTop:3,
                                paddingBottom: 8,
                                borderBottomWidth: 1,
                                borderColor: 'lightgrey'}}
                        />
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
                    <View style={{marginTop:10}}>
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

                        <Pressable style={styles.nextbtn} onPress={create}>
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


})
