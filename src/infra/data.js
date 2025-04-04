import Dexie from 'dexie';

export const db = new Dexie('unshopifyDb');

db.version(1).stores({
  items: '++id, name, description, link, cost, rank, bought, archived'
});