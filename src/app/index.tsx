import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460', '#53354a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />
      <Text style={styles.title}>Coin</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Value"
          placeholderTextColor="#ccc"
          value={value1}
          onChangeText={setValue1}
          keyboardType="numeric"
          style={styles.input}
        />
        <Icon name="swap-vert" size={40} color="#fff" style={styles.icon} />
        <TextInput
          placeholder="Result"
          placeholderTextColor="#ccc"
          value={value2}
          onChangeText={setValue2}
          keyboardType="numeric"
          editable={false}
          style={[styles.input, styles.disabledInput]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 28,
  },
  form: {
    width: '95%', // Aumenta a largura do formulário
    alignSelf: 'center', // Garante que fique centralizado
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 18,
    marginBottom: 15,
  },
  icon: {
    marginVertical: 10, // Mantém espaçamento entre os inputs
  },
  disabledInput: {
    opacity: 0.6,
  },
});

export default App;
