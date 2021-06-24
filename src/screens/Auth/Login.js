import { useNavigation } from '@react-navigation/core'
import axios from 'axios'
import React, { useState , useEffect} from 'react'
import { useContext } from 'react'
import { Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useLayoutEffect } from 'react/cjs/react.production.min'
import { AuthContext } from '../../../Context'
import API from '../../../NGROK'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';


const width = Dimensions.get('screen').width
const height =  Dimensions.get('screen').height

const Login = ({navigation}) => {
    
    const [username ,setUsername]=useState("");
    const [password ,setPassword]=useState("");
    const [passwordVisibilityIcon, setpasswordVisibilityIcon] = useState('eye-off-outline')
    const [passwordVisibility, setpasswordVisibility] = useState(true);
    const [spinner,setSpinner] = useState(false)

    // const [user,setUser] = useState([]);
    // const [userToken,setUserToken] = useState('')

    const onPasswordVisibilityIconToggle = () => {
        passwordVisibilityIcon === 'eye-outline' ? setpasswordVisibilityIcon('eye-off-outline') : setpasswordVisibilityIcon('eye-outline')
        setpasswordVisibility(!passwordVisibility)
    }

    //const signIn = useContext(AuthContext)

    const storeData = async (res) => {
        const userToken=res.data.access_token
        const userid = res.data.user.id
        var username = res.data.user.name
            username = username.charAt(0).toUpperCase() + username.slice(1)
        const profile = res.data.user.profile
            try {
              const useridjson = JSON.stringify(userid)
              await AsyncStorage.setItem('user_id', useridjson)
              await AsyncStorage.setItem('username', username)
              await AsyncStorage.setItem('token', userToken)
              await AsyncStorage.setItem('profile', profile)
              navigation.replace("router")
            } catch (error){
              console.warn(error)
            }
        }

    const login = () => {
        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        } else {
            setSpinner(true)

            const data = {
                name: username,
                password: password
            }

            axios.post(`${API}/api/login`, data)
            .then(res => {
                setSpinner(false)
                if(res.data === 'USER ERROR') {console.warn('btn pressed')
                    setUsername('')
                    setPassword('')
                    alert('User not found');
                } else if(res.data === 'PASS ERROR') {
                    setPassword('')
                    alert(`Wrong password for user: ${data.name}`)
                } else {
                    storeData(res)
                    //navigation.replace("router",user,userToken)

                    //user = setUser(res.data.user);
                    //console.warn(user,userToken)
                }
            }).catch(err => {
                console.warn(err, 'Failed to send login request')
                setSpinner(false)
            })
            
        } 
    }

    useEffect(() => {
        setUsername('')
        setPassword('')
    }, [])


    return (
        <ScrollView>
        <KeyboardAvoidingView style={styles.page}>
            {/* Header */}
            <View style={styles.imageCont}>
                <Image source={require('../../../assets/gif/login.gif')} style={styles.gif}/>
            </View>

            {/* Container of the inputs */}
            <View style={styles.container}>
                <Text style={styles.title}>Welcome Back</Text>

                {/* Username Input*/}
                <View style={styles.inputContainer,{marginTop: '5%'}}>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor={'lightgrey'}
                        underlineColorAndroid='transparent'
                        onChangeText={username => setUsername(username)} 
                        value={username}
                        style={styles.input}
                    />
                </View> 

                <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                    />

                {/* Password Input */} 
                <View style={{marginTop: 20}}>

                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                        placeholder={'Password'}
                        placeholderTextColor={'lightgrey'}
                        secureTextEntry={passwordVisibility}
                        underlineColorAndroid='transparent'
                        onChangeText={password => setPassword(password)} 
                        value={password}
                        style={styles.input}
                        onSubmitEditing={login}
                    />

                    {/* <TouchableOpacity style={styles.eyeIconBtn} > */}
                    <Ionicons name={passwordVisibilityIcon} size={25} style={styles.eyeIcon} onPress={onPasswordVisibilityIconToggle}/>
                </View>

                {/* Sign in Button */}
                <View style={{alignItems:'center'}}>
                <Pressable style={styles.btn} onPress={login} >
                    <Text style={{
                        fontSize: 18,
                        fontWeight:'bold',
                        color: 'white'
                        }}>Sign In</Text>
                </Pressable>

                {/* Register Button */}
                <View style={styles.signUpContainer}>
                    <Text style={styles.HaveAccountText}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity style={styles.signUpBtn} onPress={()=>navigation.navigate("Register")}>
                    <Text style={styles.signUpText}>
                        Register now
                    </Text>
                    </TouchableOpacity>
                </View>
                </View>  
            </View>
            
        </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default Login;

const styles = StyleSheet.create({
    page: {
        height:Dimensions.get('screen').height-60,
        backgroundColor:'#ecf5e0'
    },

    container:{
        flex:1.5,
        bottom:'1%',
        padding: 20,
        marginBottom:40,
        marginHorizontal:5 ,
        borderTopStartRadius:40,
        borderTopEndRadius:40,
        borderBottomStartRadius:40,
        borderBottomEndRadius:40,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'lightgrey',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    spinnerTextStyle: {
        color: '#FFF'
    },

    title:{
        fontSize:34,
        color:'#f15454',
        fontWeight:'600',
        paddingTop:'5%',
        paddingBottom:'5%',
        paddingLeft:10
    },


    input:{
        width: width-50,
        height: 48,
        fontSize: 17, 
        color: 'black',
        borderBottomWidth: 1,
        borderBottomColor:'black'
        
    },

    eyeIcon: {
        position: 'absolute',
        top: 30,
        right: 10,
        opacity: 0.5,
        color:'black'
    },

    gif: {
        width: Dimensions.get('screen').width,
        height: undefined,
        aspectRatio: 3/2,
        // marginHorizontal:5,

    },

    signUpContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    signUpText: {
        color: '#2a37ff',
        fontWeight:'600',
        textDecorationLine: 'underline',
        fontSize: 15,
        textAlign: 'center'
        },

    signUpBtn: {
        paddingLeft: 5,
    },

    HaveAccountText: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
    },

    btn:{
        marginBottom:5,
        marginTop:'8%',
        backgroundColor:'#f15454',
        alignItems: 'center', 
        justifyContent: 'center', 
        height:50 ,
        width:width-150,
        marginHorizontal: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})
