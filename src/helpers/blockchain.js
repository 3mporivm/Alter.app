import btc_like from "bitcore-lib"; // library for btc-like chains (btc, bch, ltc, dash, doge)
import bchaddrs from "bchaddrjs"; // address format bch
import bip39 from "bip39"; // для seed-phrase
import { BTC_LIKE, NETWORK, COINS } from 'constants/constants';
const net = require('../constants/networks');

export const createAddress = (chain, seedPhrase, childCount) => {
    if (chain in BTC_LIKE) {
        btc_like.Networks.defaultNetwork = btc_like.Networks.add(net[chain]);
        let seed = bip39.mnemonicToSeed(seedPhrase);
        let hdPrivateKey = new btc_like.HDPrivateKey.fromSeed(seed, NETWORK);
        let derived = hdPrivateKey.deriveChild(+childCount);
        let privateKey = new btc_like.PrivateKey(derived.privateKey);
        let address = privateKey.toAddress().toString();
        let publicKey = btc_like.PublicKey(privateKey).toString();
        privateKey = privateKey.toString();
        if (chain === 'bch') { // если bch то приводим адрес в новый формат
            address = bchaddrs.toCashAddress(address);
        }
        return {
            address: address,
            publicKey: publicKey,
            privateKey: privateKey
        }
    }
};

export const createCoins = (phrase) => {
  let currencies = [];
  COINS.map(({ name, fullName }) => currencies.push({
    wallets: [createAddress(name, phrase, 1)],
    name,
    fullName,
  }));
  return currencies;
};

// console.log(createAddress('doge', 'reunion nothing resist donor suspect include sustain script erase rack invite heart', 1));