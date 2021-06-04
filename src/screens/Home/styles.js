import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 500,
        resizeMode: 'cover',
        justifyContent: 'center'
    },

    title: {
        fontSize: 60,
        fontWeight: 'bold',
        color: 'white',
        width:'70%',
        bottom: 75,
        marginLeft: 25
    },

    button:{
        backgroundColor:'#fff',
        borderRadius: 10,
        height: 50,
        width: Dimensions.get('screen').width-20,
        marginTop:25,
        marginHorizontal:10,
        // marginLeft:25,
        justifyContent:'center',
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    buttonSearch:{
        backgroundColor:'#fff',
        borderRadius: 30,
        height: 60,
        width: Dimensions.get('screen').width-20,
        marginHorizontal:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        zIndex: 50,
    },

    searchText: {
        fontSize: 16,
        fontWeight: 'bold',
        
    }
});

export default styles;