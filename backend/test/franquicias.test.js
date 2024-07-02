const request = require("supertest");
const app = require("../index");

describe("GET /api/franquicias", function () {
  it("Devolveria todas las franquicias", async function () {
    const res = await request(app)
      .get("/api/franquicias")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Id: expect.any(Number),
          Nombre: expect.any(String),
          FechaFundacion: expect.any(String),
        }),
      ])
    );
  });
});


describe("GET /api/franquicias/:id", function () {
  it("respond with json containing a single franquicia", async function () {
    const res = await request(app)
      .get("/api/franquicias/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id: 1,
        Nombre: expect.any(String),
        FechaFundacion: expect.any(String),
      })
    );
  });
});
