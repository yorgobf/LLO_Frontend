import axios from 'axios'
import React from 'react'
import { useEffect ,useState } from 'react'
import { ScrollView, StyleSheet, Text, View , FlatList ,LogBox } from 'react-native'
import API from '../../../NGROK'
import HostHome from '../../components/Host/HostHome'
import Post from '../../components/post/Post'
import Categories from './Categories'
import HomeScreenHeader from './HomeScreenHeader'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
    const [ businesses , setBusinesses] = useState([]);
    const [ userToken , setUserToken] = useState();

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
        getAllBusinesses()
    }, [])

    return (
        <ScrollView style={{marginBottom:75}}>

            <HomeScreenHeader businesses={businesses}/>
            <Categories businesses={businesses}/>
            <HostHome />
                <Text style={{fontWeight: '600',fontSize:18,paddingLeft:25}} >
                    Recently Added :
                </Text>
            <FlatList
                keyExtractor={(item) => item.id}
                data={businesses.slice(-10)}
                renderItem={({item}) => (
                    <Post
                        item={item} 
                    />)}
            />
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
