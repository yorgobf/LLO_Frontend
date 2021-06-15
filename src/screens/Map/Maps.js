import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View , Image} from 'react-native'
import MapView , {Marker}  from 'react-native-maps';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import PostMap from '../../components/post/PostMap';
import axios from 'axios';
import API from '../../../NGROK';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropPin from './DropPin';


const Maps = () => {
    const [selectedBusinessId,setSelectedBusinessId] = useState(null);
    const width = useWindowDimensions().width;
    
    const [ businesses , setBusinesses] = useState([]);
    const [ userToken , setUserToken] = useState();

    const flatlist = useRef();
    var [coordinates,setCoordinates] = useState()

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
        const coordinate = JSON.parse(selectedBusiness.location_coordinate)
        const region = {
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2
        }
        map.current.animateToRegion(region); 

    }, [selectedBusinessId])


    const getAllBusinesses = () => {
        axios.get(`${API}/api/list`)
          .then(res=>{
              setBusinesses(res.data)
          })
          .catch(err => {
            //console.warn(err)
        })
    }


    const getData = async () => {
        try {
        const token = await AsyncStorage.getItem('token')
        setUserToken(token)        
        } catch(e) {
            //console.warn(e)          
        }
    }

    useEffect(() => {
        getData(),
        getAllBusinesses()
    },[])

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
            >

                {businesses.map( business=> 
                    <DropPin 
                    item={business}
                    onPress={()=>setSelectedBusinessId(business.id)}
                    isSelected={business.id===selectedBusinessId}
                    />
                        
                )}
                
            </MapView>
            
             <View style={{position: 'absolute' , bottom : 10}}>
                <FlatList
                    keyExtractor={(item) => item.id}
                    ref={flatlist}
                    data={businesses}
                    renderItem={({item}) =><PostMap item={item} />}
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
