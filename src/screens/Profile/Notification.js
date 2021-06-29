import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

const Notification = (props) => {

    return (
        <View style={{width:Dimensions.get('screen').width,
        borderBottomColor:props.item.data.read===false ? 'lightgrey' : '#eeeeee' ,
        borderBottomWidth:props.item.data.read===false ? 1 : 0 ,}}>
            {props.item.data.read===false &&(<Text style={{marginLeft:10,fontSize:16,color:'#d20008'}}>new :</Text>)}

                {
                        (props.item.data.status==='accepted')
                        ?
                        (
                            <View style={{...styles.innerContainer ,backgroundColor:'#1cc755', }}>
                                <View style={styles.container2 }>
                                    
                                    
                                    <View width='10%'>
                                        <Feather name='check' size={40} color='#1cc755'  />
                                    </View>
                                    <View width='85%'>
                                    <Text style={{fontSize:16, marginHorizontal:10}}>{props.item.data.sender} {props.item.data.status} your reservation at "{props.item.data.businessName}" on {props.item.data.date}. </Text>
                                    </View>
                                    
                                </View>
                            </View>
                        ):(
                            <View style={{...styles.innerContainer ,backgroundColor:'#ed4141',}}>
                                <View style={styles.container2 }>
                                <View width='10%'>
                                    <Feather name='x' size={40} color='#ed4141' style={{marginLeft:'15%'}} />
                                </View>
                                <View width='85%'>
                                    <Text style={{fontSize:16, marginHorizontal:12}}>{props.item.data.sender} {props.item.data.status} your reservation at "{props.item.data.businessName}" on {props.item.data.date}. </Text>
                                </View>
                                </View>
                            </View>
                        )}
                        
                    
                
           
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({


    container2:{
        backgroundColor:'white',
        width:'98%',
        marginLeft:'2%',
        height:'100%',
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginHorizontal:50
        
    },

    innerContainer: {
        marginVertical:'1%',
        width:'97%',
        height:Dimensions.get('screen').height*0.09,
        marginHorizontal:'1.5%',
        borderColor:'lightgrey',

        borderRadius:10,
        borderWidth:1,
        marginBottom:10,

        overflow:'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        }
    }
)
