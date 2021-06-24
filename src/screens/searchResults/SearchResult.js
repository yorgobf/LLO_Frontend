import React from 'react'
import { Dimensions, FlatList, ScrollView, StyleSheet, Text , View } from 'react-native'
import Post from '../../components/post/Post'
//import Post from '../../components/Post'

const SearchResult = (props) => {
    return (
        <ScrollView style={{}}>
            {/* {console.warn(props.route.params.item)} */}

            {!props.route.params.item[0]  && (
                <View style={{
                    width:Dimensions.get('screen').width,
                    height:Dimensions.get('screen').height-300,
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Text style={{
                        color:'grey',
                        fontSize:25
                    }}>Sorry for letting you down!</Text>
                    
                    <Text style={{
                        color:'grey',
                        fontSize:25
                    }}>No Result</Text>
                </View>
            )}

            <FlatList
                keyExtractor={(item) => item.id}
                data={props.route.params.item}
                renderItem={({item}) => (
                    <Post
                        item={item} 
                    />)}
            />
            

        </ScrollView>
           
    )
}

export default SearchResult

const styles = StyleSheet.create({

})
