// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/superheroes.db");

// definicion del modelo de datos
const personajes_x_poderes = sequelize.define(
  "personajes_x_poderes",
  {
    IdPersonaje: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    NombrePoder: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);

const personajes = sequelize.define(
  "personajes",
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaAparicion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    PuntosPoder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    IdEquipo: {
      type: DataTypes.INTEGER,
    },
    IdFranquicia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);

const equipos = sequelize.define(
  "equipos",
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaAparicion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Bando: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IdLugar: {
      type: DataTypes.INTEGER,
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);

const lugares = sequelize.define(
  'lugares',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    existe: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    ubicacion: DataTypes.TEXT
  },
  {
    timestamps: false
  }
);

module.exports = {
  sequelize,
  personajes_x_poderes,
  personajes,
  equipos,
  lugares
};
