import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, Animated } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { SvgFromUri } from 'react-native-svg';
import { color } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';


interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    };
    handleRemove: () => void;
}


export const PlantCardSecondary = ({ data, handleRemove, ...rest} : PlantProps) => {
    return(
        <Swipeable
            // trava o movimento da direita
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton 
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather
                                name='trash' size={32} color={colors.white}
                            />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton 
                style={styles.container}
                {...rest}
            >
                <SvgFromUri uri={data.photo} 
                    width={50} 
                    height={50}>
                </SvgFromUri>

                <Text style={styles.title}>
                    {data.name}
                </Text>

                <View style={styles.datails}>
                    <Text style={styles.timeLabel}>
                        Regar às 
                    </Text>
                    <Text style={styles.time}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        backgroundColor: colors.shape,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading
    },
    datails: {
        alignItems: 'flex-end'
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light,
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    },
    buttonRemove: {
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        borderRadius: 20,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        right: 20,
        paddingLeft: 15
    }
})
