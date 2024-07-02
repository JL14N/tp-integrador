// probar con comando: jest ./test/pruebainicial.test.js

const request = require('supertest');
const app = require('../index');

describe('Ejemplo simple, test que no falla', () => {
  it('Simplemente compruebo si true === true', () => {
    expect(true).toBe(true);
  });
});

describe('GET /', () => {
  it('Debería devolver dds-backend iniciado!', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('dds-backend iniciado!');
  });
});
