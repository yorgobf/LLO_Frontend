import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet,Pressable, Text, useWindowDimensions, View , Image, ShadowPropTypesIOS} from 'react-native'

const PostMap = (props) => {

    const navigation = useNavigation()

    const width =useWindowDimensions().width;

    const goToPostScreen = () =>{
        navigation.navigate("Post",{item:props.item})
    }
    
    return (
        <Pressable onPress={goToPostScreen} style={styles.container}>
            <View style={{...styles.innerContainer, width:width - 50}}>
                {/*image */}
                <Image source={{uri : props.item.photo_url}} style={styles.image}/>
                
                <View style={{flex:1,marginHorizontal:10}}>
                    {/*Number of persons */}
                    <Text style={styles.nbPers}>{props.item.category}</Text>

                    <Text style={{fontWeight:'bold'}}>{props.item.name}</Text>

                    {/*Type and Description*/}
                    <Text style={styles.description} numberOfLines={2}>{props.item.description}</Text>

                    <View style={{}}>
                        {/**Price */}
                        <Text style={styles.prices}>
                        <Text style={styles.price}>{props.item.price_adults} $ </Text>
                        / Adult
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default PostMap

const styles = StyleSheet.create({
    container: {
        marginBottom:80,
        margin:20,
        height: 120,
        padding:5,
        borderRadius:15,
        backgroundColor:'white',
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
        width:'48%',
        height: '50%',
        aspectRatio: 3/2,
        resizeMode: 'cover',
        
    },

    description:{
        fontSize: 15,
        marginBottom:5
    },

    nbPers: {
        marginBottom: 3,
        color: '#5b5b5b',

    },

    prices: {
        fontSize: 16,
    },


    price:{
        fontWeight: 'bold',
    },

})
