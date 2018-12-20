const bitcore = require('bitcore-lib');
const bch = require('bitcore-lib-cash');
const bchaddrs = require('bchaddrjs');
const factor = 100000000; // множитель для BTC-LIKE валют
import endpoints from 'api/endpoints';

const createTxBody = async (options) => {
  const amount = options.amount * factor;
  const fee = Math.round(options.fee * factor);
  if (options.chain === 'bch') { // transform to legacy format for bch
    options.sourceAddress = bchaddrs.toLegacyAddress(options.sourceAddress);
    options.targetAddress = bchaddrs.toLegacyAddress(options.targetAddress);
  }
  const response = await fetch(endpoints.getUtxosUrl(options.chain, options.sourceAddress)); // получить по API: /utxos
  const { utxos } = await response.json();
  let tx = new bitcore.Transaction();
  tx.from(utxos)
    .to(options.targetAddress, amount)
    .change(options.sourceAddress) // адрес возврата "сдачи"
    .fee(fee);
  return tx.toObject();
};

export const createTransaction = async (options, privateKey) => {
  const txBody = await createTxBody(options);
  let tx;
  if (options.chain === 'bch') {
    tx = new bch.Transaction(txBody);
  } else {
    tx = new bitcore.Transaction(txBody);
  }
  tx.sign(privateKey);
  tx.serialize();
  return tx.toString();
};