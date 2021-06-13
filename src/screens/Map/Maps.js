import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View , Image} from 'react-native'
import MapView from 'react-native-maps';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import PostMap from '../../components/post/PostMap';
import axios from 'axios';
import API from '../../../NGROK';

const Maps = () => {
    const [selectedBusinessId,setSelectedBusinessId] = useState(null);
    const [ businesses , setBusinesses] = useState([]);

    const width = useWindowDimensions().width;

    const flatlist = useRef();

    const viewConfig = useRef({itemVisiblePercentThreshold: 70});

    const onViewChange = useRef(({viewableItems})=>{
        if(viewableItems.length) {
            const selectedBusinessId =viewableItems[0].item;
            setSelectedBusinessId(selectedBusinessId.id)
        }
    })
    const map = useRef();

    useEffect(() => {
        if(!selectedBusinessId || !flatlist){
            return;
        }

        const index = businesses.findIndex(business=> business.id === selectedBusinessId)
        flatlist.current.scrollToIndex({index})

        const selectedBusiness =businesses[index];
        const region = {
            latitude: selectedBusiness.coordinate.latitude,
            longitude: selectedBusiness.coordinate.longitude,
            latitudeDelta: 0.8,
            longitudeDelta: 0.8
        }
        map.current.animateToRegion(region); 

    }, [selectedBusinessId])

    const getAllBusinesses = () => {
        axios.get(`${API}/api/list`)
          .then(res=>{
              setBusinesses(res.data)
              console.warn(businesses)
          })
          .catch(err => {
            console.warn(err)
        })
    }

    const getData = async () => {
        try {
        const token = await AsyncStorage.getItem('token')
        setUserToken(token)        
        } catch(e) {
            console.warn(e)          
        }
    }

    useEffect(() => {
        getAllBusinesses()
    }, [])

    return (
        <View style={{width:'100%',height:'100%'}}>

            <MapView
            ref={map}
            style={{width:'100%',height:'100%'}}
            initialRegion={{
            latitude: 33.888630,
            longitude: 35.495480,
            latitudeDelta: 0.8,
            longitudeDelta: 0.8,
            }}
            /> 

            {/*fetch ...
                data.places.map({place}=> 
                    <DropPin
                        isSelected={place.id===selectedPlaceId
                        coordinate={...}
                        onPress={()=>setSelectedPlaceId{place.id}}
                    } 
                />)*/}
           
             <View style={{position: 'absolute' , bottom : 10}}>
                <FlatList
                ref={flatlist}
                data={businesses}
                renderItem={({item}) =><PostMap />}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={width - 50}
                snapToAlignment={"center"}
                decelerationRate={'fast'}
                viewabilityConfig={viewConfig.current}
                onViewableItemsChanged={onViewChange.current}
                />
            </View> 

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
