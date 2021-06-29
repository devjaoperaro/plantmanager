import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Button } from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/core';


interface Params {
    title: string,
    subtitle: string,
    buttonTitle: string,
    icon: 'hug' | 'smile',
    nextScreen: string
}

const emoji = {
    hug: '🤗',
    smile: '😃'
}

export function Confirmation(){ 

    const navigation = useNavigation();

    const route = useRoute();
    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen
    } = route.params as Params

    function handleMoveOn(){
        navigation.navigate(nextScreen);
    }

    return(
        <SafeAreaView style={styles.contaier}>

            <View style={styles.content}>

                <Text style={styles.emoji}>
                    {emoji[icon]}
                </Text>

                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
                
                <View style={styles.footer}>
                    <Button title={buttonTitle} onPress={handleMoveOn}/>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contaier: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading
    },
    emoji: {
        fontSize: 78
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20
    }
})