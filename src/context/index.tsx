import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface CurrencyRates {
  [key: string]: number;
}

interface CurrencyValue {
  amount: number;
  code: string;
}

interface CurrencyContextType {
  currencies: { code: string; flag: string; rate?: number }[];
  loading: boolean;
  error: string | null;
  value1: CurrencyValue;
  value2: CurrencyValue;
  updateValue1: (newValue: string, currencyCode: string) => void;
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

  const [value1, setValue1] = useState<CurrencyValue>({ amount: 1, code: 'BRL' });
  const [value2, setValue2] = useState<CurrencyValue>({ amount: 5.73, code: 'USD' });

  const updateValue1 = (newValue: string, currencyCode: string) => {
    const numericValue = parseFloat(newValue.replace(',', '.')) || 0;
    
    setValue1({ amount: numericValue, code: currencyCode });
    setValue2({ amount: numericValue, code: value2.code });
  };

  // const calculator = (value: number, code1: string, code2: string) => {

  // }

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

  return (
    <CurrencyContext.Provider value={{ currencies: currencyData, loading, error, value1, updateValue1, value2 }}>
      {children}
    </CurrencyContext.Provider>
  );
};
