import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoviesSearchScreen from './src/screens/MoviesSearchScreen';
import {View, TouchableOpacity, Text} from 'react-native';
// import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {clearMovies} from './src/store/slices/moviesSlice';
import {getApp} from '@react-native-firebase/app';
import {getAuth} from '@react-native-firebase/auth';

const auth = getAuth(getApp());

const Stack = createNativeStackNavigator();

export default function AppStack({setUser}) {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await auth.signOut();
    dispatch(clearMovies());
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
