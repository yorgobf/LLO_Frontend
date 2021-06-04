import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../../screens/Profile/Profile';
import EditProfile from '../../screens/Profile/EditProfile';

const Stack = createStackNavigator();

const ProfileNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'Profile'}
                component={Profile}
                options={{
                    headerShown: false
                }}        
            />

            <Stack.Screen
                name={"Change Password"}
                component={EditProfile}
            />
        </Stack.Navigator>
    )
}

export default ProfileNavigation

