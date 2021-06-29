/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, { useState , useEffect , useMemo} from 'react';
import HomeScreenHeader from './src/screens/Home/HomeScreenHeader'
import Post from './src/components/post/Post'

import Router from './src/components/navigation/Router'

import {  Text, LogBox,  SafeAreaView,  StyleSheet,  View,  ScrollView, StatusBar  } from 'react-native';


import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './src/components/navigation/Navigator';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Auth/Login';
import Loading from './src/screens/Loading';
import Register from './src/screens/Auth/Register';
import LoginNav from './src/screens/Auth/loginNav';
import Host from './src/screens/Host/Host';
import Categories from './src/screens/Home/Categories';
import HostNavigator from './src/components/navigation/HostNavigator';
import { AuthContext } from './Context';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './src/screens/Profile/Profile';
import PostScreen from './src/screens/PostScreen/PostScreen';
import Reservation from './src/screens/Reserve/Reservation';
import Request from './src/screens/Profile/Request';


const App = () => {

  const [isLoading , setIsLoading] = useState(true);

  useEffect(() => {
    LogBox.ignoreLogs(['Possible Unhandled Promise'])
    LogBox.ignoreLogs(['Setting a timer'])
    LogBox.ignoreLogs(['VirtualizedLists'])
    LogBox.ignoreLogs(["expected `string`"])
    LogBox.ignoreLogs(["Each child"])
    LogBox.ignoreLogs(["missing keys"])
    setTimeout(()=>{
      setIsLoading(false);
    },3000)
  }, [])

  const Stack = createStackNavigator();
   
  // if(isLoading){
  //   return (
  //     <View style={{flex:1,justifyContent:'center', alignItems:'center'}} >
  //       <Loading /> 
  //     </View>
  //   )
  // }

  return (
      <NavigationContainer>
        {/* <ScrollView >
          
            <HomeScreenHeader/>
            <Post />
            <Post />
            <Reservation /> 

            
        </ScrollView> */}
        
{/* 
        <ProfileNavigation /> */}

        {/* <Reservation /> */}
        {/* <LoginNav /> */}
        <Router />
        {/* <Navigator/> */}
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;
