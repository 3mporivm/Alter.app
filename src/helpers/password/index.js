export const set = value => localStorage.setItem('password', value);
export const get = () => localStorage.getItem('password');
export const remove = () => localStorage.removeItem('password');
