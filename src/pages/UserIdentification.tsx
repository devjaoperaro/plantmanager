import React, { useState } from 'react'
import { View, SafeAreaView, StyleSheet, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Alert } from 'react-native'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';



export function UserIdentification(){

    const [ isFocused, setIsFocuset ] = useState(false);
    const [ isFilled, setIsFilled ] = useState(false);
    const [ name, setName ] = useState<string>();

    const navigation = useNavigation();

    async function handleSubmit(){

        if(!name)
            return Alert.alert('Me diz como chamar você? 😪');
        
        try{
            // AsyncStorage guarda o valor(name) no celular do usuario
            await AsyncStorage.setItem('@plantmanager:user', name);

            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                buttonTitle: 'Confirmar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            })  

        }catch{
            Alert.alert('Não foi possível salvar o nome do usuário')
        }
    }

    // entrada
    function handleInputBlur() {
        setIsFocuset(false);
        setIsFilled(!!name)
    }
    
    // saida
    function handleInputFocus() {   
        setIsFocuset(true);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value);
    }

    return(
        <SafeAreaView style={styles.container}>

            {/* permite visualizar o botao em quanto digita */}
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <View style={styles.content}>

                        <View style={styles.form}>

                            <View style={styles.header}>

                                <Text 
                                    style={styles.emoji}>
                                    { isFilled ? '😄' : '😃' }
                                </Text>

                                <Text 
                                    style={styles.title}>
                                    Como podemos {'\n'} chamar você?
                                </Text>

                            </View>

                            <TextInput 
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && { borderColor: colors.green}
                                ]}
                                placeholder='Digite o nome'
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}>
                            </TextInput>

                            <View style={styles.footer}>
                                <Button title={'Confirmar'} onPress={handleSubmit}/>
                            </View>
                            
                        </View>

                    </View>

                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },
    header: {
        alignItems: 'center'
    },
    emoji: {
        fontSize: 44,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 32,
        marginTop: 20,
    },
    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20

    }
});