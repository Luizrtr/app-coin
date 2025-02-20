import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Input from '../components/Input';

const currencies = [
  { code: 'USD', flag: '🇺🇸' },
  { code: 'EUR', flag: '🇪🇺' },
  { code: 'BRL', flag: '🇧🇷' },
  { code: 'GBP', flag: '🇬🇧' },
  { code: 'JPY', flag: '🇯🇵' },
  { code: 'AUD', flag: '🇦🇺' },
  { code: 'CAD', flag: '🇨🇦' },
];

const App = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [coin, setCoin] = useState(currencies[2]); // Padrão: BRL
  const [coin2, setCoin2] = useState(currencies[0]); // Padrão: USD

  useEffect(() => {
    setValue1('1');
    setValue2('5.89');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#344e41', '#3a5a40', '#588157']} style={styles.background} />
      <Text style={styles.title}>Coin 💵💵</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Quantia</Text>
        <Input 
          value={value1} 
          onChangeValue={setValue1} 
          selectedCurrency={coin} 
          onSelectCurrency={setCoin} 
          currencies={currencies} 
        />

        <MaterialIcons name="swap-vert" size={40} color="#fff" style={styles.icon} />

        <Text style={styles.label}>Converter para</Text>
        <Input 
          value={value2} 
          onChangeValue={setValue2} 
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