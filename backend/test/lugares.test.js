const request = require("supertest");
const app = require("../index");

describe("GET /api/lugares", function () {
  it("Devolveria todos los lugares", async function () {
    const res = await request(app)
      .get("/api/lugares")
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
          Existe: expect.any(Boolean),
          Ubicacion: expect.any(String),
        }),
      ])
    );
  });
});


describe("GET /api/lugares/:id", function () {
  it("respond with json containing a single lugar", async function () {
    const res = await request(app)
      .get("/api/lugares/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id: 1,
        Nombre: expect.any(String),
        Existe: expect.any(Boolean),
        Ubicacion: expect.any(String),
      })
    );
  });
});
