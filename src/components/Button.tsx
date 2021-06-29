import React from 'react'
import {TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native'

import colors from '../styles/colors'
import fonts from '../styles/fonts'


interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function Button({ title, ...rest } : ButtonProps){
    return(
        <TouchableOpacity style={styles.button} activeOpacity={0.7} {...rest}>

            <Text style={styles.buttonText}>
                { title }
            </Text>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 35,
        // height: 56,
        // width: 56
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.heading
    }
})