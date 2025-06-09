import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoviesSearchScreen from './src/screens/MoviesSearchScreen';
import {View, TouchableOpacity, Text} from 'react-native';

const Stack = createNativeStackNavigator();

export default function AppStack({setUser}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoviesSearch"
        component={MoviesSearchScreen}
        options={{
          title: 'Look for movies!',
          headerRight: () => (
            <View style={{marginRight: 12}}>
              <TouchableOpacity onPress={() => setUser(null)}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

/*
<TouchableOpacity onPress={() => setUser(null)}>
                <MaterialIcons name="logout" size={24} color="black" />
              </TouchableOpacity>
*/
