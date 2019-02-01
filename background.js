/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
// const localStorage = require('./src/helpers');

// Add a listener for the close browser action
chrome && chrome.windows.onRemoved.addListener(() => {
  localStorage.removeItem('isLogin');
});

// browser && browser.windows.onRemoved.addListener(() => {
//   localStorage.removeItem('isLogin');
// });

const CURRENCIES = {
  btc: 0,
  ltc: 1,
  bch: 2,
  dash: 3,
  doge: 4,
  BTC: 0,
  LTC: 1,
  BCH: 2,
  DASH: 3,
  DOGE: 4,
};

const importAllAddresses = () => {
  if (!localStorage.getItem('isLogin')) { return 'Wallet locked'; }
  const state = JSON.parse(localStorage.getItem('state'));
  const currencies = state.currencies;
  const importCurrencies = [];
  for (let i = 0; i < currencies.length; i++) {
    const currency = {};
    currency.name = currencies[i].name;
    currency.fullName = currencies[i].fullName;
    const wallets = [];
    for (let j = 0; j < currencies[i].wallets.length; j++) {
      const wallet = {
        address: currencies[i].wallets[j].address,
        publicKey: currencies[i].wallets[j].publicKey,
      };
      wallets.push(wallet);
    }
    currency.wallets = wallets;
    importCurrencies.push(currency);
  }
  return importCurrencies;
};

const importCurrency = (chain) => {
  if (!localStorage.getItem('isLogin')) { return 'Wallet locked'; }
  const state = JSON.parse(localStorage.getItem('state'));
  const currencies = state.currencies[CURRENCIES[chain]];
  const currency = {};
  currency.name = currencies.name;
  currency.fullName = currencies.fullName;
  const wallets = [];
  for (let i = 0; i < currencies.wallets.length; i++) {
    const wallet = {
      address: currencies.wallets[i].address,
      publicKey: currencies.wallets[i].publicKey,
    };
    wallets.push(wallet);
  }
  currency.wallets = wallets;
  return currency;
};

chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    if (request.command === 'importAllAddresses') {
      const importAddresses = importAllAddresses();
      sendResponse(importAddresses);
    }
    if (request.command === 'importCurrency') {
      const currencyInfo = importCurrency(request.currency);
      sendResponse(currencyInfo);
    }
    if (request.command === 'transactionSignature') {
      const width = 500;
      const height = 625;
      localStorage.setItem('isNewWindow', 'true');
      localStorage.setItem('deal', JSON.stringify(request.body));
      window.open(chrome.extension.getURL('index.html'), '', `width=${width},height=${height},left=${((window.innerWidth - width) / 2)},top=${((window.innerHeight - 500) / 2)}`);
      //sendResponse(currencyInfo);
    }
});
