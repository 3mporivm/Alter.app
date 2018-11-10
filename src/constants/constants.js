const NETWORK = 'livenet';
const BTC_LIKE = {
    'btc': true,
    'BTC': true,
    'ltc': true,
    'LTC': true,
    'bch': true,
    'BCH': true,
    'dash': true,
    'DASH': true,
    'doge': true,
    'DOGE': true
}
const ETH_LIKE = {
    'eth': true,
    'ETH': true,
    'etc': true,
    'ETC': true
}
const ERC20 = {
    'bnb': true,
    'BNB': true,
    'ht': true,
    'HT':true
}

module.exports = {
    NETWORK: NETWORK,
    BTC_LIKE: BTC_LIKE,
    ETH_LIKE: ETH_LIKE,
    ERC20: ERC20
}