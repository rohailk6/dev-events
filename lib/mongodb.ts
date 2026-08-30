import mongoose, { type Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

interface MongooseCache {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Reuse this cache during hot reloads so development does not open extra connections.
const globalWithMongoose = globalThis as typeof globalThis & {
  mongoose: MongooseCache | undefined;
};

const cached =
  globalWithMongoose.mongoose ??
  (globalWithMongoose.mongoose = { connection: null, promise: null });

/** Connect to MongoDB once and return the cached Mongoose instance. */
export async function connectToDatabase(): Promise<Mongoose> {
  if (cached.connection) {
    return cached.connection;
  }

  // Store the pending promise so concurrent requests share a single connection attempt.
  cached.promise ??= mongoose.connect(MONGODB_URI);

  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.connection;
}
