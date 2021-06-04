import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import Surfing from '../../../assets/tabIcons/surf.png'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

Foundation
const Categories = () => {
    return (
        <View style={{
            width:Dimensions.get('screen').width-20,
            marginHorizontal:25,
            marginTop:20
            }}>

            <Text style={{fontWeight: '600',fontSize:18}} >
                Search by categories :
            </Text>

            <View style={styles.row}>
                <View style={styles.containerTop}>
                    <Fontisto name='tent' size={34} color='#5a5a5a' />
                    <Text style={styles.Text}>CampSites</Text>
                </View>
                <View style={styles.containerTop}>
                    <Image source={require('../../../assets/tabIcons/glamping.png')} style={{height:35,width:55,tintColor:'#5a5a5a'}}/>
                    <Text style={styles.Text}>Glamping</Text>
                </View>
                <View style={styles.containerTopLast}>
                <Image source={require('../../../assets/tabIcons/climbing.png')} style={{height:35,width:41,tintColor:'#5a5a5a'}}/>
                    <Text style={styles.Text}>Rock-Climbing</Text>
                </View>
                
            </View>

            <View style={styles.row}>
                <View style={styles.containerTop}>
                    <FontAwesome5 name='hiking' size={28} color='#5a5a5a' />
                    <Text style={styles.Text}>Hiking</Text>
                </View>
                <View style={styles.containerTop}>
                    <Image source={require('../../../assets/tabIcons/Horse.png')} style={{height:30,width:30,tintColor:'#5a5a5a'}}/>
                    <Text style={styles.Text}>Horseback Riding</Text>
                </View>
                <View style={styles.containerTopLast}>
                    <Image source={require('../../../assets/tabIcons/paraglading.png')} style={{height:30,width:35,tintColor:'#5a5a5a'}}/>
                    <Text style={styles.Text}>Paraglading</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.container}>
                    <Image source={Surfing} style={{height:30,width:30,tintColor:'#5a5a5a'}}/>
                    <Text style={styles.Text}>Surfing</Text>
                </View>
                <View style={styles.container}>
                    <MaterialCommunityIcons name='diving-helmet' size={34} color='#5a5a5a' />
                    <Text style={styles.Text}>Diving</Text>
                </View>
                <View style={styles.containerLast}>
                    <Image source={require('../../../assets/tabIcons/kayak.png')} style={{height:36,width:32,tintColor:'#5a5a5a'}}/>
                    <Text style={{marginTop:3,fontSize:11,color: '#5b5b5b'}}>Water Sports</Text>
                    <Text style={{fontSize:11,color: '#5b5b5b'}}>equipments</Text>
                </View>
            </View>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:15
        
    },

    container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 10,
        width: '30%',
        borderRightWidth:1,
        borderColor: 'lightgrey',

    },


    containerTop: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 10,
        width: '30%',
        borderBottomWidth: 1,
        borderRightWidth:1,
        borderColor: 'lightgrey',
    },

    containerLast: {
        flexDirection: 'column',
        alignItems: 'center',
        borderColor: 'lightgrey',
        width: '30%',
    },

    containerTopLast: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        width: '30%',
    },

    Text: {

        marginTop:5,
        fontSize:12,
        color: '#5b5b5b'
    }

})
