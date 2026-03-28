import { Collection, Db, Document, MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.connectionString!;
if (!uri) throw new Error('MONGO_URI não está definido no .env');

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function conexaoMongoDB<T extends Document>(nomeBanco: string, nomeCollection: string): Promise<Collection<T>> {
  if (cachedClient && cachedDb) return cachedDb.collection<T>(nomeCollection);

  cachedClient = new MongoClient(uri);
  await cachedClient.connect();

  cachedDb = cachedClient.db(nomeBanco);
  return cachedDb.collection<T>(nomeCollection);
}
