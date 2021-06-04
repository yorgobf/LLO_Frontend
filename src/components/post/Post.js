import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import styles from './styles.js'

const Post = (props) => {
    const navigation = useNavigation();

    const goToPostScreen = () =>{
            navigation.navigate("Post")
    }

    return (
        <Pressable onPress={goToPostScreen} style={styles.container}>
            {/*image */}
            <Image source={require('../../../assets/images/glamping.jpeg')} style={styles.image}/>

            {/*Number of persons */}
            <Text style={styles.nbPers}> 2 Persons</Text>

            {/*Type and Description*/}
            <Text style={styles.description} numberOfLines={2}>At 'Le camp' we have ... to enjoy your night in the wilderness with your friends and family</Text>

            {/**Price */}
            <Text style={styles.prices}>
                <Text style={styles.oldprice}> 40$ </Text>
                <Text style={styles.price}> 30$ </Text>
                / night
            </Text>

            {/** Total Price */}
            {/*<Text Style={styles.totalPrice}>60$ total</Text>*/}
        </Pressable>
    )
}

export default Post
