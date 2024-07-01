const express = require('express');
const router = express.Router();
const db = require('../base-orm/sequelize-init');
const { Op, ValidationError } = require('sequelize');
const auth = require('../seguridad/auth');

router.get('/api/personajes', async function (req, res, next) {

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
  const { count, rows } = await db.personajes.findAndCountAll({
    attributes: [
      'Id',
      'Nombre',
      'FechaAparicion',
      'PuntosPoder',
      'IdEquipo',
      'IdFranquicia',
      'Activo',
    ],
    order: [['Nombre', 'ASC']],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get('/api/personajes/:id', async function (req, res, next) {
  // #swagger.tags = ['personajes']
  // #swagger.summary = 'obtiene un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo...' }
  let items = await db.personajes.findOne({
    attributes: [
      'Id',
      'Nombre',
      'FechaAparicion',
      'PuntosPoder',
      'IdEquipo',
      'IdFranquicia',
      'Activo',
    ],
    where: { Id: req.params.id },
  });
  res.json(items);
});

router.post('/api/personajes/', async (req, res) => {
  try {
    let data = await db.personajes.create({
      Nombre: req.body.Nombre,
      FechaAparicion: req.body.FechaAparicion,
      PuntosPoder: req.body.PuntosPoder,
      IdEquipo: req.body.IdEquipo,
      IdFranquicia: req.body.IdFranquicia,
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

router.put('/api/personajes/:id', async (req, res) => {
  try {
    let item = await db.personajes.findOne({
      attributes: [
        'Id',
        'Nombre',
        'FechaAparicion',
        'PuntosPoder',
        'IdEquipo',
        'IdFranquicia',
        'Activo',
      ],
      where: { Id: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: 'Artículo no encontrado' });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.FechaAparicion = req.body.FechaAparicion;
    item.PuntosPoder = req.body.PuntosPoder;
    item.IdEquipo = req.body.IdEquipo;
    item.IdFranquicia = req.body.IdFranquicia;
    item.Activo = req.body.Activo;

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

router.delete('/api/personajes/:id', async (req, res) => {

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.personajes.destroy({
      where: { Id: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.personajes.update(
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
  '/api/personajesJWT',
  auth.authenticateJWT,
  async function (req, res, next) {
    const { rol } = res.locals.user;
    if (rol !== 'admin') {
      return res.status(403).json({ message: 'usuario no autorizado!' });
    }

    let items = await db.personajes.findAll({
      attributes: [
        'Id',
        'Nombre',
        'FechaAparicion',
        'PuntosPoder',
        'IdEquipo',
        'IdFranquicia',
        'Activo',
      ],
      order: [['Nombre', 'ASC']],
    });
    res.json(items);
  }
);

module.exports = router;
