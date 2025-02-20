import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

interface ICurrencies {
  code: string;
  flag: string;
}

const currencies: ICurrencies[] = [
  { code: 'USD', flag: '🇺🇸' },
  { code: 'EUR', flag: '🇪🇺' },
  { code: 'BRL', flag: '🇧🇷' },
  { code: 'GBP', flag: '🇬🇧' },
  { code: 'JPY', flag: '🇯🇵' },
  { code: 'AUD', flag: '🇦🇺' },
  { code: 'CAD', flag: '🇨🇦' },
];

const App = () => {
  const [value1, setValue1] = useState('1');
  const [value2, setValue2] = useState('5.89');
  const [coin, setCoin] = useState<ICurrencies>(currencies[2]);
  const [coin2, setCoin2] = useState<ICurrencies>(currencies[0]);
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  const handleCoin = (currency: ICurrencies) => {
    if (currency.code === coin2.code) {
      alert('Selecione uma moeda diferente!');
    } else {
      setCoin(currency);
      setModal1Visible(false);
    }
  };

  const handleCoin2 = (currency: ICurrencies) => {
    if (currency.code === coin.code) {
      alert('Selecione uma moeda diferente!');
    } else {
      setCoin2(currency);
      setModal2Visible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#344e41', '#3a5a40', '#588157']} style={styles.background} />
      <Text style={styles.title}>Coin 💵💵</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Quantia</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="#ccc"
            value={value1}
            onChangeText={setValue1}
            keyboardType="numeric"
            style={styles.input}
          />
          <TouchableOpacity style={styles.currencyButton} onPress={() => setModal1Visible(true)}>
            <Text style={styles.currencyText}>{coin.flag} {coin.code}</Text>
          </TouchableOpacity>
        </View>

        <MaterialIcons name="swap-vert" size={40} color="#fff" style={styles.icon} />

        <Text style={styles.label}>Converter para</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Result" placeholderTextColor="#ccc" value={value2} editable={false} style={[styles.input, styles.disabledInput]} />
          <TouchableOpacity style={styles.currencyButton} onPress={() => setModal2Visible(true)}>
            <Text style={styles.currencyText}>{coin2.flag} {coin2.code}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={modal1Visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione uma moeda</Text>
            <FlatList
              data={currencies}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.currencyOption} onPress={() => handleCoin(item)}>
                  <Text style={styles.currencyText}>{item.flag} {item.code}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModal1Visible(false)}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={modal2Visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione uma moeda</Text>
            <FlatList
              data={currencies}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.currencyOption} onPress={() => handleCoin2(item)}>
                  <Text style={styles.currencyText}>{item.flag} {item.code}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModal2Visible(false)}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  background: { ...StyleSheet.absoluteFillObject },
  title: { fontSize: 36, fontWeight: 'bold', color: '#fff', marginBottom: 28 },
  form: { width: '95%', backgroundColor: '#212529', borderRadius: 10, padding: 20 },
  inputContainer: { flexDirection: 'row', backgroundColor: '#333', borderRadius: 8, marginBottom: 15 },
  input: { flex: 1, height: 50, paddingHorizontal: 15, color: '#fff', fontSize: 18 },
  currencyButton: { height: 50, width: 90, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f3460' },
  currencyText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  icon: { marginVertical: 10, alignSelf: 'center' },
  disabledInput: { opacity: 0.6 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#222', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  currencyOption: { paddingVertical: 10, width: '100%', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#444' },
  closeButton: { marginTop: 10, paddingVertical: 10, width: '100%', alignItems: 'center', backgroundColor: '#ff4444', borderRadius: 5 },
  closeButtonText: { color: '#fff', fontSize: 16 },
  label: { fontSize: 14, color: '#fff', paddingBottom: 14 },
});

export default App;