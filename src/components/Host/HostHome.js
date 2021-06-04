import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { Button, Dimensions, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'

const HostHome = () => {
    const navigation = useNavigation();
    return (
        <View style={{
                padding:10,
                marginTop:10,
                borderRadius:15,
                overflow:'hidden',
                height: 270               

            }}>
            <ImageBackground
                source={require('../../../assets/images/HostNow.jpg')} 
                style={{
                    width: Dimensions.get('screen').width-30,
                    height: undefined,
                    aspectRatio: 3/2,
                    marginHorizontal:5,
    
                    }}
                    imageStyle={{ borderRadius: 6}}
                    >
                <View style={styles.container}>

                    <Text style={styles.title} numberOfLines={3}>
                    Own anything that may interest our community?
                    </Text>

                    <Text style={styles.subtitle} numberOfLines={2}>
                    Earn money with Lebanon Lived Outdoors.
                    </Text>

                    <Pressable style={styles.btn}  onPress={() => navigation.navigate("Host")}>

                    <Text style={{
                        fontSize: 15,
                        fontWeight:'bold',
                        color: 'white'
                        }}>Start Hosting</Text> 

                </Pressable>
                </View>
                </ImageBackground>
        </View>
    )
}

export default HostHome

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginLeft:15,
        marginTop:10       
    },

    subtitle: {
        fontSize: 12,
        color: 'grey',
        marginLeft:15,      
    },

    container: {
            width:'63%',
            height: '70%',
            top:'15%',
            marginLeft: 25,
            backgroundColor:'white',
            borderRadius:8
    },

    btn:{ 
        marginTop: '5%',
        marginBottom:5,
        backgroundColor:'#f15454',
        alignItems: 'center', 
        justifyContent: 'center', 
        height:30 ,
        marginHorizontal: 20,
        borderRadius: 18}


})
