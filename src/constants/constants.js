import iconAvatar1 from 'assets/img/avatars/19.png';
import iconAvatar2 from 'assets/img/avatars/21.png';
import iconAvatar3 from 'assets/img/avatars/25.png';
import iconAvatar4 from 'assets/img/avatars/26.png';
import iconAvatar5 from 'assets/img/avatars/28.png';
import iconAvatar6 from 'assets/img/avatars/30.png';

import iconBTC from 'assets/img/currency/BTC.svg';
// import iconLitecoin from 'assets/img/avatars/Litecoin.svg';
// import iconDash from 'assets/img/avatars/Dash.svg';

export const NETWORK = 'livenet';
export const BTC_LIKE = {
    'btc': true,
    'ltc': true,
    'bch': true,
    'dash': true,
    'doge': true
};
export const ETH_LIKE = {
    'eth': true,
    'ETH': true,
    'etc': true,
    'ETC': true
};
export const ERC20 = {
  'bnb': true,
  'BNB': true,
  'ht': true,
  'HT':true
};

export const COINS = [
  {
    name: "btc",
    fullName: 'Bitcoin',
  },
  {
    name: "ltc",
    fullName: "Litecoin",
  },
  {
    name: "bch",
    fullName: "Bitcoin Cash",
  },
  {
    name: "dash",
    fullName: "Dash",
  },
  {
    name: "doge",
    fullName: "Doge",
  },
];
export const CURRENCY_ICONS = {
  btc: iconBTC,
  //ltc: iconLitecoin,
  bch: 0,
  //dash: iconDash,
  doge: 0,
};
export const SALT = "$2a$10$J8GCNLf7N7W85iQGm5fhbu";

export const AVATARS = [
  iconAvatar1,
  iconAvatar2,
  iconAvatar3,
  iconAvatar4,
  iconAvatar5,
  iconAvatar6,
];