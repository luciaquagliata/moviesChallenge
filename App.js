import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
//import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {getApp} from '@react-native-firebase/app';
import {getAuth} from '@react-native-firebase/auth';

const auth = getAuth(getApp());

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Observador de autenticación
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe; // limpiar en unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) return null; // o un SplashScreen

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <SafeAreaProvider>
            <NavigationContainer>
              {user ? (
                <AppStack setUser={setUser} />
              ) : (
                <AuthStack setUser={setUser} />
              )}
            </NavigationContainer>
          </SafeAreaProvider>
        </Provider>
      </GestureHandlerRootView>
    </>
  );
}
