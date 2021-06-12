import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Maps from '../../screens/Map/Maps';
import searchResult from '../../screens/searchResults/SearchResult';
import { NavigationContainer } from '@react-navigation/native';

const SearchPageNav = (props) => {
    
    const Tab = createMaterialTopTabNavigator();

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#f15454',
                indicatorStyle : {
                    backgroundColor: '#f15454'
                }
            }}
        >
            <Tab.Screen name={"List"}  //component={searchResult}
            >
                {<searchResult businesses={props.route.params.item}/>}
            </Tab.Screen>

            <Tab.Screen name={"Map"} component={Maps} />
        </Tab.Navigator>
    )
}

export default SearchPageNav

const styles = StyleSheet.create({})
