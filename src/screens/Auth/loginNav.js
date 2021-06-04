import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Router from '../../components/navigation/Router';
import Login from './Login';
import Register from './Register';

const Stack = createStackNavigator();

const LoginNav = () => {
    return (
            <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: "#ecf5e0"}}}>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                <Stack.Screen name="router" component={Router} options={{headerShown: false}}/>
            </Stack.Navigator>
    )
}

export default LoginNav

const styles = StyleSheet.create({})
