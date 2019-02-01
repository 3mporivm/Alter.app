import { schema } from 'normalizr';

export const dealsSchema = new schema.Entity('deals', {});
export const arrayOfDealsSchemas = new schema.Array(dealsSchema);