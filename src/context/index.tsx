import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface CurrencyRates {
  [key: string]: number;
}

interface CurrencyContextType {
  currencies: { code: string; flag: string; rate?: number }[];
  loading: boolean;
  error: string | null;
  value1: number;
  value2: number;
  updateValue1: (newValue: string) => void;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const currencies = [
  { code: 'USD', flag: '🇺🇸' },
  { code: 'EUR', flag: '🇪🇺' },
  { code: 'BRL', flag: '🇧🇷' },
  { code: 'GBP', flag: '🇬🇧' },
  { code: 'JPY', flag: '🇯🇵' },
  { code: 'AUD', flag: '🇦🇺' },
  { code: 'CAD', flag: '🇨🇦' },
];

const fetchCurrencyRates = async (): Promise<CurrencyRates | null> => {
  return null;
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currencyData, setCurrencyData] = useState(currencies);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);

  useEffect(() => {
    const getRates = async () => {
      setLoading(true);
      const data = await fetchCurrencyRates();
      if (data) {
        const updatedCurrencies = currencies.map(currency => ({
          ...currency,
          rate: data[currency.code] || null,
        }));
        setCurrencyData(updatedCurrencies);
      } else {
        setError('Erro ao carregar dados de moedas');
      }
      setLoading(false);
    };

    getRates();
  }, []);

  const updateValue1 = (newValue: string) => {
    const numericValue = parseFloat(newValue.replace(',', '.')) || 0;
    setValue1(numericValue);
    setValue2(numericValue);
  };

  return (
    <CurrencyContext.Provider value={{ currencies: currencyData, loading, error, value1, updateValue1, value2 }}>
      {children}
    </CurrencyContext.Provider>
  );
};
