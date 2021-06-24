import { useNavigation } from '@react-navigation/core'
import axios from 'axios'
import React, { useState , useEffect } from 'react'
import { useLayoutEffect } from 'react'
import { Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import API from '../../../NGROK'
import Spinner from 'react-native-loading-spinner-overlay';

const width = Dimensions.get('screen').width
const height =  Dimensions.get('screen').height

const Register = () => {
    
    const navigation = useNavigation()

    const [spinner,setSpinner] = useState(false)
    
    const [username ,setUsername]=useState("");
    const [email , setEmail] = useState("");
    const [password ,setPassword]=useState("");
    const [confPass , setConfPass] = useState("");

    const [passwordVisibilityIcon, setpasswordVisibilityIcon] = useState('eye-off-outline')
    const [passwordVisibility, setpasswordVisibility] = useState(true);

    const [passwordVisibilityIcon2, setpasswordVisibilityIcon2] = useState('eye-off-outline')
    const [passwordVisibility2, setpasswordVisibility2] = useState(true);


    const onPasswordVisibilityIconToggle = () => {
        passwordVisibilityIcon === 'eye-outline' ? setpasswordVisibilityIcon('eye-off-outline') : setpasswordVisibilityIcon('eye-outline')
        setpasswordVisibility(!passwordVisibility)
    }

    const onPasswordVisibilityIconToggle2 = () => {
    passwordVisibilityIcon2 === 'eye-outline' ? setpasswordVisibilityIcon2('eye-off-outline') : setpasswordVisibilityIcon2('eye-outline')
    setpasswordVisibility2(!passwordVisibility2)
    }

    const register = () =>{
        if(!username | !password | !confPass | !email){
            return alert('Please fill all the fields.')
        }  else if (password !== confPass) {
            alert('"Password" and "Confirm Password fields must be identical')
            return;
        } else if(password.length < 8) {
            alert('Password must be at least 8 characters')
            return
        } 
        setSpinner(true)

        const data = {
            name : username ,
            email : email ,
            password : password ,
        }
    
        axios.post(`${API}/api/register`,data)
        .then(
            res => {
                setSpinner(false)
            if (res.data.errors) {
                if (res.data.errors.name) {
                 alert(res.data.errors.name)
                 return
                    } else if (res.data.errors.email) {
                 alert(res.data.errors.email)
                 return
            }} else {
            alert('Sign Up successful, redirecting you to Login page')
            navigation.goBack()
            }
            }).catch(err => {
            console.warn(err)
            setSpinner(false)
            })
        
       
            // console.log('state variables before', name,email,pass,cpass)
    }


    // useEffect(() => {
    //     setUsername('')
    //     setConfPass('')
    //     setEmail('')
    //     setPassword('')
    // }, [])

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: "",
            
        })
    },[navigation])

    return (
        <ScrollView>
        <KeyboardAvoidingView style={styles.page}>

            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />

            {/* Header */}
                <Image source={require('../../../assets/gif/login.gif')} style={styles.gif}/>
            <View style={styles.topCont}></View>
            {/* Container of the inputs */}
            <View style={styles.container}>

                <Text style={styles.title}>Join our community!</Text>

                <View style={styles.signUpContainer}>
                    <Text style={styles.HaveAccountText}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity style={styles.signUpBtn} onPress={()=>navigation.goBack()}>
                    <Text style={styles.signUpText}>
                        Go back to Sign in.
                    </Text>
                    </TouchableOpacity>
                </View>

                {/* Username Input*/}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput
                        placeholder="Username"
                        maxLength={40}
                        placeholderTextColor={'lightgrey'}
                        underlineColorAndroid='transparent'
                        onChangeText={username => setUsername(username)} 
                        value={username}
                        style={styles.input}
                    />
                </View>

                {/* Email Input*/}
                <View style={{marginTop: 17}}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={'lightgrey'}
                        underlineColorAndroid='transparent'
                        onChangeText={email => setEmail(email)} 
                        value={email}
                        style={styles.input}
                    />
                </View>  

                {/* Password Input */} 
                <View style={{marginTop: 17}}>

                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                        placeholder={'Password'}
                        placeholderTextColor={'lightgrey'}
                        secureTextEntry={passwordVisibility}
                        underlineColorAndroid='transparent'
                        onChangeText={password => setPassword(password)} 
                        value={password}
                        style={styles.input}
                    />

                    {/* <TouchableOpacity style={styles.eyeIconBtn} > */}
                    <Ionicons name={passwordVisibilityIcon} size={25} style={styles.eyeIcon} onPress={onPasswordVisibilityIconToggle}/>
                </View>

                {/* Confirm Password */}
                <View style={{marginTop: 17}}>

                    <Text style={styles.label}>Confirm Password:</Text>
                    <TextInput
                        placeholder={'Password'}
                        placeholderTextColor={'lightgrey'}
                        secureTextEntry={passwordVisibility2}
                        underlineColorAndroid='transparent'
                        onChangeText={confPass => setConfPass(confPass)} 
                        value={confPass}
                        style={styles.input}
                        onSubmitEditing={register}
                    />

                    {/* <TouchableOpacity style={styles.eyeIconBtn} > */}
                    <Ionicons name={passwordVisibilityIcon2} size={25} style={styles.eyeIcon} onPress={onPasswordVisibilityIconToggle2}/>
                </View>


                {/* Sign up Button */}
                <View style={{alignItems:'center'}}>
                <Pressable style={styles.btn} onPress={register}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight:'bold',
                        color: 'white'
                        }}>Register</Text>
                </Pressable>

                </View>  
            </View>
            
        </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    page: {
        height:Dimensions.get('screen').height+95,
        backgroundColor:'#ecf5e0'
    },

    container:{
        justifyContent:'space-between',
        //height:'40%',
        flex:1.5,
        padding: 20,
        bottom:20,
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

    title:{
        fontSize:34,
        color:'#f15454',
        fontWeight:'600',
        paddingTop:28,

    },

    // inputContainer:{
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 2,
    //     },
    //     shadowOpacity: 0.2,
    //     shadowRadius: 3.84,

    //     elevation: 5,
    // },


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

    spinnerTextStyle: {
        color: '#FFF'
    },

    btn:{
        marginBottom:20,
        marginTop:40,
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
    },

    signUpContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom:30,
        marginLeft:3
    },

    signUpText: {
        color: '#2a37ff',
        fontWeight:'600',
        textDecorationLine: 'underline',
        fontSize: 13,
        textAlign: 'center'
        },

    signUpBtn: {
        paddingLeft: 5,
    },

    HaveAccountText: {
        color: 'black',
        fontSize: 13,
        textAlign: 'center',
    },
})
