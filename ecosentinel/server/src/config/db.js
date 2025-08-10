import mongoose from 'mongoose';

let memoryServer = null;

export async function connectToDatabase() {
  const useMemory = process.env.MONGO_INMEMORY === 'true';
  const mongoUri = process.env.MONGO_URI || '';

  if (useMemory) {
    return startMemoryServer();
  }

  try {
    if (!mongoUri) throw new Error('MONGO_URI not provided');
    mongoose.set('strictQuery', true);
    await mongoose.connect(mongoUri, { autoIndex: true });
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB at', mongoUri);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('MongoDB connection failed, starting in-memory server. Reason:', err.message);
    return startMemoryServer();
  }
}

async function startMemoryServer() {
  const { MongoMemoryServer } = await import('mongodb-memory-server');
  memoryServer = await MongoMemoryServer.create();
  const uri = memoryServer.getUri();
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { autoIndex: true });
  // eslint-disable-next-line no-console
  console.log('Connected to in-memory MongoDB');
}