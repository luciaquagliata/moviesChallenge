import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, Image} from 'react-native';
// import auth from '@react-native-firebase/auth';
import IMDb from '../api/IMDb';

import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebaseConfig';

export default function LoginScreen({setUser}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log('Usuario logueado:', userCredential.user.email);
    } catch (error) {
      console.error('Error de login:', error.message);
    }
  };

  // const handleLogin = async () => {
  //   try {
  //     const userCredential = await auth().signInWithEmailAndPassword(
  //       email,
  //       password,
  //     );
  //     setUser(userCredential);
  //     console.log('Logueado como:', userCredential.user.email);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  return (
    <>
      <Image style={styles.image} source={require('../../assets/logo.png')} />
      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button title="Iniciar sesión" onPress={handleLogin} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  image: {
    alignSelf: 'center',
    marginTop: 200,
  },
});
