const express = require('express');
const router = express.Router();
const db = require('../base-orm/sequelize-init');
const { Op, ValidationError } = require('sequelize');
const auth = require('../seguridad/auth');

router.get('/api/equipos', async function (req, res, next) {

  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== '') {
    where.Nombre = {
      [Op.like]: '%' + req.query.Nombre + '%',
    };
  }
  if (req.query.Activo != undefined && req.query.Activo !== '') {
    // true o false en el modelo, en base de datos es 1 o 0
    // convertir el string a booleano
    where.Activo = req.query.Activo === 'true';
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.equipos.findAndCountAll({
    attributes: [
      'Id',
      'Nombre',
      'FechaAparicion',
      "Bando",
      "IdLugar",
      "Activo",
    ],
    order: [['Nombre', 'ASC']],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get('/api/equipos/:id', async function (req, res, next) {
  // #swagger.tags = ['equipos']
  // #swagger.summary = 'obtiene un equipo'
  // #swagger.parameters['id'] = { description: 'identificador del equipo...' }
  if (req.params.id == 0) {
    let data = await db.equipos.findAll({
      attributes: [
        'Id',
        'Nombre',
        'FechaAparicion',
        "Bando",
        "IdLugar",
        "Activo",
      ],
      order: [["Nombre", "ASC"]],
    });
    res.json(data);
  } else {
    let items = await db.equipos.findOne({
      attributes: [
        'Id',
        'Nombre',
        'FechaAparicion',
        "Bando",
        "IdLugar",
        "Activo",
      ],
      where: { Id: req.params.id },
    });
    res.json(items);
  }
});

router.post('/api/equipos/', async (req, res) => {
  try {
    let data = await db.equipos.create({
      Nombre: req.body.Nombre,
      FechaAparicion: req.body.FechaAparicion,
      Bando: req.body.Bando,
      IdLugar: req.body.IdLugar,
      Activo: req.body.Activo,
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach(
        (x) => (messages += (x.path ?? 'campo') + ': ' + x.message + '\n')
      );
      res.status(400).json({ message: messages });
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.put('/api/equipos/:id', async (req, res) => {
  try {
    let item = await db.equipos.findOne({
      attributes: [
        'Id',
        'Nombre',
        'FechaAparicion',
        "Bando",
        "IdLugar",
        "Activo",
      ],
      where: { Id: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: 'Equipo no encontrado' });
      return;
    }
    item.Nombre = req.body.Nombre,
    item.FechaAparicion = req.body.FechaAparicion,
    item.Bando = req.body.Bando,
    item.IdLugar = req.body.IdLugar,
    item.Activo = req.body.Activo,

    await item.save();

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => (messages += x.path + ': ' + x.message + '\n'));
      res.status(400).json({ message: messages });
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.delete('/api/equipos/:id', async (req, res) => {

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.equipos.destroy({
      where: { Id: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.equipos.update(
        { Activo: db.sequelize.literal('CASE WHEN Activo = 1 THEN 0 ELSE 1 END') },
        { where: { Id: req.params.id } }
      );
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validación, los devolvemos
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  }
});

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
router.get(
  '/api/equiposJWT',
  auth.authenticateJWT,
  async function (req, res, next) {
    const { rol } = res.locals.user;
    if (rol !== 'admin') {
      return res.status(403).json({ message: 'usuario no autorizado!' });
    }

    let items = await db.equipos.findAll({
      attributes: [
        'Id',
        'Nombre',
        'FechaAparicion',
        "Bando",
        "IdLugar",
        "Activo",
      ],
      order: [['Nombre', 'ASC']],
    });
    res.json(items);
  }
);

module.exports = router;
