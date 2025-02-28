  import React, { createContext, useState, useEffect } from 'react';
  import axios from 'axios';
  import data from './data';
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
    updateValue2: (newValue: string, currencyCode: string) => void;
    calculator: (value: number, code1: string, code2: string) => number;
  }

  export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

  const currencies = [
    { code: 'USD', flag: '🇺🇸', rate: 1},
    { code: 'EUR', flag: '🇪🇺', rate: 1 },
    { code: 'BRL', flag: '🇧🇷', rate: 1 },
    { code: 'GBP', flag: '🇬🇧', rate: 1 },
    { code: 'JPY', flag: '🇯🇵', rate: 1 },
    { code: 'AUD', flag: '🇦🇺', rate: 1 },
    { code: 'CAD', flag: '🇨🇦', rate: 1 },
  ];

  const fetchCurrencyRates = async (useApi = false): Promise<CurrencyRates | null> => {
    if (useApi) {
      return data;
    }

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
    }

  export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currencyData, setCurrencyData] = useState(currencies);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [value1, setValue1] = useState<CurrencyValue>({ amount: 1, code: 'BRL' });
    const [value2, setValue2] = useState<CurrencyValue>({ amount: 5.73, code: 'USD' });

    const updateValue1 = (newValue: string, currencyCode: string) => {
      const numericValue = parseFloat(newValue.replace(',', '.')) || 0;
    
      setValue1({ amount: numericValue, code: currencyCode });
    
      const convertedAmount = calculator(numericValue, currencyCode, value2.code);
      setValue2(prev => ({ ...prev, amount: convertedAmount }));
    };
    

    const updateValue2 = (newValue: string, currencyCode: string) => {
      const numericValue = parseFloat(newValue.replace(',', '.')) || 0;
    
      setValue2({ amount: numericValue, code: currencyCode });
    
      const convertedAmount = calculator(numericValue, currencyCode, value1.code);
      setValue1(prev => ({ ...prev, amount: convertedAmount }));
    };
    

    const calculator = (value: number, code1: string, code2: string):number => {
      if (!currencyData.length) return 0;

      const currencyFrom = currencyData.find(c => c.code === code1);
      const currencyTo = currencyData.find(c => c.code === code2);

      if (!currencyFrom || !currencyTo) return 0;

      const valueInEUR = code1 === "EUR" ? value : parseFloat((value / currencyFrom.rate).toFixed(2));
      const convertedAmount = code2 === "EUR" ? valueInEUR : parseFloat((valueInEUR * currencyTo.rate).toFixed(2));

      return convertedAmount;
  };

    useEffect(() => {
      const getRates = async () => {
        setLoading(true);
        const data = await fetchCurrencyRates(); 
        if (data) {
          const updatedCurrencies = currencies.map(currency => ({
            ...currency,
            rate: data[currency.code],
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
      <CurrencyContext.Provider value={{ currencies: currencyData, loading, error, value1, updateValue1, value2, calculator, updateValue2 }}>
        {children}
      </CurrencyContext.Provider>
    );
  };
