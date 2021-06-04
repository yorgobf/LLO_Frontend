import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const LocationRow = ({item}) => (
    <Pressable 
            style={styles.row}
            onPress={()=> navigation.navigate("SearchResults")}
            >
                <View style={styles.iconContainer}>
                    <Ionicons name={'location-sharp'} size={28} color={'#fff'}/>
                </View>                    
                <Text style={styles.locationText}>{item.description} </Text>
    </Pressable>
)

export default LocationRow

const styles = StyleSheet.create({})
