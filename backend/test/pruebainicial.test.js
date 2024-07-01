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

// describe("GET _isalive", () => {
//   it("Deberia devolver ejecutándose desde ...", async () => {
//     const res = await request(app).get("/_isalive");
//     expect(res.statusCode).toEqual(200);
//     expect(res.text).toContain('Ejecutandose desde:');
//   });
// });

// describe("GET 404", () => {
//   it("Debería devolver error 404 y su texto apropiado", async () => {
//     const res = await request(app).get("/urlinexistente");
//     expect(res.statusCode).toEqual(404);
//     expect(res.text).toEqual("No encontrada!");
//   });
// });
