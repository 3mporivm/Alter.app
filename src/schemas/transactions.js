import { schema } from 'normalizr';

export const transactionsSchema = new schema.Entity('transactions', {}, {
  idAttribute: 'hash',
});
export const arrayOfTransactionsSchemas = new schema.Array(transactionsSchema);