const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/franquicias", async function (req, res, next) {
  let filtro = {};
  if (req.query.Nombre) {
    filtro.Nombre = { [db.Sequelize.Op.like]: `%${req.query.Nombre}%` };
  }
  let data = await db.franquicias.findAll({
    where: filtro,
    attributes: ["Id", "Nombre", "FechaFundacion"],
    order: [["Id", "ASC"]],
  });
  res.json(data);
});

router.get("/api/franquicias/:id", async function (req, res, next) {
  let lugar = await db.franquicias.findByPk(req.params.id);
  res.json(lugar);
});



module.exports = router;
