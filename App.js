import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/store';

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Observador de autenticación
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe; // limpiar en unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) return null; // o un SplashScreen

  return (
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
  );
}

// import React from 'react';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import MoviesSearchScreen from './src/screens/MoviesSearchScreen';
// import {Provider} from 'react-redux';
// import {store} from './src/store';
// import {Text, TouchableOpacity, View} from 'react-native';
// import {enableScreens} from 'react-native-screens';
// import firebase from '@react-native-firebase/app';

// console.log('Firebase initialized?', firebase.apps.length > 0);

// enableScreens();

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <GestureHandlerRootView style={{flex: 1}}>
//       <Provider store={store}>
//         <SafeAreaProvider>
//           <NavigationContainer>
//             <Stack.Navigator>
//               <Stack.Screen
//                 name="MoviesSearch"
//                 component={MoviesSearchScreen}
//                 options={{
//                   title: 'Look for movies!',
//                   headerRight: () => (
//                     <View style={{marginRight: 12}}>
//                       <TouchableOpacity onPress={() => console.log('Logout')}>
//                         <Text>Logout</Text>
//                       </TouchableOpacity>
//                     </View>
//                   ),
//                 }}
//               />
//             </Stack.Navigator>
//           </NavigationContainer>
//         </SafeAreaProvider>
//       </Provider>
//     </GestureHandlerRootView>
//   );
// }

// import React from 'react';
// import {Text, View} from 'react-native';
// import MoviesSearchScreen from './src/screens/MoviesSearchScreen';
// import {store} from './src/store';
// import {Provider} from 'react-redux';

// export default function App() {
//   return (
//     <Provider store={store}>
//       <MoviesSearchScreen />
//     </Provider>
//   );
// }

// {
//   /* <Provider store={store}>
//       <SafeAreaProvider>
//         <NavigationContainer>
//           <AppStack setUser={setUser} />
//         </NavigationContainer>
//       </SafeAreaProvider>
//     </Provider> */
// }
