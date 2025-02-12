import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoDbUri = process.env.MONGO_DB_LOCAL || process.env.MONGO_DB_ONLINE;

if (!mongoDbUri) {
  throw new Error("MongoDB URI is not defined in the environment variables");
}

mongoose
  .connect(mongoDbUri, {})
  .then(() => console.log("Connected to Database"))
  .catch((err: Error) => console.error("Error connecting to Database", err));