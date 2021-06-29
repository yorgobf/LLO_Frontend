import axios from 'axios'
import React , {useEffect,useState} from 'react'
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import API from '../../../NGROK'
import Spinner from 'react-native-loading-spinner-overlay';
import ScheduleComponent from '../../components/Host/Schedule';

const Schedule = (props) => {
    const [ reservation , setReservation ] = useState([])
    const [spinner,setSpinner] = useState(false)

    useEffect(() => {
        setSpinner(true)
        axios.get(`${API}/api/getReservationBybid/${props.route.params.businessId}`)
            .then(res=>{
                setReservation(res.data)
                setSpinner(false)
            })
            .catch(err=>console.warn('res',err))
    }, [])

    return (
        <View>
                <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />

            { !reservation[0]  && (
            <View style={{
                width:Dimensions.get('screen').width,
                height:Dimensions.get('screen').height-300,
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Text style={{
                    color:'grey',
                    fontSize:25
                }}>There is no reservations yet...</Text>
                
            </View>
        )}

            {reservation[0] &&(
            
            <ScrollView style={{marginBottom : 80}}>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={reservation}
                    renderItem={({item}) => (
                        <ScheduleComponent item={item} />
                        )}
                />
            </ScrollView>)}
        </View>
    )
}

export default Schedule

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
})
