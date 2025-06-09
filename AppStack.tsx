import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoviesSearchScreen from './src/screens/MoviesSearchScreen';
import {View, TouchableOpacity, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {clearMovies} from './src/store/slices/moviesSlice';
import {getApp} from '@react-native-firebase/app';
import {getAuth, FirebaseAuthTypes} from '@react-native-firebase/auth';

const auth = getAuth(getApp());

const Stack = createNativeStackNavigator();

interface AppStackProps {
  setUser: (user: FirebaseAuthTypes.User | null) => void;
}

const AppStack: React.FC<AppStackProps> = ({setUser}) => {
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
};

export default AppStack;
