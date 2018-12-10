import endpoints from 'api/endpoints';
import _ from 'lodash';
import Immutable from 'immutable';

export default ({ chain, address }) => ({
  url: endpoints.getWalletBalanceUrl({ chain, address }),
  transform: response => ({ currencies: _.omit(response, ['status'])}),
  queryKey: endpoints.getWalletBalanceUrl({ chain, address }),
  meta: {},
  force: true,
  options: {
    headers: {
      Accept: 'application/json',
    },
  },
  update: {
    currencies: (prevCurrencies = Immutable.List(), wallet) => {
        const indexCurrencies = prevCurrencies.findIndex(({ name }) => name === chain);
        return prevCurrencies.update(indexCurrencies, currencies => {
          const indexWallet = _.findIndex(currencies.wallets, {address});
          return {
            ...currencies,
            wallets: [
              ...currencies.wallets.slice(0, indexWallet),
              {
                ...currencies.wallets[indexWallet],
                balance: +wallet.get('balance')
              },
              ...currencies.wallets.slice(indexWallet + 1),
            ]
          };
        })
    }
  },
});
