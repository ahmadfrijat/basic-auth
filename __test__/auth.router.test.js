'use strict';
const { server } = require('../src/server.js'); 
const supergoose = require('@code-fellows/supergoose');
// const superTest = require('supertest');
const request = supergoose(server);
let id;



describe('api server', () => {

    
    
      it('should create a new User on POST /signup ', async () => {
        const obj = {
            username: 'test',
            password: 'test',
          };
        const response = await request.post('/signup').send(obj);
        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual('test');
        id = response.body._id;
      });
      it('should the user login on POST /signin', async () => {
        // const obj = {
        //     username: 'test',
        //     password: 'test',
        //   };
        // const response = await request.post('/signin').send(obj);
        // expect(response.status).toEqual(200);
        // expect(response.body.username).toEqual('test');
        // id = response.body._id;
		// const response = await request.post('/signup').send({
		// 	username: 'ahmad',
		// 	password: '12345',
		// });

		// const { username, password } = response.body;

		// const response2 = await request
		// 	.post('/signin')
		// 	.set(

		// 	);

		// expect(response2.status).toEqual(200);
	});

	it('handle invalid routes', async () => {
		const response = await request.get(`/foo`);
		expect(response.status).toEqual(404);
	});

	it('handle server errors', async () => {
		const response = await request.put('/bad');
		expect(response.status).toEqual(500);
	});
    });