import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert
} from 'react-native';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';
import { FlatList } from 'react-native-gesture-handler';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

export function MyPlants(){

    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);   
    //proxima a ser regada
    const [nextWatered, setNextWatered] = useState<string>();
    

    function handleRemove(plant: PlantProps){
        // alert no formato de sim e nao
        Alert.alert('Excluir', `Deseja excluir a ${plant.name}?`, [
            // nao
            {
                text: 'Não',
                style: 'cancel'
            },
            // sim
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        await removePlant(plant.id)
                        
                        //atualizando a lista pelo estado
                        setMyPlants((oldData) => 
                            oldData.filter((item) => 
                                item.id != plant.id)
                        );
                    } catch (error) {
                        Alert.alert('Não foi possivel remover!')
                    }
                }
            }
        ])
    }
    useEffect(() => {
        async function loadStorageData(){
            const PlantsStorage = await loadPlant();
            
            // formatDistance: calcula uma distancia de uma data para outra, da primeira data para a data de agora 
            // vendo qual é a proxima data a ser regada
            const nextTime = formatDistance(
                new Date(PlantsStorage[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );
            
            setNextWatered(
                `Não esqueça de regar a ${PlantsStorage[0].name} à ${nextTime} horas`
            )

            setMyPlants(PlantsStorage);
            setLoading(false);
        }    
        loadStorageData();
    });

    if(loading)
        return <Load/>
    return (
        <View style={styles.container}>
            <Header/>
            <View style={styles.spotlight}>
                <Image source={waterdrop} style={styles.spotlightImage}/>
                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>

                <FlatList 
                    data={myPlants} 
                    keyExtractor={(item) => String(item.id)} 
                    renderItem={({ item }) => (
                        <PlantCardSecondary 
                            data={item}
                            handleRemove={() => {handleRemove(item)}}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}
                    />

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%',
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
})
