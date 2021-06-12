import { Dimensions, StyleSheet} from 'react-native'

const styles =StyleSheet.create({
    container: {
        marginVertical:7,
        marginHorizontal : '4%',
        width : "92%",
        borderWidth : 1,
        borderColor : 'lightgrey',
        borderRadius:15,
        overflow:'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,

    },

    innerContainer:{
        padding :10,
        backgroundColor: 'white'
    },
    
    image:{
        height:200,
        width:'100%',
        //height:'70%',
        //aspectRatio: 13.5 / 20,
        //aspectRatio: 16 / 9,   
        //resizeMode: 'cover',
        borderRadius: 15,
    },

    description:{
        fontSize: 18,
        lineHeight: 26,
        marginTop:8,
    },

    nbPers: {
        marginVertical: 10,
        color: '#5b5b5b',

    },

    prices: {
        fontSize: 18,
    },

    price:{
        fontWeight: 'bold',
    },


});

export default styles;