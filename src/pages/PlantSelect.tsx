import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import colors from '../styles/colors';

import { Header } from '../components/Header'; 
import { EnviromentButton } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load'

import fonts from '../styles/fonts';
import api from '../services/api';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../libs/storage';


interface EnviromentProps {
    key: string;
    title: string;
} 


export function PlantSelect() {

    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true)

    // paginação
    const [page, setPage] = useState(1);
    // saber se tem mais coisas para carregar
    const [loadingMore, setLoadingMore] = useState(true);

    // navegação
    const navigation = useNavigation();

    // função do ambiente
    function handleEnviromentSelected(enviroment: string){
        setEnviromentSelected(enviroment);


        if(enviroment == 'all')
            return setFilteredPlants(plants)

        const filtered = plants.filter(plant => 
            plant.environments.includes(enviroment)
        );
        setFilteredPlants(filtered);
    }

    // recebe as plantas
    async function fetchPlants(){
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if(!data)
            return setLoading(true)
        
        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data]);
            setFilteredPlants(oldValue => [...oldValue, ...data]);    
        }else{
            setPlants(data);
            setFilteredPlants(data);
        }
        setLoading(false);
        setLoadingMore(false);
    }

    // funcao para paginação por distancia
    function handleFetchMore(distance: number){
        if(distance < 1)
            return;
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1); 
        fetchPlants();
    }

    function handlePlantSelect(plant: PlantProps){
        // alem de chamar a nossa tela, a gente tbm passa os dados
        navigation.navigate('PlantSave', { plant });
    }

    // carregado antes q a tela seja mostrada
    useEffect(() => {
        async function fetchEviroment(){
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            setEnviroments([
                {
                    title: 'Todos',
                    key: 'all',
                },
                ...data
            ])
        }
        // só pode ser chamada aqui 
        fetchEviroment();
    },[])

    useEffect(() => {
        // só pode ser chamada aqui 
        fetchPlants();
    },[])

    if(loading)
        return <Load/>
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua plantinha?
                </Text>
            </View>
            <View>
                <FlatList 
                    data={enviroments} 
                    keyExtractor={(item) => String(item.key)}
                    renderItem={( { item } ) => (
                    <EnviromentButton 
                        title={item.title} 
                        active={item.key == enviromentSelected}
                        onPress={(() => handleEnviromentSelected(item.key))}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.enviromentList}
                />
            </View>

            <View style={styles.plants}>
                    <FlatList
                        data={filteredPlants}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={( {item} ) => (
                            <PlantCardPrimary 
                                data={item}
                                onPress={() => handlePlantSelect(item)} 
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        // quando o usuario chegar a 10% da tela
                        onEndReachedThreshold={0.1}
                        onEndReached={({ distanceFromEnd }) => 
                            handleFetchMore(distanceFromEnd)
                        }
                        ListFooterComponent={
                            loadingMore ?
                            <ActivityIndicator color={colors.green} />
                            : <></>
                        }
                    />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontSize: 17,
        fontFamily: fonts.text,
        color: colors.heading,
        lineHeight: 20
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
})

