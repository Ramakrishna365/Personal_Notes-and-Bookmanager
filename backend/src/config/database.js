const { MongoClient } = require('mongodb');

let db = null;

const connectDB = async () => {
  if (db) return db;

  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/notes-bookmarks';
    const client = new MongoClient(uri);
    
    await client.connect();
    console.log('Connected to MongoDB');
    
    db = client.db();
    
    // Create collections and indexes
    await createCollections();
    
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const createCollections = async () => {
  try {
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    // Create notes collection
    if (!collectionNames.includes('notes')) {
      await db.createCollection('notes');
      await db.collection('notes').createIndex({ userId: 1 });
      await db.collection('notes').createIndex({ tags: 1 });
      await db.collection('notes').createIndex({ title: 'text', content: 'text' });
    }

    // Create bookmarks collection
    if (!collectionNames.includes('bookmarks')) {
      await db.createCollection('bookmarks');
      await db.collection('bookmarks').createIndex({ userId: 1 });
      await db.collection('bookmarks').createIndex({ tags: 1 });
      await db.collection('bookmarks').createIndex({ title: 'text', url: 'text' });
    }

    // Create users collection
    if (!collectionNames.includes('users')) {
      await db.createCollection('users');
      await db.collection('users').createIndex({ email: 1 }, { unique: true });
    }
  } catch (error) {
    console.error('Error creating collections:', error);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};

module.exports = { connectDB, getDB };
