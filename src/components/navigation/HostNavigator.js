import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreenHeader from '../../screens/Home/HomeScreenHeader';
import Host from '../../screens/Host/Host';

const Stack = createStackNavigator();

const HostNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'Host'}
                component={Host}
                options={{
                    headerShown: false
                }}        
            />

        </Stack.Navigator>
    )
}

export default HostNavigator

const styles = StyleSheet.create({})
