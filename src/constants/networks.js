const dogeNetwork = {
  name: 'livenet',
  alias: 'mainnet',
  pubkeyhash: 30,
  privatekey: 158,
  scripthash: 22,
  xpubkey: 49990397,
  xprivkey: 49988504,
  networkMagic: 3233857728,
  port: 22556,
  dnsSeeds: [
    'seed.dogecoin.com',
    'seed.multidoge.org',
    'seed2.multidoge.org',
    'seed.doger.dogecoin.com',
  ],
};
const btcNetwork = {
  name: 'livenet',
  alias: 'mainnet',
  pubkeyhash: 0,
  privatekey: 128,
  scripthash: 5,
  xpubkey: 76067358,
  xprivkey: 76066276,
  networkMagic: 4190024921,
  port: 8333,
  dnsSeeds: [
    'seed.bitcoin.sipa.be',
    'dnsseed.bluematt.me',
    'dnsseed.bitcoin.dashjr.org',
    'seed.bitcoinstats.com',
    'seed.bitnodes.io',
    'bitseed.xf2.org',
  ],
};
const dashNetwork = {
  name: 'livenet',
  alias: 'mainnet',
  pubkeyhash: 76,
  privatekey: 204,
  scripthash: 16,
  xpubkey: 76067358,
  xprivkey: 76066276,
  networkMagic: 3205262269,
  port: 9999,
  dnsSeeds: [
    'dnsseed.darkcoin.io',
    'dnsseed.dashdot.io',
    'dnsseed.masternode.io',
    'dnsseed.dashpay.io',
  ],
};
const ltcNetwork = {
  name: 'livenet',
  alias: 'mainnet',
  pubkeyhash: 48,
  privatekey: 176,
  scripthash: 50,
  xpubkey: 27108450,
  xprivkey: 27106558,
  networkMagic: 4223710939,
  port: 9333,
  dnsSeeds: [
    'dnsseed.litecointools.com',
    'dnsseed.litecoinpool.org',
    'dnsseed.ltc.xurious.com',
    'dnsseed.koin-project.com',
    'seed-a.litecoin.loshan.co.uk',
    'dnsseed.thrasher.io',
  ],
};
const UTXOS_URL = {
    btc: 'https://blockexplorer.com:443',
    bch: 'https://bch.blockdozer.com',
    dash: 'http://142.93.110.201:3004/insight-api-dash',
    ltc: 'http://92.223.105.179:3001/insight-lite-api',
    doge: 'https://dogechain.info/api/v1/',
};
const FEES_URL = {
    btc: 'https://api.blockcypher.com/v1/btc/main',
    bch: 'https://bch.blockdozer.com/insight-api/utils/estimatefee',
    dash: 'https://api.blockcypher.com/v1/dash/main',
    ltc: 'https://api.blockcypher.com/v1/ltc/main',
    doge: 'https://api.blockcypher.com/v1/doge/main',
};
const BROADCAST_URL = {
    btc: 'https://blockexplorer.com:443/tx/send',
    bch: 'https://bch.blockdozer.com/api/tx/send',
    dash: 'http://142.93.110.201:3004/insight-api-dash/tx/send',
    ltc: 'http://92.223.105.179:3001/insight-lite-api/tx/send',
    doge: 'https://dogechain.info/api/v1/pushtx',
};

module.exports = {
  btc: btcNetwork,
  bch: btcNetwork,
  dash: dashNetwork,
  ltc: ltcNetwork,
  doge: dogeNetwork,
  UTXOS_URL,
  FEES_URL,
  BROADCAST_URL,
};
