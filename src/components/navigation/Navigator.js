import React from 'react'
import { StyleSheet, Text, View ,Image, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from '@react-navigation/stack'


import Ionicons from 'react-native-vector-icons/Ionicons'

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Chat from '../../screens/Chat/Chat';
import Profile from '../../screens/Profile/Profile';
import Host from '../../screens/Host/Host';
import Maps from '../../screens/Map/Maps';
import Post from '../post/Post';
import HomeScreen from '../../screens/Home/HomeScreen';
import ExploreNavigation from './ExploreNavigation'
import Categories from '../../screens/Home/Categories'
import LocationSearch from '../../screens/LocationSearch/LocationSearch'
import PostScreen from '../../screens/PostScreen/PostScreen'
import ProfileNavigation from './ProfileNavigation'
import HostNavigator from './HostNavigator'
import Host1 from './Host1'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigator = () => {
    const navigation = useNavigation();
    return (
            <Tab.Navigator
            k
            tabBarOptions = {{
                showLabel: false,
                keyboardHidesTabBar: true,
                style: {
                    position: 'absolute',
                    bottom: 15,
                    left: 10,
                    right: 10,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 60,
                    ...styles.shadow
                }
            }}
            >
                <Tab.Screen
                name={"Explore"}
                component={ExploreNavigation}
                options={{
                    tabBarIcon:({focused}) => (
                        <View style={{alignItems:'center'}}>
                        <Ionicons name="home-outline" size={25} color={focused ? '#e32f45' : '#748c94'}/>
                        <Text style={{color:focused ? '#e32f45' : '#748c94'}}>Home</Text>
                        </View>
                        )
                }}/>
                <Tab.Screen 
                name={"Map"} 
                component={Maps} 
                options={{
                    tabBarIcon:({focused}) => (
                        <View style={{alignItems:'center'}}>
                        <Ionicons name="map-outline" size={25} color={focused ? '#e32f45' : '#748c94'}/>
                        <Text style={{color:focused ? '#e32f45' : '#748c94'}}>Map</Text>
                        </View>
                        )
                }}/>
                <Stack.Screen 
                name={"Host1"}
                component={Host1} 
                    options={
                        {tabBarIcon: ({focused})=> (
                            
                            <View style={{alignItems:'center'}}>
                                <Ionicons name="add-outline" color={focused ? '#e32f45' : '#748c94'} size={30}/>
                                <Text style={{color:focused ? '#e32f45' : '#748c94'}}>Host</Text>
                            </View>
                            ),}}
                        // tabBarIcon: (props) => (
                        //     <CustomTabButton {...props} />
                        // )
                    
                />
                <Tab.Screen 
                name={"Chat"} 
                component={Chat}
                options={{
                    tabBarIcon:({focused}) => (
                        <View style={{alignItems:'center'}}>
                        <Ionicons name="chatbox-outline" size={25} color={focused ? '#e32f45' : '#748c94'}/>
                        <Text style={{color:focused ? '#e32f45' : '#748c94'}}>Chats</Text>
                        </View>
                        )
                }}
                 />
                <Tab.Screen 
                name={"Profile"} 
                component={ProfileNavigation}
                options={{
                    tabBarIcon:({focused}) => (
                        <View style={{alignItems:'center'}}>
                        <Ionicons name="person-outline" size={25} color={focused ? '#e32f45' : '#748c94'}/>
                        <Text style={{color:focused ? '#e32f45' : '#748c94'}}>Profile</Text>
                        </View>
                        )
                }} 
                 />
                
        </Tab.Navigator>
    )
}

export default Navigator

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }

})
