import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ScheduleComponent = (props) => {
    
    return (
        <View style={{padding:22}}>
            <View style={{flexDirection:'row'}}>
                <Ionicons name={'calendar'} size={22} color={'#444'} style={{marginHorizontal:5}}/>
                <Text style={{fontSize:18.7,fontWeight:'700',color:'#444',marginLeft:5}}>{props.item.date}</Text>
            </View>

            <View style={{flexDirection:'row',marginTop:15,alignItems:'center',justifyContent:'center'}}>
                <View style={styles.user}>
                    <Text style={{fontSize:17.7,fontWeight:'700',color:'#333333'}}>{props.item.username}</Text>
                </View>

                <View style={styles.guests}>
                    <Text style={{fontSize:16.7,marginBottom:3,}}>{props.item.number_adults} Adults</Text>
                    <Text style={{fontSize:16.7,marginTop:3,}}>{props.item.number_kids} Kids</Text>
                    
                </View>

            </View>
        </View>

        //  <View style={{flexDirection:'row',justifyContent:'space-between' , height:Dimensions.get('screen').height*0.05,backgroundColor:'white'}}>
        //     <View style={{borderBottomWidth:1,borderRightWidth:1,width:'25%',height:'100%', borderColor:'grey',alignItems:'center',justifyContent:'center'}}>
        //         <Text style={{fontSize:16}}>Date :</Text>
        //     </View>

        //     <View style={{borderBottomWidth:1,borderRightWidth:1,width:'25%',height:'100%', borderColor:'grey',alignItems:'center',justifyContent:'center'}}>
        //         <Text style={{fontSize:16 }}>Name :</Text>
        //     </View>

        //     <View style={{borderBottomWidth:1,borderRightWidth:1,width:'25%', borderColor:'grey',height:'100%',alignItems:'center',justifyContent:'center'}}>
        //         <Text style={{fontSize:16 }}>Adults :</Text>
        //     </View>

        //     <View style={{marginRight:15 , borderBottomWidth:1, borderColor:'grey',width:'25%',height:'100%',alignItems:'center',justifyContent:'center'}}>
        //         <Text style={{fontSize:16 }}>Kids :</Text>
        //     </View>
        // </View>

        // <View style={{flexDirection:'row',justifyContent:'space-between' , height:Dimensions.get('screen').height*0.066,backgroundColor:'white'}}>
        //     <View style={{borderBottomWidth:1,borderRightWidth:1,width:'25%',height:'100%', borderColor:'grey',alignItems:'center',justifyContent:'center'}}>
        //         <Text style={{fontSize:16}}>2021-10-21</Text>
        //     </View>

        //     <View style={{borderBottomWidth:1,borderRightWidth:1,width:'25%',height:'100%', borderColor:'grey',alignItems:'center',justifyContent:'center'}}>
        //         <Text style={{fontSize:16 }}>Yorgo</Text>
        //     </View>

        //     <View style={{borderBottomWidth:1,borderRightWidth:1,width:'25%', borderColor:'grey',height:'100%',alignItems:'center',justifyContent:'center'}}>
        //         <Text style={{fontSize:16 }}>1</Text>
        //     </View>

        //     <View style={{marginRight:15 , borderBottomWidth:1, borderColor:'grey',width:'25%',height:'100%',alignItems:'center',justifyContent:'center'}}>
        //         <Text style={{fontSize:16 }}>0</Text>
        //     </View>
        // </View> 

        // <View style={{padding:10,height:Dimensions.get('screen').height*0.16,backgroundColor:'white',borderBottomColor:'grey',borderBottomWidth:1}}>
        //                 <View style={{flexDirection:'row',alignItems:'center'}}>
        //                     <Ionicons name={'person'} size={18} color={'#333'} style={{marginLeft:4}}/>
        //                     <Text style={{fontSize:17,marginLeft:15}}> Name : {props.item.username}</Text>
        //                 </View>
        //                 <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
        //                     <Image source={require('../../../assets/tabIcons/adults.png')} style={{height:25,width:25,tintColor:'#333'}}/>
        //                     <Text style={{fontSize:17,marginLeft:15}}>Number of adults : {props.item.number_adults}</Text>
        //                 </View>
        //                 <View style={{flexDirection:'row',alignItems:'center',marginTop:3}}>
        //                     <Image source={require('../../../assets/tabIcons/kid.png')} style={{height:25,width:25,tintColor:'#333'}}/>
        //                     <Text style={{fontSize:17,marginLeft:15}}>Number of kids : {props.item.number_kids}</Text>
        //                 </View>
        //                 <View style={{flexDirection:'row',alignItems:'center',marginTop:3}}>
        //                     <Ionicons name={'calendar'} size={22} color={'#333'} style={{marginLeft:2}}/>
        //                     <Text style={{fontSize:17,marginLeft:15}}>Date : {props.item.date}</Text>
        //                 </View>
        // </View>
    )
}

export default ScheduleComponent

const styles = StyleSheet.create({
    user:{
        borderRightColor:'green',
        borderRightWidth:3,
        alignItems:'center',
        justifyContent:'center', 
        width:Dimensions.get('screen').width*0.45, 
        height:60,
        borderRadius:2,
        // backgroundColor:'grey'
    },

    guests:{
        width:Dimensions.get('screen').width*0.55, 
        marginLeft:30
    }
})
