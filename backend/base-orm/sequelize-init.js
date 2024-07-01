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
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (personajes_x_poderes, options) {
        if (typeof personajes_x_poderes.Nombre === "string") {
          personajes_x_poderes.Nombre = personajes_x_poderes.Nombre.toUpperCase().trim();
        }
      },
    },

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
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (personajes, options) {
        if (typeof personajes.Nombre === "string") {
          personajes.Nombre = personajes.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

module.exports = {
  sequelize,
  personajes_x_poderes,
  personajes,
};
