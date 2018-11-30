export const required = value => (value && value.trim()) ? undefined : 'Required';

export const minLength = min => value =>
  value && value.trim().length < min ? `Не менее ${min} символов` : undefined;

export const minLengthArray = min => value =>
  value && value.size < min ? `Не менее ${min} символов` : undefined;

export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Wrong e-mail'
  : undefined;
