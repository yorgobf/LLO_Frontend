import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable } from 'react-native'
import { Dimensions, StyleSheet, Text, View ,Image } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

const Business = (props) => {
    const navigation = useNavigation()

    const goToPostScreen = () =>{
        navigation.navigate("Schedule",{businessId:props.item.id})
    }

    return (
        <Pressable onPress={()=>goToPostScreen()} style={styles.container}>
            <View>
                <Image source={{uri : props.item.photo_url}} style={styles.image} />
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{fontWeight:'600', fontSize:20,marginLeft:'20%'}}>
                    {props.item.name}
                </Text>
                <Feather name={'chevron-right'} size={15} style={{}}/>
            </View>
        </Pressable>
    )
}

export default Business

const styles = StyleSheet.create({
    container:{
        margin:'4%',
        width:Dimensions.get('screen').width*0.92,
        height:Dimensions.get('screen').height*0.12,
        backgroundColor:'white',
        borderColor:'lightgrey',
        borderWidth:1,
        borderRadius:25,
        alignItems:'center',
        //justifyContent:'center',
        flexDirection:'row',
        alignSelf:'flex-start',
        overflow:'hidden'
    },
    
    image:{
        width:'50%',
        height: '100%',
        aspectRatio: 3/2,
        resizeMode: 'cover',
        
    },
})
