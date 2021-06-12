import React , {useState} from 'react'
import { StyleSheet, Text, View, Image, TextInput, ScrollView, Pressable } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import API from '../../../NGROK'
import { useNavigation } from '@react-navigation/core'

const EditProfile = ({navigation , route}) => {

    //const navigation = useNavigation();

    const { userId, userToken } = route.params;
    
    const [oldPassword , setOldPassword] = useState("");
    const [password ,setPassword]=useState("");
    const [confPass , setConfPass] = useState("");

    const [passwordVisibilityIcon, setpasswordVisibilityIcon] = useState('eye-off-outline')
    const [passwordVisibility, setpasswordVisibility] = useState(true);

    const [passwordVisibilityIcon1, setpasswordVisibilityIcon1] = useState('eye-off-outline')
    const [passwordVisibility1, setpasswordVisibility1] = useState(true);

    const [passwordVisibilityIcon2, setpasswordVisibilityIcon2] = useState('eye-off-outline')
    const [passwordVisibility2, setpasswordVisibility2] = useState(true);


    const onPasswordVisibilityIconToggle = () => {
        passwordVisibilityIcon === 'eye-outline' ? setpasswordVisibilityIcon('eye-off-outline') : setpasswordVisibilityIcon('eye-outline')
        setpasswordVisibility(!passwordVisibility)
    }

    const onPasswordVisibilityIconToggle1 = () => {
        passwordVisibilityIcon1 === 'eye-outline' ? setpasswordVisibilityIcon1('eye-off-outline') : setpasswordVisibilityIcon1('eye-outline')
        setpasswordVisibility1(!passwordVisibility1)
        }

    const onPasswordVisibilityIconToggle2 = () => {
    passwordVisibilityIcon2 === 'eye-outline' ? setpasswordVisibilityIcon2('eye-off-outline') : setpasswordVisibilityIcon2('eye-outline')
    setpasswordVisibility2(!passwordVisibility2)
    }

    const update = () =>{
        if(!password | !confPass | !oldPassword){
            return alert('Please fill all the password fields.')
        }else if (password !== confPass) {
            alert('"Password" and "Confirm Password fields must be identical')
            return;
        }else if (password == oldPassword) {
            alert('"Old Password" and "New Password" are identical')
            return;
        } else if(password.length < 8) {
            alert('Password must be at least 8 characters')
            return;
        } 

        const data = {
            oldPassword : oldPassword ,
            newPassword : password ,
        }
    
        axios.post(`${API}/api/update/${userId}` , data , {
            headers: {
                authorization: `Bearer ${userToken}` 
            }
          })
        .then(res => {
            if(res.data === 'Incorrect Password.') {
                setOldPassword('')
                setPassword('')
                setConfPass('')                
                alert(res.data);
            } else {
                alert(res.data)
                navigation.navigate('Profile');
            }
        }).catch(err => {
            console.warn(err, 'Failed to send request')
        })
        
       
    }


    return (
        <ScrollView style={{marginBottom:70}}>

            <View style={styles.container}>

                {/* Password Input */} 
                <View style={{marginTop: 15}}>

                <Text style={styles.label}>Old Password:</Text>
                <TextInput
                    placeholder={'********'}
                    placeholderTextColor={'lightgrey'}
                    secureTextEntry={passwordVisibility}
                    underlineColorAndroid='transparent'
                    onChangeText={oldPassword => setOldPassword(oldPassword)} 
                    value={oldPassword}
                    style={styles.textInput}
                />

                {/* <TouchableOpacity style={styles.eyeIconBtn} > */}
                <Ionicons name={passwordVisibilityIcon} size={25} style={styles.eyeIcon} onPress={onPasswordVisibilityIconToggle}/>
                </View>

                <View style={{marginTop: 17}}>

                <Text style={styles.label}>New Password:</Text>
                <TextInput
                    placeholder={'********'}
                    placeholderTextColor={'lightgrey'}
                    secureTextEntry={passwordVisibility1}
                    underlineColorAndroid='transparent'
                    onChangeText={password => setPassword(password)} 
                    value={password}
                    style={styles.textInput}
                />

                {/* <TouchableOpacity style={styles.eyeIconBtn} > */}
                <Ionicons name={passwordVisibilityIcon1} size={25} style={styles.eyeIcon} onPress={onPasswordVisibilityIconToggle1}/>
                </View>

                {/* Confirm Password */}
                <View style={{marginTop: 15}}>

                <Text style={styles.label}>Confirm New Password:</Text>
                <TextInput
                    placeholder={'********'}
                    placeholderTextColor={'lightgrey'}
                    secureTextEntry={passwordVisibility2}
                    underlineColorAndroid='transparent'
                    onChangeText={confPass => setConfPass(confPass)} 
                    value={confPass}
                    style={styles.textInput}
                />

                {/* <TouchableOpacity style={styles.eyeIconBtn} > */}
                <Ionicons name={passwordVisibilityIcon2} size={25} style={styles.eyeIcon} onPress={onPasswordVisibilityIconToggle2}/>
                </View>
            </View>

            <View>
                <Pressable 
                onPress={update}
                style={{
                    marginBottom:20,
                    backgroundColor:'#f15454',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height:50 ,
                    marginHorizontal: 20,
                    borderRadius: 10,
                    marginTop : 20
            }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight:'bold',
                        color: 'white'
                        }}>Update Password</Text>
                </Pressable>
            </View>

                

        </ScrollView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    img:{
        height:130,
        width:130,
        borderWidth:1,
        borderColor:'lightgrey',
        borderRadius:75,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        // marginLeft:'30%',
        marginTop:'5%'
    },

    profileimage:{
        marginTop:10,
        fontSize:13,
        color:'blue',
        textDecorationLine:'underline'
    },
    
    container:{
        marginHorizontal:15,
    },

    textInput: {        
        fontSize: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgrey'
    },

    
    eyeIcon: {
        position: 'absolute',
        top: 30,
        right: 10,
        opacity: 0.5,
        color:'black'
    },


})
