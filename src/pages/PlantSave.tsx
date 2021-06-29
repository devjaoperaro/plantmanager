import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native'; 

import waterdrop from '../assets/waterdrop.png';
import { SvgFromUri } from 'react-native-svg';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import fonts from '../styles/fonts';
import { color } from 'react-native-reanimated';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import { useNavigation, useRoute } from '@react-navigation/core'
import { format, isBefore } from 'date-fns';
import { PlantProps, savePlant } from '../libs/storage';
import { RotationGestureHandler } from 'react-native-gesture-handler';


interface Params {
    plant: PlantProps
}

export function PlantSave(){

    const navigation = useNavigation();

    // Recebendo valores de outra tela pela rota
    const route = useRoute();
    const { plant } = route.params as Params;

    // nova tipagem
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    // se for ios, ele devolve um true
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        // se for android ele nega o valor anterior
        if(Platform.OS == 'android'){
            setShowDatePicker(oldState => !oldState)
        }
        // verifica se a data é antiga 
        if(dateTime && isBefore(dateTime, new Date())){
            // passa a data atual para tirar a data antiga e voltar com a atual
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma data futura! ⏱️')
        }

        if(dateTime)
            setSelectedDateTime(dateTime);
    }

    // vai negar a negação, tornando um true
    function handleOpenDatetimePickerForAndroid(){
        setShowDatePicker(oldState => !oldState);
    }

    async function handleSave(){   
        
        try{
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            })

            navigation.navigate('Confirmation', {
                title: 'Tudo Certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
                buttonTitle: 'Muito Obrigado',
                icon: 'hug',
                nextScreen: 'MyPlants'
            })
            
        }catch {
            Alert.alert('Não foi possivel salvar! ')
        }
    }

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            //mesmo estilo do container
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri uri={plant.photo} width={150} height={150}
                    />
                    
                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>

                    <Text style={styles.planAbout}>
                        {plant.about}
                    </Text>
                </View>

                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image 
                            source={waterdrop} 
                            style={styles.tipImage}
                        />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                        
                    </View>

                    <Text style={styles.alertLabel}>
                        Escolha o melhor horario para ser lembrado
                    </Text>

                    {
                        showDatePicker && (
                            <DateTimePicker 
                                value={selectedDateTime}
                                mode='time'
                                display='spinner'
                                onChange={handleChangeTime}
                            />
                        )
                    }

                    {
                        Platform.OS == 'android' && (
                            <TouchableOpacity style={styles.dateTimePickerButton} onPress={handleOpenDatetimePickerForAndroid}>
                                <Text style={styles.dateTimePickerText}>
                                    {/* monstrando a hora para ser alterada */}
                                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                        )
                    }

                    <Button 
                        title='Cadastrar Planta'
                        onPress={handleSave}
                    />

                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    planAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40 
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    },
})