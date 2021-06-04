import React from 'react'
import { ImageBackground, Pressable, Text, View , Image } from 'react-native';
import styles from './styles.js'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useNavigation } from '@react-navigation/native';

const HomeScreenHeader = (props ) => {
   const navigation = useNavigation();

    return (
        <View>
            
            <ImageBackground source={require('../../../assets/images/homeS2.jpg')} style={styles.image}>
                {/*title*/}
                <Text style={styles.title}>
                    Lebanon Lived Outdoors
                </Text>

                {/* Button that takes you to the map page */}
                {/* <Pressable
                style={styles.button}
                onPress={() => console.warn('Btn Pressed')}>
                    <Text style={styles.buttonText}>
                        Explore Next To You
                    </Text>
                </Pressable> */}

            <Pressable
                style={styles.buttonSearch}
                onPress={() => navigation.navigate("Location")}>
                    <View style={{marginRight: 30}}>
                    <Text style={styles.searchText}>
                        Search by location...
                    </Text>
                    </View>
                    <View>
                    <Fontisto name="search" size={25} color={"#f15454"} />
                    </View>
            </Pressable>
            </ImageBackground>
        </View>
    )
}

export default HomeScreenHeader