import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, View ,Image, Pressable, ScrollView} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

const Profile = () => {
    const navigation = useNavigation();
    return (
        <ScrollView>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <View style={styles.img}>
                    <Image source={require('../../../assets/images/profile.png')} style={{width:130,height:130}} />
                </View>
                <Text style={styles.profileimage}>Edit your profile image</Text>
                <Text style={styles.profiletext}>Yorgo</Text>
            </View>

            <View style={styles.options}>
                <Pressable 
                    style={styles.row}
                    onPress={()=> navigation.navigate("Change Password")}
                    >                  
                        <Text style={styles.locationText}>Change Password</Text>
                        <Feather name={'chevron-right'} size={15} style={{marginLeft:'45%'}}/>
                </Pressable>

                <Pressable 
                    style={styles.row}
                    // onPress={()=> navigation.navigate("SearchResults")}
                    >                  
                        <Text style={styles.locationText}>Notifications</Text>
                        <Feather name={'chevron-right'} size={15} style={{marginLeft:'57%'}}/>
                </Pressable>

                <Pressable 
                    style={styles.row}
                    // onPress={()=> navigation.navigate("SearchResults")}
                    >                  
                        <Text style={styles.locationText}>Edit Businesses</Text>
                        <Feather name={'chevron-right'} size={15} style={{marginLeft:'50%'}}/>
                </Pressable>

                <Pressable 
                    style={styles.row}
                    // onPress={()=> navigation.navigate("SearchResults")}
                    >                  
                        <Text style={styles.locationText}>Reservations</Text>
                        <Feather name={'chevron-right'} size={15} style={{marginLeft:'57%'}}/>
                </Pressable>

                <Pressable 
                    style={styles.row}
                    // onPress={()=> navigation.navigate("SearchResults")}
                    >                  
                        <Text style={{fontSize: 19,marginLeft:8,color:'red'}}>Logout</Text>
                        <Feather name={'log-out'} size={20} color={'red'} style={{marginLeft:'70%'}}/>
                </Pressable>
            </View>

        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    img:{
        height:130,
        width:130,
        borderWidth:1,
        borderColor:'lightgrey',
        borderRadius:75,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        // marginLeft:'30%',
        marginTop:'5%'
    },

    profiletext:{
        marginTop:9,
        fontSize:30
    },

    profileimage:{
        marginTop:5,
        fontSize:12,
        color:'blue',
        textDecorationLine:'underline'
    },

    options: {
        marginTop:'10%',
        marginHorizontal:20
    },

    row: {
        height:70,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgrey'
    },

    locationText: {
        fontSize: 19,
        marginLeft:8

    }

})
