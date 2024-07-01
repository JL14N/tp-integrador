const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/lugares", async function (req, res, next) {
  let filtro = {};
  if (req.query.Nombre) {
    filtro.Nombre = { [db.Sequelize.Op.like]: `%${req.query.Nombre}%` };
  }
  let data = await db.lugares.findAll({
    where: filtro,
    attributes: ["Id", "Nombre", "Existe", "Ubicacion"],
    order: [["Id", "ASC"]],
  });
  res.json(data);
});

router.get("/api/lugares/:id", async function (req, res, next) {
  let lugar = await db.equipos.findByPk(req.params.id);
  res.json(lugar);
});



module.exports = router;
