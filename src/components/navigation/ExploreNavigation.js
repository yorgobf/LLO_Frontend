import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HomeScreen from '../../screens/Home/HomeScreen';
import searchResult from '../../screens/searchResults/SearchResult';
import SearchPageNav from './SearchPageNav';

const Stack = createStackNavigator();

const ExploreNavigation = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'HomeScreen'}
                component={HomeScreen}
                options={{
                    headerShown: false
                }}        
            />

            <Stack.Screen
                name={"Search Results"}
                component={SearchPageNav}
            />
                {/* {(props) => <SearchPageNav {...props}/>}
            </Stack.Screen> */}
        </Stack.Navigator>
    )
}

export default ExploreNavigation
