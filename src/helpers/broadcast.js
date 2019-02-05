const bitcore = require('bitcore-lib');
const bch = require('bitcore-lib-cash');
const bchaddrs = require('bchaddrjs');
const factor = 100000000; // множитель для BTC-LIKE валют
import endpoints from 'api/endpoints';
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');

// connect to Infura node
const web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/51a62e88a174471781232cf873256f57'));

const createTxBody = async (options) => {
  const amount = options.amount * factor;
  const fee = Math.round(options.fee * factor);
  if (options.chain === 'bch') { // transform to legacy format for bch
    options.sourceAddress = bchaddrs.toLegacyAddress(options.sourceAddress);
    options.targetAddress = bchaddrs.toLegacyAddress(options.targetAddress);
  }

  // получить по API: /utxos
  const response = await fetch(endpoints.getUtxosUrl(options.chain, options.sourceAddress));
  const { utxos } = await response.json();
  const tx = new bitcore.Transaction();

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


export const createTransactionEth = async (options, privateKey) => {
  return new Promise(async function (resolve, reject) {
    const nonce = await web3.eth.getTransactionCount(options.sourceAddress);
    const gasPrice = await web3.eth.getGasPrice();
    const txData = {
      nonce,
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(gasPrice),
      to: options.targetAddress,
      from: options.sourceAddress,
      value: web3.utils.toHex(web3.utils.toWei(`${options.amount}`, 'ether')),
    };

    const privateKeyBuffer = new Buffer(privateKey, 'hex');
    const transaction = new Tx(txData);
    transaction.sign(privateKeyBuffer);
    const serializedTx = transaction.serialize().toString('hex');
    web3.eth.sendSignedTransaction(`0x${serializedTx}`, (err, result) => {
      if (err) {
        console.log('error', err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};


// export const createTransactionEth = (txData, function(err, result) {
//   if (err) return console.log('error', err)
//   console.log('sent', result)
// })