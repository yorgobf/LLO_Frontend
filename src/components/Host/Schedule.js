import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ScheduleComponent = (props) => {
    return (
        <View style={{padding:10,height:Dimensions.get('screen').height*0.16,backgroundColor:'white',borderBottomColor:'grey',borderBottomWidth:1}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Ionicons name={'person'} size={18} color={'#333'} style={{marginLeft:4}}/>
                            <Text style={{fontSize:17,marginLeft:15}}>Name : {props.item.username}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
                            <Image source={require('../../../assets/tabIcons/adults.png')} style={{height:25,width:25,tintColor:'#333'}}/>
                            <Text style={{fontSize:17,marginLeft:15}}>Number of adults : {props.item.number_adults}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:3}}>
                            <Image source={require('../../../assets/tabIcons/kid.png')} style={{height:25,width:25,tintColor:'#333'}}/>
                            <Text style={{fontSize:17,marginLeft:15}}>Number of kids : {props.item.number_kids}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:3}}>
                            <Ionicons name={'calendar'} size={22} color={'#333'} style={{marginLeft:2}}/>
                            <Text style={{fontSize:17,marginLeft:15}}>Date : {props.item.date}</Text>
                        </View>
        </View>
    )
}

export default ScheduleComponent

const styles = StyleSheet.create({})
