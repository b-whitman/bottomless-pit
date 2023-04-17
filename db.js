const { MongoClient } = require('mongodb');
const connectionString = process.env.DATABASE_URL;

let db;
let client;

const connectDB = async () => {
    try {
        client = await MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db();
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

const closeDB = async () => {
    try {
        await client.close();
        console.log('Database disconnected');
    } catch (error) {
        console.error('Database disconnection error:', error);
    }
};

const getDB = () => db;

module.exports = {
    connectDB,
    getDB,
    closeDB,
};