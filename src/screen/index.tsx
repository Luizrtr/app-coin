import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Input from '../components/Input';
import { CurrencyContext } from '../context/';

const App = () => {
  const { 
    currencies, 
    loading, 
    error, 
    value1, 
    value2, 
    updateValue1, 
    updateValue2,
    calculator 
  } = useContext(CurrencyContext) || {
    currencies: [],
    loading: true,
    error: null,
    value1: { amount: 0, code: 'BRL' },
    value2: { amount: 0, code: 'USD' },
    updateValue1: () => {},
    updateValue2: () => {},
    calculator: () => null,
  };

  const [coin, setCoin] = useState(() => currencies.find(c => c.code === value1.code) || { code: 'BRL', flag: '🇧🇷' });
  const [coin2, setCoin2] = useState(() => currencies.find(c => c.code === value2.code) || { code: 'USD', flag: '🇺🇸' });

  const [inputValue1, setInputValue1] = useState(String(value1.amount).replace('.', ','));
  const [inputValue2, setInputValue2] = useState(String(value2.amount).replace('.', ','));

  useEffect(() => {
    setInputValue1(String(value1.amount).replace('.', ','));
    setInputValue2(String(value2.amount).replace('.', ','));
  }, [value1, value2]);

  const handleChangeValue1 = (text: string) => {
    const numericValue = parseFloat(text.replace(',', '.')) || 0;
    
    setInputValue1(text);
    updateValue1(numericValue.toString(), coin.code);
  console.log(numericValue, coin.code, coin2.code);
    const result = calculator(numericValue, coin.code, coin2.code);
    console.log(result);
    if (result !== null) {
      setInputValue2(result.toFixed(2).replace('.', ','));
    }
  };

  const handleChangeValue2 = (text: string) => {
    const numericValue = parseFloat(text.replace(',', '.')) || 0;
  
    setInputValue2(text);
    updateValue2(numericValue.toString(), coin2.code);
  
    const result = calculator(numericValue, coin2.code, coin.code);
    console.log(result);
    if (result !== null) {
      setInputValue1(result.toFixed(2).replace('.', ','));
    }
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
