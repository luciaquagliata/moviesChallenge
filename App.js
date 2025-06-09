import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoviesSearchScreen from './src/screens/MoviesSearchScreen';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {Text, TouchableOpacity, View} from 'react-native';
import {enableScreens} from 'react-native-screens';

enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="MoviesSearch"
                component={MoviesSearchScreen}
                options={{
                  title: 'Look for movies!',
                  headerRight: () => (
                    <View style={{marginRight: 12}}>
                      <TouchableOpacity onPress={() => console.log('Logout')}>
                        <Text>Logout</Text>
                      </TouchableOpacity>
                    </View>
                  ),
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

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
