import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Post from '../../components/post/Post'
//import Post from '../../components/Post'

const SearchResult = () => {
    return (
        <View>
            <Post />
            {/* <FlatList
                data={}
                renderItem={({item})=> <Post post={item}/>}/> */}
        </View>
    )
}

export default SearchResult

const styles = StyleSheet.create({

})
