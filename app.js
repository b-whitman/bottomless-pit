const express = require('express');
const app = express();
require('dotenv').config();
const { connectDB, getDB } = require('./db');
const { ObjectId } = require('mongodb');

if (process.env.NODE_ENV !== 'test') {
    connectDB();
}
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Message Board!');
});
app.get('/messages', async (req, res) => {
    try {
        const messagesCollection = getDB().collection('messages');
        const messages = await messagesCollection.find().toArray();
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/messages', async (req, res) => {
    const { content, username } = req.body;

    try {
        const messagesCollection = getDB().collection('messages');
        const result = await messagesCollection.insertOne({ content, username });
        const insertedMessage = await messagesCollection.findOne({ _id: new ObjectId(result.insertedId) });
        res.status(201).json(insertedMessage);
    } catch (error) {
        console.error('Error posting message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const port = process.env.PORT || 3000;
module.exports = app;