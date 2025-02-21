import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface CurrencyRates {
  [key: string]: number;
}

interface CurrencyContextType {
  currencies: { code: string; flag: string; rate?: number }[];
  loading: boolean;
  error: string | null;
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
  try {
    const response = await axios.get('https://api.exchangeratesapi.io/v1/latest?access_key=60f0f519d9d05bb1fb724dc53c182986&format=1');
    if (response.data.success) {
      return response.data.rates;
    } else {
      throw new Error('Falha ao obter taxas de câmbio');
    }
  } catch (error) {
    console.error('Erro ao buscar dados de moedas:', error);
    return null;
  }
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currencyData, setCurrencyData] = useState(currencies);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    <CurrencyContext.Provider value={{ currencies: currencyData, loading, error }}>
      {children}
    </CurrencyContext.Provider>
  );
};
