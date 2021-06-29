import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import  Routes  from './src/routes';
import * as Notifications from 'expo-notifications';

import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';

export default function App(){
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    const notifi = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data;
        console.log(data);
      } 
    )
  })

  // apploading espera a fonte ser carregada
  if(!fontsLoaded)
    return <AppLoading/>

  return (
    <Routes></Routes>
  )
}

