import React from 'react'
import { ImageBackground, Pressable, Text, View , Image, Dimensions, StyleSheet  } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useNavigation } from '@react-navigation/native';

const HomeScreenHeader = (props ) => {
   const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.buttonSearch}
                onPress={() => navigation.navigate("Location",{testprop: "Hello World"})}>
                    <View style={{marginRight: "40%"}}>
                        <Text style={styles.searchText}>
                            Search by location...
                        </Text>
                    </View>
                    <View>
                        <Fontisto name="search" size={25} color={"#f15454"}  />
                    </View>
            </Pressable>
            
            <ImageBackground source={require('../../../assets/gif/gif1.gif')} style={styles.gif}>
                {/*title*/}
                <Text style={styles.title}>
                    Lebanon Lived Outdoors
                </Text>

            </ImageBackground>
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
        marginTop:100
        // marginHorizontal:5,
    },

    title: {
        marginTop:15,
        fontSize: 60,
        fontWeight: 'bold',
        color: 'white',
        width:'70%',
        //bottom: 75,
        marginLeft: 15,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
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