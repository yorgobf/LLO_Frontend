import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import PostMap from '../../components/post/PostMap';

const Maps = () => {
    const [selectedPlaceId,setSelectedPlaceId] = useState(null);
    const width = useWindowDimensions().width;
    const flatlist = useRef();
    const viewConfig = useRef({itemVisiblePercentThreshold: 70});
    const onViewChange = useRef(({viewableItems})=>{
        if(viewableItems.length) {
            const selectedPlaceId =viewableItems[0].item;
            setSelectedPlaceId(selectedPlaceId.id)
        }
    })
    const map = useRef();

    useEffect(() => {
        if(!selectedPlaceId || !flatlist){
            return;
        }

        const index = places.findIndex(place=> place.id === selectedPlaceId)
        flatlist.current.scrollToIndex({index})

        const selectedPlace =places[index];
        const region = {
            latitude: selectedPlace.coordinate.latitude,
            longitude: selectedPlace.coordinate.longitude,
            latitudeDelta: 0.8,
            longitudeDelta: 0.8
        }
        map.current.animateToRegion(region); 

    }, [selectedPlaceId])

    return (
        <View style={{width:'100%',height:'100%'}}>
            {/* <View src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13242.10374210962!2d35.59860855!3d33.9275987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x666318b93d2d53e6!2sLeMall!5e0!3m2!1sen!2slb!4v1622223054510!5m2!1sen!2slb" style="border:0;" allowfullscreen="" loading="lazy"></View> */}
            <Text>Map</Text>
            {/* <MapView
            ref={map}
            style={{width:'100%',height:'100%'}}
            initialRegion={{
            latitude: 33.888630,
            longitude: 35.495480,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
            />  */}

            {/*fetch ...
                data.places.map({place}=> 
                    <DropPin
                        isSelected={place.id===selectedPlaceId
                        coordinate={...}
                        onPress={()=>setSelectedPlaceId{place.id}}
                    } 
                    />)
           

            {/* <View style={{position: 'absolute' , bottom : 10}}>
                <FlatList
                ref={flatlist}
                data={places}
                renderItem={({item}) =><PostMap />}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={width - 50}
                snapToAlignment={"center"}
                decelerationRate={'fast'}
                viewabilityConfig={viewConfig.current}
                onViewableItemsChanged={onViewChange.current}
                />
            </View> */}

        </View>
    )
}

export default Maps

const styles = StyleSheet.create({
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
