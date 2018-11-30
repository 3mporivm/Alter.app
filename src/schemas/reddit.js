import { schema } from 'normalizr';

export const postSchema = new schema.Entity('wallets', {}, {
  idAttribute: entity => entity.address,
  // processStrategy: value => value.data,
});
export const arrayOfPostSchemas = new schema.Array(postSchema);
