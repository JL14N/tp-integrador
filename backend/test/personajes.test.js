const request = require("supertest");
const app = require("../index");
const usuarioAdmin = { usuario: "admin", clave: "123" };

const personajeAlta = {
  Nombre: "Personaje " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un Nombre aleatorio
  FechaAparicion: new Date().toISOString(),
  PuntosPoder: 69,
  IdEquipo: 1,
  IdFranquicia: 1,
  Activo: true,
};
const personajeModificacion = {
  Id: 1,
  Nombre: "Personaje " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un Nombre aleatorio
  FechaAparicion: new Date().toISOString(),
  PuntosPoder: 14,
  IdEquipo: 2,
  IdFranquicia: 2,
  Activo: false,
};

// test route/personajes GET
describe("GET /api/personajes", () => {
  it("Deberia devolver todos los personajes", async () => {
    const res = await request(app).get("/api/personajes");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            Id: expect.any(Number),
            Nombre: expect.any(String),
            FechaAparicion: expect.any(String),
            PuntosPoder: expect.any(Number),
            IdEquipo: expect.any(Number),
            IdFranquicia: expect.any(Number),
            Activo: expect.any(Boolean)
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  }, 10000);
});

// test route/personajes GET
describe("GET /api/personajes con filtros", () => {
  it("Deberia devolver los personajes según filtro ", async () => {
    const res = await request(app).get("/api/personajes?Nombre=Ant-Man&Activo=true&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items)).toEqual(true);
  
    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if ( !array[i].Nombre.includes("Ant") || !array[i].Activo ) {
          return false;
        }
      }
      return true;
    }
    
  });
});

// test route/personajes/:id GET
describe("GET /api/personajes/:id", () => {
  it("Deberia devolver el artículo con el id 1", async () => {
    const res = await request(app).get("/api/personajes/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id: expect.any(Number),
        Nombre: expect.any(String),
        FechaAparicion: expect.any(String),
        PuntosPoder: expect.any(Number),
        IdEquipo: expect.any(Number),
        IdFranquicia: expect.any(Number),
        Activo: expect.any(Boolean)
      })
    );
  });
});

// test route/personajes POST
/* describe("POST /api/personajes", () => {
   it("Deberia devolver el personaje que acabo de crear", async () => {
    const res1 = await request(app)
    .post("/api/login")
    .set("Content-type", "application/json")
    .send(usuarioAdmin);
    expect(res1.statusCode).toEqual(200);
    let token = res1.body.accessToken;
  
    const res = await request(app)
      .post("/api/personajes")
      .set("Authorization", `Bearer ${token}`)
      .send(personajeAlta);
    console.log(res.statusCode, res.body)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id: expect.any(Number),
        Nombre: expect.any(String),
        FechaAparicion: expect.any(String),
        PuntosPoder: expect.any(Number),
        IdEquipo: expect.any(Number),
        IdFranquicia: expect.any(Number),
        Activo: expect.any(Boolean)
      })
    );
    it("Devolveria error, porque falta token de autorización", async function () {
      const res = await request(app).post("/api/personajes").send(personajeAlta);
      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toEqual("Acceso denegado");
    });
}); */

// test route/personajes/:id PUT
describe("PUT /api/personajes/:id", () => {
  it("Deberia devolver el personaje con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/personajes/1")
      .send(personajeModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/personajes/:id DELETE
describe("DELETE /api/personajes/:id", () => {
  it("Debería devolver el personaje con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/personajes/1");
    expect(res.statusCode).toEqual(200);
  });
});
