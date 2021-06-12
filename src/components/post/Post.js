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
            {console.warn(props)}
            
            <View style={styles.innerContainer}>
            {/*image */}
            <Image source={require('../../../assets/images/glamping.jpeg')} style={styles.image}/>

                {/*Type and Description*/}
                <Text style={styles.description} numberOfLines={2}>{props.item.description}</Text>

                {/**Price */}
                <Text style={styles.prices}>
                    <Text style={styles.price}>{props.item.price_adults} $ </Text>
                    / adult
                </Text>
            </View>
            {/** Total Price */}
            {/*<Text Style={styles.totalPrice}>60$ total</Text>*/}
        </Pressable>
    )
}

export default Post
