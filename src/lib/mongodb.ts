import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/perfectscore'

interface CachedConnection {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: CachedConnection
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (global.mongoose.conn) {
    return global.mongoose.conn
  }

  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    }

    global.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    global.mongoose.conn = await global.mongoose.promise
  } catch (e) {
    global.mongoose.promise = null
    throw e
  }

  return global.mongoose.conn
}

export default connectToDatabase 