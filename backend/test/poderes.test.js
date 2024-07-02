const request = require("supertest");
const app = require("../index");

describe("GET /api/poderes", function () {
  it("Devolveria todos los poderes", async function () {
    const res = await request(app)
      .get("/api/poderes")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdPersonaje: expect.any(Number),
          NombrePoder: expect.any(String),
        }),
      ])
    );
  });
});


describe("GET /api/poderes/:id", function () {
  it("respond with json containing a single poder", async function () {
    const res = await request(app)
      .get("/api/poderes/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdPersonaje: 1,
          NombrePoder: expect.any(String),
        }),
      ])
    );
  });
});
