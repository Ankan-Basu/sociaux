import { Mongoose } from "mongoose";
import mongoose from "mongoose";

/* eslint-disable no-var */

declare global {
  var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log("connecting to db");
    cached.promise = mongoose
      .connect(`${MONGODB_URI}`!)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
