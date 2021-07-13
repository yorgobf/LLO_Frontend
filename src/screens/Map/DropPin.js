import React from 'react'
import { StyleSheet, Text, View ,Image } from 'react-native'
import MapView , {Marker}  from 'react-native-maps';

import Surfing from '../../../assets/tabIcons/surf.png'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DropPin = (props) => {
    var coordinates = JSON.parse(props.item.location_coordinate)
    const navigation = useNavigation()
    return (
        <Marker coordinate={coordinates} >
            {/** */}
                <Pressable 
                //onPress={()=>setBusinessDrop(business)}
                //onPress={()=>navigation.navigate("Post",{item:props.item})}
                style={{
                    backgroundColor: props.isSelected ? '#333333' : 'white' , 
                    height:45,
                    width:40,
                    padding:5 ,
                    borderWidth:1,
                    borderRadius:15,
                    borderColor: 'grey',
                    alignItems:'center',
                    justifyContent:'center'
                    }}>
                    {(props.item.category==='Tent camping site')?(<Fontisto name='tent' size={34} color={props.isSelected ? 'white' : 'black'} />)
                    :
                    ((props.item.category==='Glamping')?(<Image source={require('../../../assets/tabIcons/glamping.png')} style={{height:15,width:26 , tintColor : props.isSelected ? 'white' : 'black'}}/>)
                    :
                    (((props.item.category==='Hiking group')?(<FontAwesome5 name='hiking' size={28} color={props.isSelected ? 'white' : 'black'} />)
                    :
                    ((props.item.category==='Climbing gym')?(<Image source={require('../../../assets/tabIcons/climbing.png')} style={{height:30,width:30,tintColor:props.isSelected ? 'white' : 'black'}}/>)
                    :
                    (
                    ((props.item.category==='Surfing school')?(<Image source={Surfing} style={{height:30,width:30,marginLeft:1,tintColor:props.isSelected ? 'white' : 'black'}}/>)
                    :
                    ((props.item.category==='Diving')?(<MaterialCommunityIcons name='diving-helmet' size={29} color={props.isSelected ? 'white' : 'black'} />)
                    :
                    ((props.item.category==='Paraglading')?(<Image source={require('../../../assets/tabIcons/paraglading.png')} style={{height:30,width:35,tintColor:props.isSelected ? 'white' : 'black'}}/>)
                    :
                    ((props.item.category==='Horseback Riding')?(<Image source={require('../../../assets/tabIcons/Horse.png')} style={{height:30,width:30,tintColor:props.isSelected ? 'white' : 'black'}}/>)
                    :
                    (<Image source={require('../../../assets/tabIcons/kayak.png')} style={{height:30,width:26,tintColor:props.isSelected ? 'white' : 'black'}}/>))))))))))
                    }

                </Pressable>
        </Marker>
    )
}

export default DropPin

const styles = StyleSheet.create({})
