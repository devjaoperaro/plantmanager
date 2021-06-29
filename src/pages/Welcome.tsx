import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';

import { Feather } from '@expo/vector-icons';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';

export function Welcome(){

    //navegação
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification')
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.wrapper}>

                <Text style={styles.title}>
                    Gerencie {'\n'} 
                    suas plantas de{'\n'} 
                    forma fácil
                </Text>
                
                <Image source={wateringImg} style={styles.image} resizeMode='contain'/>

                <Text style={styles.subtitle}>
                    Não esqueça mais de regar as suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleStart} >

                    {/* adicionar icones é com o Feather */}
                    <Feather name='chevron-right' style={styles.buttonIcon}/>

                
                </TouchableOpacity>

            </View>
            
        </SafeAreaView>  
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 70,
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 35,
        height: 56,
        width: 56
    },
    buttonIcon: {
        fontSize: 32,
        color: colors.white
    }

})