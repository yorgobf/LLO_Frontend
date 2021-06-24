import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../../screens/Profile/Profile';
import EditProfile from '../../screens/Profile/EditProfile';
import Businesses from '../../screens/Profile/Businesses';
import ReservationRequest from '../../screens/Profile/ReservationRequest';
import Notifications from '../../screens/Profile/Notifications';

const Stack = createStackNavigator();

const ProfileNavigation = (username) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'Profile'}
                //component={Profile}
                children={()=><Profile username={username.username}/>}
                options={{
                    headerShown: false
                }}        
            />

            <Stack.Screen
                name={"Change Password"}
                component={EditProfile}
            />

            <Stack.Screen
                name={"Businesses"}
                component={Businesses}
            />

            <Stack.Screen
                name={"Reservation Requests"}
                component={ReservationRequest}
            />  

            <Stack.Screen
                name={"Notifications"}
                component={Notifications}
            />
        </Stack.Navigator>
    )
}

export default ProfileNavigation

