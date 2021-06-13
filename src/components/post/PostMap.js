import React from 'react'
import { StyleSheet, Text, useWindowDimensions, View , Image} from 'react-native'

const PostMap = () => {

    const width =useWindowDimensions().width;
    
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer ,{width:width - 50}}>
            {/*image */}
            <Image source={require('../../../assets/images/glamping.jpeg')} style={styles.image}/>
            
            <View style={{flex:1,marginHorizontal:10}}>
            {/*Number of persons */}
            <Text style={styles.nbPers}> 2 Persons</Text>

            {/*Type and Description*/}
            <Text style={styles.description} numberOfLines={2}>At 'Le camp' we have ... to enjoy your night in the wilderness with your friends and family</Text>

            {/**Price */}
            <Text style={styles.prices}>
                <Text style={styles.price}> 30$ </Text>
                / night
            </Text>
            </View>
            </View>
        </View>
    )
}

export default PostMap

const styles = StyleSheet.create({
    container: {
        marginBottom:10,
        margin:20,
        height: 120,
        padding:5,
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
        
    },

    innerContainer: {
        flexDirection:'row',
        borderRadius:10,
        backgroundColor:'white',
        overflow:'hidden',
    },
    
    image:{
        height: '100%',
        aspectRatio: 1,
        resizeMode: 'cover',
        
    },

    description:{
        fontSize: 15,
    },

    nbPers: {
        marginVertical: 10,
        color: '#5b5b5b',

    },

    prices: {
        fontSize: 16,
    },


    price:{
        fontWeight: 'bold',
    },

})
