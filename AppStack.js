import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoviesSearchScreen from './src/screens/MoviesSearchScreen';
import {View, TouchableOpacity, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

export default function AppStack({setUser}) {
  const handleLogout = async () => {
    await auth().signOut();
    setUser(null);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoviesSearch"
        component={MoviesSearchScreen}
        options={{
          title: 'Look for movies!',
          headerRight: () => (
            <View style={{marginRight: 12}}>
              <TouchableOpacity onPress={handleLogout}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
