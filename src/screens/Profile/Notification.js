import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

const Notification = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={{fontSize:16, marginHorizontal:8}}> {props.item.data.sender} {props.item.data.status} your reservation at "{props.item.data.businessName}" on {props.item.data.date}. </Text>
            </View>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        width:Dimensions.get('screen').width,
    },

    innerContainer: {
        marginVertical:'3%',
        width:'95%',
        height:Dimensions.get('screen').height*0.09,
        marginHorizontal:'2.5%',
        borderColor:'lightgrey',
        backgroundColor:'white',
        borderRadius:15,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
            },
})
