const request = require("supertest");
const app = require("../index");
const equipoAlta = {
  Nombre: "Equipo " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un Nombre aleatorio
  FechaAparicion: new Date().toISOString(),
  Bando: "Héroes",
  IdLugar: 1,
  Activo: true,
};
const equipoModificacion = {
  Id: 1,
  Nombre: "Equipo " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un Nombre aleatorio
  FechaAparicion: new Date().toISOString(),
  Bando: "Villanos",
  IdLugar: 2,
  Activo: false,
};

// test route/equipos GET
describe("GET /api/equipos", () => {
  it("Deberia devolver todos los equipos", async () => {
    const res = await request(app).get("/api/equipos");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            Id: expect.any(Number),
            Nombre: expect.any(String),
            FechaAparicion: expect.any(String),
            Bando: expect.stringMatching(/^(Héroes|Neutral|Villanos)$/),
            IdLugar: expect.any(Number),
            Activo: expect.any(Boolean)
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  }, 10000);
});

// test route/equipos GET
describe("GET /api/equipos con filtros", () => {
  it("Deberia devolver los equipos según filtro ", async () => {
    const res = await request(app).get("/api/equipos?Nombre=Avengers&Activo=true&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items)).toEqual(true);
  
    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if ( !array[i].Nombre.includes("Avengers") || !array[i].Activo ) {
          return false;
        }
      }
      return true;
    }
    
  });
});

// test route/equipos/:id GET
describe("GET /api/equipos/:id", () => {
  it("Deberia devolver el artículo con el id 1", async () => {
    const res = await request(app).get("/api/equipos/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id: 1,
        Nombre: expect.any(String),
        FechaAparicion: expect.any(String),
        Bando: expect.stringMatching(/^(Héroes|Neutral|Villanos)$/),
        IdLugar: expect.any(Number),
        Activo: expect.any(Boolean)
      }),
    );
  });
});

// test route/equipos POST
describe("POST /api/equipos", () => {
  it("Deberia devolver el personaje que acabo de crear", async () => {
    const res = await request(app).post("/api/equipos").send(equipoAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id: expect.any(Number),
        Nombre: expect.any(String),
        FechaAparicion: expect.any(String),
        Bando: expect.stringMatching(/^(Héroes|Neutral|Villanos)$/),
        IdLugar: expect.any(Number),
        Activo: expect.any(Boolean)
      }),
    );
  });
});

// test route/equipos/:id PUT
describe("PUT /api/equipos/:id", () => {
  it("Deberia devolver el personaje con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/equipos/1")
      .send(equipoModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/equipos/:id DELETE
describe("DELETE /api/equipos/:id", () => {
  it("Debería devolver el equipo con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/equipos/1");
    expect(res.statusCode).toEqual(200);
  });
});
