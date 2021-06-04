import { NavigationContainer } from '@react-navigation/native'

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Tabs from './src/components/navigation/tabs'

const App = () => {
    return (
        <NavigationContainer>
            
            <Tabs />
        </NavigationContainer>
    )
}

export default App

const styles = StyleSheet.create({})
