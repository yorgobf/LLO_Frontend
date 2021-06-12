import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View, Pressable } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import Surfing from '../../../assets/tabIcons/surf.png'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

const Categories = (props) => {

    const navigation = useNavigation();

    const campsite = () => {
        let business = props.businesses.filter((item)=>item.category === "Tent camping site")
        navigation.navigate("Search Results",{item:business})
    }
    
    const glamping = () => {
        let business = props.businesses.filter((item)=>item.category === "Glamping")
        navigation.navigate("Search Result",{item:business})
    }

    const hiking = () => {
        let business = props.businesses.filter((item)=>item.category === "Hiking group")
        navigation.navigate("Search Result",{item:business})
    }

    const climbing = () => {
        let climbs = props.businesses.filter((item)=>item.category === "Climbing gym")
        navigation.navigate("Search Result",{item:climbs})
    }

    const surfing = () => {
        let business = props.businesses.filter((item)=>item.category === "Surfing school")
        navigation.navigate("Search Result",{item:business})
    }
        
    const diving = () => {
        let business = props.businesses.filter((item)=>item.category === "Diving")
        navigation.navigate("Search Result",{item:business})
    }

    const paraglading = () => {
        let business = props.businesses.filter((item)=>item.category === "Paraglading")
        navigation.navigate("Search Result",{item:business})
    }

    const horse = () => {
        let horseback = props.businesses.filter((item)=>item.category === "Horseback Riding")
        navigation.navigate("Search Result",{item:horseback})
    }

    const watersports = () => {
        let waterSports = props.businesses.filter((item)=>item.category === "Water Sports equipments")
        navigation.navigate("Search Result",{item:waterSports})
    }

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
                <Pressable style={styles.containerTop} onPress={()=>campsite()}>
                    <Fontisto name='tent' size={34} color='#5a5a5a' />
                    <Text style={styles.Text}>CampSites</Text>
                </Pressable>
                <Pressable style={styles.containerTop} onPress={()=>{glamping()}}>
                    <Image source={require('../../../assets/tabIcons/glamping.png')} style={{height:35,width:55,tintColor:'#5a5a5a'}}/>
                    <Text style={styles.Text}>Glamping</Text>
                </Pressable>
                <Pressable style={styles.containerTopLast} onPress={()=>{climbing()}}>
                <Image source={require('../../../assets/tabIcons/climbing.png')} style={{height:35,width:41,tintColor:'#5a5a5a'}}/>
                    <Text style={styles.Text}>Rock-Climbing</Text>
                </Pressable>
                
            </View>

            <View style={styles.row}>
                <Pressable style={styles.containerTop} onPress={()=>hiking()}>
                    <FontAwesome5 name='hiking' size={28} color='#5a5a5a' />
                    <Text style={styles.Text}>Hiking</Text>
                </Pressable>
                <Pressable style={styles.containerTop} onPress={()=>{horse()}}>
                    <Image source={require('../../../assets/tabIcons/Horse.png')} style={{height:30,width:30,tintColor:'#5a5a5a'}}/>
                    <Text style={styles.Text}>Horseback Riding</Text>
                </Pressable>
                <Pressable style={styles.containerTopLast} onPress={()=>{paraglading()}}>
                    <Image source={require('../../../assets/tabIcons/paraglading.png')} style={{height:30,width:35,tintColor:'#5a5a5a'}}/>
                    <Text style={styles.Text}>Paraglading</Text>
                </Pressable>
            </View>

            <View style={styles.row}>
                <Pressable style={styles.container} onPress={()=>{surfing()}}>
                    <Image source={Surfing} style={{height:30,width:30,tintColor:'#5a5a5a'}}/>
                    <Text style={styles.Text}>Surfing</Text>
                </Pressable>
                <Pressable style={styles.container} onPress={()=>{diving()}}>
                    <MaterialCommunityIcons name='diving-helmet' size={34} color='#5a5a5a' />
                    <Text style={styles.Text}>Diving</Text>
                </Pressable>
                <Pressable style={styles.containerLast} onPress={()=>{watersports()}}>
                    <Image source={require('../../../assets/tabIcons/kayak.png')} style={{height:36,width:32,tintColor:'#5a5a5a'}}/>
                    <Text style={{marginTop:3,fontSize:11,color: '#5b5b5b'}}>Water Sports</Text>
                    <Text style={{fontSize:11,color: '#5b5b5b'}}>equipments</Text>
                </Pressable>
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
