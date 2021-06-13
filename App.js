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
import Reservation from './src/screens/Reserve/Reservation'

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


const App = () => {

  const [isLoading , setIsLoading] = useState(true);


  // const [userToken , setUserToken] = useState(null);
  // const [user , setUser ] = useState([])

  // const authContext = useMemo(()=>({
  //   signIn: () => {
  //     setUserToken('sfd');
  //     setIsLoading(false);
  //   },
  //   signOut: () => {
  //     setUserToken(null);
  //     setIsLoading(false);
  //   },
  //   signUp: () => {
  //     setIsLoading(false);
  //   },
  // }) , [] )

  useEffect(() => {
    LogBox.ignoreLogs(['Possible Unhandled Promise'])
    LogBox.ignoreLogs(['Setting a timer'])
    LogBox.ignoreLogs(['VirtualizedLists'])
    setTimeout(()=>{
      setIsLoading(false);
    },3000)
  }, [])

  const Stack = createStackNavigator();
   
  if(isLoading){
    return (
      <View style={{flex:1,justifyContent:'center', alignItems:'center'}} >
        <Loading /> 
      </View>
    )
  }

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
        <LoginNav />
        {/* <Router /> */}
        {/* <Host /> */}
        {/* <Categories /> */}
        {/* <Router /> */}
        {/* <Router /> */}
        {/* <Navigator/> */}
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // screen: {
  //   flex: 1,
  // },
});

export default App;
