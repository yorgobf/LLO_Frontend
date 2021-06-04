import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Host1 = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.navigate('Host')
    }, [])
    return (
        <View/>
    )
}

export default Host1

const styles = StyleSheet.create({})
