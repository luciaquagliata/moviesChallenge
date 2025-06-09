import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {getAuth} from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

export default function LoginScreen({setUser}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Email requerido',
      });
      return;
    }

    if (!password) {
      Toast.show({
        type: 'error',
        text1: 'Contraseña requerida',
      });
      return;
    }

    try {
      const userCredential = await getAuth().signInWithEmailAndPassword(
        email.trim(),
        password,
      );
      setUser(userCredential.user);
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        Toast.show({type: 'error', text1: 'Email inválido'});
      } else if (error.code === 'auth/user-not-found') {
        Toast.show({type: 'error', text1: 'Usuario no registrado'});
      } else if (error.code === 'auth/wrong-password') {
        Toast.show({type: 'error', text1: 'Contraseña incorrecta'});
      } else {
        Toast.show({
          type: 'error',
          text1: 'Ocurrió un error. Intenta nuevamente.',
        });
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 350,
    height: 140,
    resizeMode: 'contain',
  },

  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});
