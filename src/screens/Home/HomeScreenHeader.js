import React , { useState } from 'react'
import { ImageBackground, Pressable, Text, View , Image, TextInput , Dimensions, StyleSheet  } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useNavigation } from '@react-navigation/native';

const HomeScreenHeader = (props) => {
   const navigation = useNavigation();
   const [ businessName , setBusinessName ] = useState()
//    const [filteredBusinesses , setFilteredBusinesses] = useState([])

   const searchByName = (name) =>{
    //    setFilteredBusiness()
    let filtered = props.businesses.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
    // console.warn(props.businesses)
    setBusinessName('')
    navigation.navigate("Search Result",{item:filtered})
   }

    return (
        <View style={styles.container}>
            {/* {console.warn(props.businesses[1].name)} */}
            <View
                style={styles.buttonSearch}
                //onPress={}
                >
                    <View style={{alignItems:'center',flexDirection:'row'}}>
                        <TextInput
                        placeholder={'Search by name...'}
                        maxLength={50}
                        numberOfLines={1}
                        placeholderTextColor={'black'}
                        value={businessName}
                        onChangeText={businessName=>setBusinessName(businessName)}
                        style={{fontSize:15,fontWeight:'bold',flexDirection:'row',width:150}}
                        onSubmitEditing={()=>searchByName(businessName)}
                        >
                            
                        </TextInput>
                        <Pressable
                        style={{marginLeft: '42%'}}
                        onPress={()=>searchByName(businessName)}
                        >
                            <Fontisto name="search" size={25}  color={"#f15454"}  />
                        </Pressable>
                    </View>
                    {/* <View>
                        <Fontisto name="search" size={25} color={"#f15454"}  />
                    </View> */}
            </View>
            <View style={{flexDirection:'column'}}>
                <ImageBackground source={require('../../../assets/gif/gif1.gif')} style={styles.gif}>
                    {/*title*/}
                    <Text style={styles.title}>
                        Lebanon Lived Outdoors
                    </Text>

                </ImageBackground>
            </View>
        </View>
    )
}

export default HomeScreenHeader

const styles = StyleSheet.create({
    constainer:{
        width: Dimensions.get('screen').width,
    },

    // image: {
        
    //     height: 500,
    //     resizeMode: 'cover',
    //     justifyContent: 'center'
    // },

    gif: {
        width: '100%',
        height: undefined,
        aspectRatio: 3/2,
        marginTop:100,
        flexDirection:'column', 
        // marginHorizontal:5,
    },

    title: {
        marginTop:10,
        flexDirection:'column', 
        fontSize: 60,
        fontWeight: 'bold',
        color: 'white',
        width:'70%',
        //bottom: 75,
        marginLeft: 15,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        // alignContent:'center'

    },

    buttonSearch:{
        backgroundColor:'#fff',
        borderRadius: 30,
        height: 60,
        width: Dimensions.get('screen').width-20,
        marginHorizontal:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
        position: 'absolute',
        //bottom: 50,
        marginTop:20,
        zIndex: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 9,
    },

    searchText: {
        fontSize: 16,
        fontWeight: 'bold',
        
    }
});