import React, { Component } from 'react'
import {createStackNavigator} from "@react-navigation/stack"
import { NavigationContainer, StackActions } from "@react-navigation/native"
import { StyleSheet, Text, View  } from 'react-native'

import homeNavigator from './Navigator'
import Reservation from '../../screens/Reserve/Reservation'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreenHeader from '../../screens/Home/HomeScreenHeader'
import LocationSearch from '../../screens/LocationSearch/LocationSearch'
import PostMap from '../post/PostMap'
import PostScreen from '../../screens/PostScreen/PostScreen'
import Host from '../../screens/Host/Host'


const Stack = createStackNavigator();

const Router = (props) => {
    return (
            <Stack.Navigator>

                <Stack.Screen
                name={"HomeNavigator"}
                component={homeNavigator}
                options={{
                    headerShown: false
                }}            
                />

                <Stack.Screen
                name={"Location"}
                component={LocationSearch}          
                />

                <Stack.Screen
                name={"Post"}
                component={PostScreen}          
                />

                <Stack.Screen
                name={"Book"}
                component={Reservation}          
                />

                <Stack.Screen
                name={"Host"}
                component={Host}
                options={{
                    headerShown: false
                }}            
                />

                <Stack.Screen
                name={"Home"}
                component={HomeScreenHeader}
                // options={{
                //     title= "How many people?"
                // }}            
                />
            </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({})
