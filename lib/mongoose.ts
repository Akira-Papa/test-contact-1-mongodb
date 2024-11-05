import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

interface MongooseConnection {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
}

class DatabaseConnection {
    private static instance: DatabaseConnection
    private mongoConnection: MongooseConnection = {
        conn: null,
        promise: null,
    }

    private constructor() {}

    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection()
        }
        return DatabaseConnection.instance
    }

    async connect() {
        if (this.mongoConnection.conn) {
            console.log('✅ 既存の接続を使用します')
            return this.mongoConnection.conn
        }

        if (!this.mongoConnection.promise) {
            const opts = {
                bufferCommands: false,
            }

            console.log('🔌 新しい接続を確立します')
            this.mongoConnection.promise = mongoose
                .connect(MONGODB_URI, opts)
                .then((mongoose) => {
                    this.mongoConnection.conn = mongoose
                    return mongoose
                })
        }

        try {
            const conn = await this.mongoConnection.promise
            return conn
        } catch (e) {
            this.mongoConnection.promise = null
            throw e
        }
    }
}

// 使いやすいようにデフォルトエクスポート
export default async function dbConnect() {
    const instance = DatabaseConnection.getInstance()
    return instance.connect()
}
