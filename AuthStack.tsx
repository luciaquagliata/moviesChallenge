import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

interface AuthStackProps {
  setUser: (user: FirebaseAuthTypes.User | null) => void;
}

const AuthStack: React.FC<AuthStackProps> = ({setUser}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} setUser={setUser} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
