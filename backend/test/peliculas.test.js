const request = require("supertest");
const app = require("../index");
const peliculaAlta = {
  Nombre: "Pelicula" + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un Nombre aleatorio
  FechaEstreno: new Date().toISOString(),
  Rating: 10,
  IdFranquicia: 1,
  Activo: true,
};
const peliculaModificacion = {
  Id: 1,
  Nombre: "Pelicula" + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un Nombre aleatorio
  FechaEstreno: new Date().toISOString(),
  Rating: 7.5,
  IdFranquicia: 2,
  Activo: false,
};

// test route/peliculas GET
describe("GET /api/peliculas", () => {
  it("Deberia devolver todas las peliculas", async () => {
    const res = await request(app).get("/api/peliculas");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            Id: expect.any(Number),
            Nombre: expect.any(String),
            FechaEstreno: expect.any(String),
            Rating: expect.any(Number),
            IdFranquicia: expect.any(Number),
            Activo: expect.any(Boolean),
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  }, 10000);
});

// test route/peliculas GET
describe("GET /api/peliculas con filtros", () => {
  it("Deberia devolver los peliculas según filtro ", async () => {
    const res = await request(app).get("/api/peliculas?Nombre=Aquaman&Activo=true&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items)).toEqual(true);
  
    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if ( !array[i].Nombre.includes("Aquaman") || !array[i].Activo ) {
          return false;
        }
      }
      return true;
    }
    
  });
});

// test route/peliculas/:id GET
describe("GET /api/peliculas/:id", () => {
  it("Deberia devolver el artículo con el id 1", async () => {
    const res = await request(app).get("/api/peliculas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id: 1,
        Nombre: expect.any(String),
        FechaEstreno: expect.any(String),
        Rating: expect.any(Number),
        IdFranquicia: expect.any(Number),
        Activo: expect.any(Boolean)
      })
    );
  });
});

// test route/peliculas POST
describe("POST /api/peliculas", () => {
  it("Deberia devolver la pelicula que acabo de crear", async () => {
    const res = await request(app).post("/api/peliculas").send(peliculaAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id: expect.any(Number),
        Nombre: expect.any(String),
        FechaEstreno: expect.any(String),
        Rating: expect.any(Number),
        IdFranquicia: expect.any(Number),
        Activo: expect.any(Boolean)
      })
    );
  });
});

// test route/peliculas/:id PUT
describe("PUT /api/peliculas/:id", () => {
  it("Deberia devolver la pelicula con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/peliculas/1")
      .send(peliculaModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/peliculas/:id DELETE
describe("DELETE /api/peliculas/:id", () => {
  it("Debería devolver el pelicula con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/peliculas/1");
    expect(res.statusCode).toEqual(200);
  });
});
