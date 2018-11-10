export const required = value => (value && value.trim()) ? undefined : 'Required';

export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Wrong e-mail'
  : undefined;
