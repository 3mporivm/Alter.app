import btcLike from 'bitcore-lib'; // library for btc-like chains (btc, bch, ltc, dash, doge)
import bchaddrs from 'bchaddrjs'; // address format bch
import bip39 from 'bip39'; // для seed-phrase
import hdkey from 'ethereumjs-wallet/hdkey';
import {
  BTC_LIKE,
  ETH_LIKE,
  NETWORK,
  COINS,
} from 'constants/constants';
const net = require('../constants/networks');

export const createAddress = (chain, seedPhrase, childCount) => {
  if (chain in BTC_LIKE) {
    btcLike.Networks.defaultNetwork = btcLike.Networks.add(net[chain]);
    const seed = bip39.mnemonicToSeed(seedPhrase);
    const hdPrivateKey = new btcLike.HDPrivateKey.fromSeed(seed, NETWORK);
    const derived = hdPrivateKey.deriveChild(+childCount);
    let privateKey = new btcLike.PrivateKey(derived.privateKey);
    let address = privateKey.toAddress().toString();
    const publicKey = btcLike.PublicKey(privateKey).toString();
    privateKey = privateKey.toString();
    if (chain === 'bch') { // если bch то приводим адрес в новый формат
      address = bchaddrs.toCashAddress(address);
    }

    return {
      address,
      publicKey,
      privateKey,
      number: childCount,
    };
  }

  if (chain in ETH_LIKE) {
    const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(seedPhrase));
    const walletHdpath = "m/44'/60'/0'/0/";
    const wallet = hdwallet.derivePath(walletHdpath + childCount).getWallet();
    const address = `0x${wallet.getAddress().toString('hex')}`;
    const privateKey = wallet.getPrivateKey().toString('hex');
    return {
      address,
      privateKey,
      number: childCount,
    };
  }
};

export const createCoins = (phrase) => {
  const currencies = [];
  COINS.map(({ name, fullName }, index) => currencies.push({
    wallets: [{ ...createAddress(name, phrase, 1), name: `My wallet ${index + 1}` }],
    name,
    fullName,
  }));
  return currencies;
};

// console.log(createAddress('doge', 'reunion nothing resist donor suspect include sustain script erase rack invite heart', 1));