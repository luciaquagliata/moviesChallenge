import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {getApp} from '@react-native-firebase/app';
import {getAuth, FirebaseAuthTypes} from '@react-native-firebase/auth';

const auth = getAuth(getApp());

interface AppStackProps {
  setUser: (user: FirebaseAuthTypes.User | null) => void;
}

interface AuthStackProps {
  setUser: (user: FirebaseAuthTypes.User | null) => void;
}

const App: React.FC = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) return null;

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
};

export default App;
