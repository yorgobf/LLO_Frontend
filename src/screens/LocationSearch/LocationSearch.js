import { useNavigation } from '@react-navigation/core'
import React , {useState} from 'react'
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LocationRow from './LocationRow'

const LocationSearch = () => {
    const [location,setLocation]=useState('');
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/*Text Input Component */}
            <View style={{height:300}}>
            <GooglePlacesAutocomplete
                
                placeholder='Search'
                onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
                }}
                 query={{
                 key: 'AIzaSyDNQN3GUX3kr4POFQ5y6ngpTPi4pwqnBWs',
                 language: 'en',
                }}
                onFail={error => console.warn(error)}
                renderRow={(item)=><LocationRow item={item} />}
            />
            </View>

            <TextInput
            style={styles.textInput}
            placeholder="Where are you planning to go?"
            value={location}
            onChangeText={setLocation}
            />

        <Pressable 
            style={styles.row}
            onPress={()=> navigation.navigate("SearchResults")}
            >
                <View style={styles.iconContainer}>
                    <Ionicons name={'location-sharp'} size={28} color={'#fff'}/>
                </View>                    
                <Text style={styles.locationText}>Laklouk</Text>
        </Pressable>

        {/* List of Locations */}
        
        </View>
    )
}

export default LocationSearch

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },

    textInput: {
        marginTop:50,
        fontSize: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgrey'
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgrey'
    },

    iconContainer: {
        backgroundColor:'lightgrey',
        height:50,
        width:50,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 12

    },

    locationText: {
        fontSize: 18

    }

})
