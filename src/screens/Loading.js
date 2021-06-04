import React from 'react'
import { Image, StyleSheet, Text, View , Dimensions, ImageBackground } from 'react-native'


const Loading = () => {
    return (
        <View style={styles.page}>
            
            <Image source={require('../../assets/gif/load1.gif')} style={styles.gif} />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({ 
    page: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        backgroundColor: '#fff7e7', 
        justifyContent: 'center',
        alignItems:'center',
        
    },

    gif: {
        width: Dimensions.get('screen').width-10,
        height: undefined,
        aspectRatio: 3/2,
        marginHorizontal:5,
        justifyContent:'center',
        alignItems:'center',
        bottom:'8%'
    },
})
