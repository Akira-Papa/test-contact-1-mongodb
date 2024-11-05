import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

if (!process.env.MONGODB_URI) {
  throw new Error(
    'MongoDBの接続URLが設定されていません。.env.localファイルにMONGODB_URIを設定してください。'
  );
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!global.mongoose) {
  global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function dbConnect() {
  try {
    if (global.mongoose.conn) {
      console.log("✅ 既存のMongoDB接続を使用します");
      return global.mongoose.conn;
    }

    if (!global.mongoose.promise) {
      console.log("🔌 新しいMongoDB接続を確立します");
      
      const opts = {
        bufferCommands: false,
      };

      global.mongoose.promise = mongoose.connect(MONGODB_URI, opts);
    }

    global.mongoose.conn = await global.mongoose.promise;
    console.log("✅ MongoDBに接続しました");

    return global.mongoose.conn;
  } catch (error) {
    console.error("❌ MongoDB接続エラー:", error);
    throw error;
  }
}

export default dbConnect;