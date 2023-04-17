const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const { connectDB, closeDB } = require('../db');

process.env.NODE_ENV = 'test';

describe('GET /', () => {
    it('should return a welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('Welcome to the Message Board!');
    });
});

before(async () => {
    await connectDB();
});

after(async () => {
    await closeDB();
});