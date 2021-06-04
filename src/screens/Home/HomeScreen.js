import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import HostHome from '../../components/Host/HostHome'
import Post from '../../components/post/Post'
import Categories from './Categories'
import HomeScreenHeader from './HomeScreenHeader'

const HomeScreen = ({navigation}) => {
    return (
        <ScrollView style={{marginBottom:70}}>
            {/* {console.warn(navigation.getParam(user),navigation.getParam(userToken))} */}
            <HomeScreenHeader />
            <Categories />
            <HostHome />
                <Text style={{fontWeight: '600',fontSize:18,paddingLeft:25}} >
                    Recently Added :
                </Text>
            <Post />
            <Post />
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
