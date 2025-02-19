import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const currencies = ['USD', 'EUR', 'BRL', 'GBP', 'JPY', 'AUD', 'CAD'];

const App = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Value"
            placeholderTextColor="#ccc"
            value={value1}
            onChangeText={setValue1}
            keyboardType="numeric"
            style={styles.input}
          />
          <TouchableOpacity style={styles.currencyButton} onPress={() => setModalVisible(true)}>
            <Icon name="attach-money" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <Icon name="swap-vert" size={40} color="#fff" style={styles.icon} />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Result"
            placeholderTextColor="#ccc"
            value={value2}
            editable={false}
            style={[styles.input, styles.disabledInput]}
          />
        </View>
      </View>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a currency</Text>
            <FlatList
              data={currencies}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.currencyOption} onPress={() => setModalVisible(false)}>
                  <Text style={styles.currencyText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '95%',
    alignSelf: 'center',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 18,
  },
  currencyButton: {
    height: 50,
    width: 50,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#0f3460',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginVertical: 10,
  },
  disabledInput: {
    opacity: 0.6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  currencyOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  currencyText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ff4444',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
