import axios from 'axios'
import React , { useEffect , useState}from 'react'
import { StyleSheet, Text, View , ScrollView , FlatList, Dimensions } from 'react-native'
import API from '../../../NGROK'
import Post from '../../components/post/Post'
import { useIsFocused } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';



const Businesses = ({route}) => {
    const { userId, userToken ,username } = route.params;
    const [businesses , setBusinesses ] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const isFocused = useIsFocused();
    const [spinner,setSpinner] = useState(false)

    //console.warn(businesses)

    useEffect(() => {
        if(isFocused && !refresh) {
            setSpinner(true)
            // console.warn(isFocused)
            axios.get(`${API}/api/getBusinessByOwner/${userId}`)
            .then(res=>{
                setBusinesses(res.data)
                setSpinner(false)
            })
            .catch(err=>console.warn(err))
            setRefresh(true);
        } else if (!isFocused) {
            setRefresh(false);
            setSpinner(false)
        }
    })



    return (
        <View>
                <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                    />

        { !businesses[0]  && (
            <View style={{
                width:Dimensions.get('screen').width,
                height:Dimensions.get('screen').height-300,
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Text style={{
                    color:'grey',
                    fontSize:25
                }}>Nothing to show...</Text>
                
                <Text style={{
                    color:'grey',
                    fontSize:25,
                    marginTop:10
                }}>Start hosting now!</Text>
            </View>
        )}

        {businesses[0] &&(
        <ScrollView style={{marginBottom : 80}}>
            <FlatList
                keyExtractor={(item) => item.id}
                data={businesses}
                renderItem={({item}) => (
                    <Post
                        item={item} 
                    />)}
            />
        </ScrollView>)}
        </View>
    )
}

export default Businesses

const styles = StyleSheet.create({

    spinnerTextStyle: {
        color: '#FFF'
    },

})
