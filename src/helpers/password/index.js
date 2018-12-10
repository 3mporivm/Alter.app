const bcrypt = require('bcryptjs');
import { SALT } from 'constants/constants';

export const set = value => localStorage.setItem('password', bcrypt.hashSync(value, SALT));
export const get = () => localStorage.getItem('password');
export const remove = () => localStorage.removeItem('password');
