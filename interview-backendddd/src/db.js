import mongoose from "mongoose";

let isConnected = false;

// App startup pe ek baar call karo (server.js me). Isse baar baar
// naya connection nahi banega agar already connected hai.
export async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set in .env");
  }

  await mongoose.connect(uri);
  isConnected = true;
  console.log("MongoDB connected");
}