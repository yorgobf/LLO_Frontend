import axios from 'axios'
import React from 'react'
import { useEffect ,useState } from 'react'
import { ScrollView, StyleSheet, Text, View , FlatList ,LogBox ,KeyboardAvoidingView, Keyboard} from 'react-native'
import API from '../../../NGROK'
import HostHome from '../../components/Host/HostHome'
import Post from '../../components/post/Post'
import Categories from './Categories'
import HomeScreenHeader from './HomeScreenHeader'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
    const [ businesses , setBusinesses] = useState([]);
    const [ userToken , setUserToken] = useState();
    const [username , setUsername] = useState();

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
        var name = await AsyncStorage.getItem('username')
        setUsername(name) 
        } catch(e) {
           //console.warn(e)          
        }
    }

    useEffect(() => {
        getAllBusinesses()
        getData()
    }, [])

    return (
        <ScrollView >
            <KeyboardAvoidingView>
            <HomeScreenHeader businesses={businesses}/>
            <Categories businesses={businesses}/>
            <HostHome />
                <Text style={{fontWeight: '600',fontSize:18,paddingLeft:25,marginBottom:5}} >
                    Recently Added :
                </Text>
            <FlatList
                keyExtractor={(item) => item.id}
                data={businesses.slice(-10)}
                renderItem={({item}) => (
                    (username!==item.hostname)?(
                    <Post
                        item={item} 
                    />):(null))}
            />
            </KeyboardAvoidingView>
            <View style={{marginBottom:75}}></View>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
