'use strict';
const { server } = require('../src/server.js'); 
const supergoose = require('@code-fellows/supergoose');
// const superTest = require('supertest');
const request = supergoose(server);
const base64 = require("base-64");




 
    describe('POST /signup create new user', () => {
      test('Should create new user and return record', async () => {
        let response = await request
          .post('/signup').send({ username: 'ahmad', password: '12345' });
        expect(response.body.username).toEqual('ahmad');
        expect(response.status).toEqual(201);
      });
      test('POST to /signin to login an existing user', async () => {
        let user = base64.encode(`ahmad:12345`);
        let response = await request
          .post('/signin').set(`Authorization`, `Basic ${user}`);
        expect(response.body.user.username).toEqual('ahmad');
        expect(response.status).toEqual(200);
      });
    });
    
    describe('Not found errors', () => {
      it('handle invalid routes', async () => {
        const response = await request.get(`/foo`);
        expect(response.status).toEqual(404);
      });
    
      it('handle server errors', async () => {
        const response = await request.put('/bad');
        expect(response.status).toEqual(500);
      });
    });
