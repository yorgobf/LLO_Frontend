import { useNavigation } from '@react-navigation/core'
import React , {useState} from 'react'
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LocationRow from './LocationRow'
import PlacesInput from 'react-native-places-input';

const LocationSearch = (props) => {
    const [location,setLocation]=useState('');
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {console.warn(props.route.params.testprop)}
            {/*Text Input Component */}
            <View style={{height:300}}>

            <PlacesInput
                placeHolder={"Search by location..."}
                queryCountries={['lb']}
                googleApiKey={'AIzaSyCpwJazEPA9R9Kx5d0ea05YUY9T1yqr29A'}
                onSelect={place => console.log(place)}
                stylesItem={{...styles.row , borderWidth:1}}
                stylesItemText={styles.locationText}
                iconResult={<Ionicons name={'location-sharp'} size={25} color={'#fff'}/>}

            />
            {/* <GooglePlacesAutocomplete
                
                
                onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
                }}

                query={{
                 key: 'AIzaSyCpwJazEPA9R9Kx5d0ea05YUY9T1yqr29A',
                 language: 'en',
                }}
                onFail={error => console.warn(error)}
                renderRow={(item)=><LocationRow item={item} />}
            /> */}
            </View>


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
        fontSize: 17

    }

})
