const btc_like = require('bitcore-lib'); // library for btc-like chains (btc, bch, ltc, dash, doge)
const bchaddrs = require('bchaddrjs'); // address format bch
const bip39 = require('bip39'); // для seed-phrase

const net = require('./networks');
const constants = require('./constants');
const BTC_LIKE = constants.BTC_LIKE;
const NETWORK = constants.NETWORK;

let createAddress = (chain, seedPhrase, childCount) => {
    if (chain in BTC_LIKE) {
        const network = btc_like.Networks.add(net[chain]);
        btc_like.Networks.defaultNetwork = network;  
        let seed = bip39.mnemonicToSeed(seedPhrase);
        let hdPrivateKey = new btc_like.HDPrivateKey.fromSeed(seed, NETWORK);
        let derived = hdPrivateKey.deriveChild(+childCount);
        let privateKey = new btc_like.PrivateKey(derived.privateKey);
        let address = privateKey.toAddress().toString();
        let publicKey = btc_like.PublicKey(privateKey).toString();
        privateKey = privateKey.toString();
        if (chain == 'bch') { // если bch то приводим адрес в новый формат
            address = bchaddrs.toCashAddress(address);
        }
        return {
            address: address,
            publicKey: publicKey,
            privateKey: privateKey
        }
    }
}



// console.log(createAddress('doge', 'reunion nothing resist donor suspect include sustain script erase rack invite heart', 1));

module.exports = {
    createAddress: createAddress
}