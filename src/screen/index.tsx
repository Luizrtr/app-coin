import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Input from '../components/Input';
import { CurrencyContext } from '../context/';

const App = () => {
  const { currencies, loading, error, value1, value2 } = useContext(CurrencyContext) || { currencies: [], loading: true, error: null };

  const [coin, setCoin] = useState(currencies[2] || { code: 'BRL', flag: '🇧🇷' });
  const [coin2, setCoin2] = useState(currencies[0] || { code: 'USD', flag: '🇺🇸' });

  const [inputValue1, setInputValue1] = useState(value1 !== undefined ? String(value1) : '');
  const [inputValue2, setInputValue2] = useState(value2 !== undefined ? String(value2) : '');

  const handleChangeValue1 = (text: string) => {
    setInputValue1(text);
  };

  const handleChangeValue2 = (text: string) => {
    setInputValue2(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#344e41', '#3a5a40', '#588157']} style={styles.background} />
      <Text style={styles.title}>Coin 💵💵</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Quantia</Text>
        <Input 
          value={inputValue1} 
          onChangeValue={handleChangeValue1} 
          selectedCurrency={coin} 
          onSelectCurrency={setCoin} 
          currencies={currencies} 
        />

        <MaterialIcons name="swap-vert" size={40} color="#fff" style={styles.icon} />

        <Text style={styles.label}>Converter para</Text>
        <Input 
          value={inputValue2} 
          onChangeValue={handleChangeValue2} 
          selectedCurrency={coin2} 
          onSelectCurrency={setCoin2} 
          currencies={currencies} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  background: { ...StyleSheet.absoluteFillObject },
  title: { fontSize: 36, fontWeight: 'bold', color: '#fff', marginBottom: 28 },
  form: { width: '95%', backgroundColor: '#212529', borderRadius: 10, padding: 20 },
  icon: { marginVertical: 10, alignSelf: 'center' },
  label: { fontSize: 14, color: '#fff', paddingBottom: 14 },
});

export default App;