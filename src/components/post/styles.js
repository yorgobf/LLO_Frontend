import { Dimensions, StyleSheet} from 'react-native'

const styles =StyleSheet.create({
    container: {
        marginTop:15,
        margin:20,
        width: Dimensions.get('screen').width-30
    },
    
    image:{
        height:200,
        width: Dimensions.get('screen').width,
        aspectRatio: 16 / 9,
        resizeMode: 'cover',
        borderRadius: 15,
    },

    description:{
        fontSize: 18,
        lineHeight: 26
    },

    nbPers: {
        marginVertical: 10,
        color: '#5b5b5b',

    },

    prices: {
        fontSize: 18,
    },

    oldprice: {
        color: '#5b5b5b',
        textDecorationLine: 'line-through',
    },

    price:{
        fontWeight: 'bold',
    },

    totalPrice:{
        color: '#5b5b5b',
        textDecorationLine: 'underline'
    },

});

export default styles;