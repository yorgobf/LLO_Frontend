import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, Button, Pressable } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'

const PostScreen = () => {

    const navigation = useNavigation();

    const goToBookingScreen = () =>{
            navigation.navigate("Book")
    }

    return (
        <View style={{height:'100%'}}>
        <ScrollView style={styles.container}>
            <View style={{       }}>
            {/*image */}
                <Image source={require('../../../assets/images/glamping.jpeg')} style={styles.image}/>
            </View>

                <View style={{padding: 7}}>
                {/*Location */}
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Ionicons name={'location-sharp'} size={15} color={'#111'}/>
                <Text style={styles.loc}> Laklouk </Text>
                </View>

                <View style={{
                    paddingLeft:5,
                    borderBottomWidth: 1,
                    borderColor: 'lightgrey'
                    }}>
                    <Text style={{fontWeight:'bold',fontSize:25}}>Le Camp</Text>
                    <View style={{flexDirection:'row', }}>
                        <Text>Hosted by : </Text>
                        <Text style={{textDecorationLine: 'underline',marginBottom:7}}>Yorgobf</Text>
                    </View>
                </View>

                <View  style={{padding: 7,paddingLeft:5, borderBottomWidth: 1, borderColor: 'lightgrey'}} >
                    <Text style={{textDecorationLine: 'underline' ,fontSize:17, fontWeight:'bold' ,marginBottom:5 }}>Description :</Text>
                    <Text style={styles.description}>At 'Le camp' we have ... to enjoy your night in the wilderness with your friends and family dfsdfsdfsfsff weffeff ef qef g fergre gwerg rg rgsrgr gwrgwrgw ergwgrw .</Text>
                </View>
            {/*Type and Description*/}
            

            
            {/*Number of persons */}
            {/* <Text style={styles.nbPers}> 2 Persons</Text> */}
            </View>

            {/** Total Price */}
            {/*<Text Style={styles.totalPrice}>60$ total</Text>*/}
        </ScrollView>

        <View style={styles.book}>
            <View style={{flexDirection:'row'}}>
                <View style={{justifyContent: 'center',}}>
                    {/**Price */}
                    <Text style={styles.prices}>
                        <Text style={styles.oldprice}> 40$ </Text>
                        <Text style={styles.price}> 30$ </Text>
                        / night
                    </Text>
                </View >
                <Pressable 
                onPress={goToBookingScreen}
                style={{                    
                    backgroundColor:'#f15454',
                    width:125,
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height:45 ,
                    marginHorizontal:20,
                    borderRadius: 10,
            }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight:'bold',
                        color: 'white'
                        }}>Book</Text>
                </Pressable>
            </View>


        </View>
        
        </View>
    )
}

export default PostScreen

const styles = StyleSheet.create({

    container: {
        height:'90%',
    },
    
    image:{
        height:200,
        width: Dimensions.get('screen').width,
        aspectRatio: 24/12,
        resizeMode: 'cover',
       
    },

    description:{
        fontSize: 18,
        lineHeight: 26,
        marginBottom : 7
    },

    nbPers: {
        marginVertical: 10,
        color: '#5b5b5b',

    },

    loc: {
        marginVertical: 10,
        color: '#111',

    },

    prices: {
        fontSize: 18,
        marginLeft: 20,
        marginRight: '15%'
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
})
