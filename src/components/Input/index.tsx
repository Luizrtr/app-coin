import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Modal, FlatList, StyleSheet } from 'react-native';

interface ICurrencies {
  code: string;
  flag: string;
}

interface InputProps {
  value: string;
  onChangeValue: (text: string) => void;
  selectedCurrency: ICurrencies;
  onSelectCurrency: (currency: ICurrencies) => void;
  currencies: ICurrencies[];
}

const InputContainer: React.FC<InputProps> = ({ value, onChangeValue, selectedCurrency, onSelectCurrency, currencies }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleChangeValue = (text: string) => {
    const sanitizedValue = text.replace(/[^0-9.]/g, '');
    onChangeValue(sanitizedValue);
  };

  const handleSelectCurrency = (currency: ICurrencies) => {
    onSelectCurrency(currency);
    setModalVisible(false);
  };

  const handleFocus = () => {
    onChangeValue('');
  };
  

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholderTextColor="#ccc"
        value={value}
        onChangeText={handleChangeValue}
        onFocus={handleFocus}
        keyboardType="numeric"
        style={styles.input}
      />
      <TouchableOpacity style={styles.currencyButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.currencyText}>{selectedCurrency?.flag || "🏳️"} {selectedCurrency?.code || "N/A"}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione uma moeda</Text>
            <FlatList
              data={currencies}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.currencyOption} onPress={() => handleSelectCurrency(item)}>
                  <Text style={styles.currencyText}>{item?.flag || "🏳️"} {item?.code || "N/A"}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: { flexDirection: 'row', backgroundColor: '#333', borderRadius: 8, marginBottom: 15 },
  input: { flex: 1, height: 50, paddingHorizontal: 15, color: '#fff', fontSize: 18 },
  currencyButton: { height: 50, width: 90, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f3460' },
  currencyText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#222', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  currencyOption: { paddingVertical: 10, width: '100%', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#444' },
  closeButton: { marginTop: 10, paddingVertical: 10, width: '100%', alignItems: 'center', backgroundColor: '#ff4444', borderRadius: 5 },
  closeButtonText: { color: '#fff', fontSize: 16 },
});

export default InputContainer;
