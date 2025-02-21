import React from 'react';
import App from '../screen';
import { CurrencyProvider } from '../context/';

const Root = () => (
  <CurrencyProvider>
    <App />
  </CurrencyProvider>
);

export default Root;
