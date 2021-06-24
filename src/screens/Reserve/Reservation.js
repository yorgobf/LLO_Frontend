import React, {useState} from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { Calendar } from 'react-native-calendario';

import CalendarPicker from 'react-native-calendar-picker';

const Reservation = () => {
    const [adults,setAdults] = useState(1)
    const [kids,setKids] = useState(0)
    var [date , setDate] = useState()
    
    const width = Dimensions.get('screen').width

    const reserve = () =>{
        date = JSON.stringify(date)
        date = date.split('T')[0].slice(1);
        
        data = {
                   }
    }

    return (
        <View style={{justifyContent: 'space-between',height:'100%'}}>
            <View>
            {/*Number of Adultes */}
            <View style={styles.container1}>
                <View >
                    <Text style={styles.Adult}>Adults</Text>
                    <Text style={{color: '#8d8d8d'}}>Ages from 14 or above</Text>
                </View>

                <View style={styles.container2}>
                    <Pressable
                    onPress={()=>setAdults(Math.max(0,adults-1))}
                    style={styles.button}>
                        <Text style={{fontSize: 20, color:'black'}}>-</Text>
                    </Pressable>

                    <Text style={{marginHorizontal: 20, fontSize: 16}}>{adults}</Text>

                    <Pressable
                    onPress={()=>setAdults(adults +1)}
                    style={styles.button}>
                        <Text style={{fontSize: 20, color:'black'}}>+</Text>
                    </Pressable>

                </View>

            </View>

            {/*Number of Kids */}

            <View style={styles.container1}>
                <View >
                    <Text style={styles.Adult}>Kids</Text>
                    <Text style={{color: '#8d8d8d'}}>Ages below 14</Text>
                </View>

                <View style={styles.container2}>
                    <Pressable
                    onPress={()=>setKids(Math.max(0,kids-1))}
                    style={styles.button}>
                        <Text style={{fontSize: 20, color:'black'}}>-</Text>
                    </Pressable>

                    <Text style={{marginHorizontal: 20, fontSize: 16}}>{kids}</Text>

                    <Pressable
                    onPress={()=>setKids(kids +1)}
                    style={styles.button}>
                        <Text style={{fontSize: 20, color:'black'}}>+</Text>
                    </Pressable>

                </View>
            </View>
            </View>
            {/* {console.warn(date)} */}

            {/*Calendar */}
            <View style={styles.calendarContainer}>

                    <CalendarPicker
                        onDateChange={date=>setDate(date)}
                        selectedDayStyle={{backgroundColor:'#f15454',}}
                        selectedDayTextColor="#FFFFFF"
                        startFromMonday={true}
                        minDate={new Date()}
                        todayBackgroundColor="#eeeeee"
                        todayTextStyle={{color:'#6d95da',fontWeight:'bold'}}
                        textStyle={{color:'#333333'}}
                        width={width-50}
                        disabledDatesTextStyle={{color:'lightgrey'}}
                        monthTitleStyle={{color:'#f15454'}}
                        yearTitleStyle={{color:'#f15454'}}
                    />
                </View>

            <View>
                <Pressable style={{
                    marginBottom:20,
                    backgroundColor:'#f15454',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height:50 ,
                    marginHorizontal: 20,
                    borderRadius: 10,
                }}
                onPress={()=>reserve()}
            >
                    <Text style={{
                        fontSize: 20,
                        fontWeight:'bold',
                        color: 'white'
                        }}>Reserve</Text>
                </Pressable>
            </View>


        </View>
    )
}

export default Reservation

const styles = StyleSheet.create({
    Adult:{
        fontWeight: 'bold'
    },

    container1: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: 'lightgrey', 
        marginHorizontal: 20
    },

    container2: {
        flexDirection:'row',
        alignItems: 'center',
    },

    calendarContainer:{
        //marginTop:20,
        borderColor:'grey',
        borderRadius:10,
        borderWidth:1,
        width:Dimensions.get('screen').width-40,
        marginHorizontal:20,
        overflow:'hidden',
        height:300,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:100
    },

    button: {
        borderRadius: 15,
        borderWidth: 1,
        width: 30,
        height: 30,
        borderColor: 'lightgrey',
        justifyContent:'center',
        alignItems: 'center',
    },
})
