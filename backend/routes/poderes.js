const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/poderes", async function (req, res, next) {
  let filtro = {};
  if (req.query.Nombre) {
    filtro.NombrePoder = { [db.Sequelize.Op.like]: `%${req.query.Nombre}%` };
  }
  let data = await db.personajes_x_poderes.findAll({
    where: filtro,
    attributes: ["IdPersonaje", "NombrePoder"],
    order: [["NombrePoder", "ASC"]],
  });
  res.json(data);
});

router.get("/api/poderes/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const poderes = await db.Poder.findAll({
      where: {
        IdPersonaje: id
      }
    });
    if (poderes.length > 0) {
      res.json(poderes);
    } else {
      res.status(404).send('No poderes found with the given id.');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
