import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const CURRENCIES = {
  EUR: { code: 'EUR', symbol: '€', flag: '🇪🇺', rate: 1.0, label: 'EUR (€)' },
  USD: { code: 'USD', symbol: '$', flag: '🇺🇸', rate: 1.10, label: 'USD ($)' },
  GBP: { code: 'GBP', symbol: '£', flag: '🇬🇧', rate: 0.85, label: 'GBP (£)' },
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('noirdrop_currency') || 'EUR';
  });

  useEffect(() => {
    localStorage.setItem('noirdrop_currency', currency);
  }, [currency]);

  const currentCurrency = CURRENCIES[currency] || CURRENCIES.EUR;

  const formatPrice = (baseEurAmount) => {
    const converted = Math.round(baseEurAmount * currentCurrency.rate);
    return `${currentCurrency.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currentCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      currency: 'EUR',
      setCurrency: () => {},
      currentCurrency: CURRENCIES.EUR,
      formatPrice: (amt) => `€${amt}`,
    };
  }
  return context;
}
