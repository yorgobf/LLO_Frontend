import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import styles from './styles.js'

const Post = (props) => {
    const navigation = useNavigation();

    const goToPostScreen = () =>{
            navigation.navigate("Post",{item:props.item})
    }

    return (
        <Pressable onPress={goToPostScreen} style={styles.container}>

            
            <View style={styles.innerContainer}>
            {/*image */}
            <Image source={{uri : props.item.photo_url}} style={styles.image}/>

                {/*Category*/}
                <Text style={styles.category} >{props.item.category}</Text>
                <Text style={{fontWeight:'bold', marginTop:6,fontSize:20}}>{props.item.name}</Text>

                {/*Type and Description*/}
                <Text style={styles.description} numberOfLines={2}>{props.item.description}</Text>

                {/**Price */}
                <Text style={styles.prices}>
                    <Text style={styles.price}>{props.item.price_adults} $ </Text>
                    / Adult
                </Text>
            </View>
            {/** Total Price */}
            {/*<Text Style={styles.totalPrice}>60$ total</Text>*/}
        </Pressable>
    )
}

export default Post
