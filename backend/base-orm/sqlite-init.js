// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/superheroes.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table usuarios( IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Clave text NOT NULL, Rol text NOT NULL);"
    );
    console.log("tabla usuarios creada!");
    await db.run(
      "insert into usuarios values	(1,'admin','123','admin'),(2,'juan','123','member');"
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'personajes_x_poderes'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE personajes_x_poderes (
      IdPersonaje INTEGER,
      NombrePoder TEXT NOT NULL,
      PRIMARY KEY (IdPersonaje, NombrePoder),
      FOREIGN KEY (IdPersonaje) REFERENCES personajes(Id)
      );`
    );
    console.log("tabla poderes creada!");
    await db.run(
      `INSERT INTO personajes_x_poderes (IdPersonaje, NombrePoder) VALUES
        (1, 'Spider-Sense'),
        (1, 'Web-slinging'),
        (2, 'Master Detective'),
        (2, 'Martial Arts Proficiency'),
        (3, 'Iron Man Armor'),
        (3, 'Technological Genius'),
        (4, 'Superhuman Strength'),
        (4, 'Indestructible Tiara'),
        (5, 'Super Soldier Serum'),
        (5, 'Indestructible Shield'),
        (6, 'Superhuman Strength'),
        (6, 'Flight'),
        (7, 'Mjolnir'),
        (7, 'God-like Strength'),
        (8, 'Superhuman Strength'),
        (8, 'Gamma Radiation Absorption'),
        (9, 'Espionage Expertise'),
        (9, 'Master Martial Artist'),
        (10, 'Super Speed'),
        (10, 'Time Travel'),
        (11, 'Power Ring'),
        (11, 'Energy Constructs'),
        (12, 'Underwater Breathing'),
        (12, 'Superhuman Strength'),
        (13, 'Vibranium Suit'),
        (13, 'Enhanced Senses'),
        (14, 'Mystical Arts'),
        (14, 'Reality Warping'),
        (15, 'Photon Blasts'),
        (15, 'Flight'),
        (16, 'Regeneration'),
        (16, 'Adamantium Claws'),
        (17, 'Master Archer'),
        (17, 'Trick Arrows'),
        (18, 'Accelerated Healing'),
        (18, 'Fourth Wall Awareness'),
        (19, 'Acrobatics'),
        (19, 'Whip Mastery'),
        (20, 'Size Alteration'),
        (20, 'Insect Communication'),
        (21, 'Star-Lord Armor'),
        (21, 'Leadership Skills'),
        (22, 'Enhanced Strength'),
        (22, 'Skilled Assassin'),
        (23, 'Tree Physiology'),
        (23, 'Regeneration'),
        (24, 'Weapons Proficiency'),
        (24, 'Tactical Genius'),
        (25, 'Enhanced Senses'),
        (25, 'Radar Sense'),
        (26, 'Superhuman Strength'),
        (26, 'Bulletproof Skin'),
        (27, 'Super Strength'),
        (27, 'Private Investigator Skills'),
        (28, 'Expert Marksman'),
        (28, 'Military Training'),
        (29, 'Weather Manipulation'),
        (29, 'Flight'),
        (30, 'Telekinesis'),
        (30, 'Telepathy'),
        (31, 'Optic Blasts'),
        (31, 'Leadership'),
        (32, 'Power Absorption'),
        (32, 'Flight'),
        (33, 'Magnetic Manipulation'),
        (33, 'Metal Control'),
        (34, 'Telepathy'),
        (34, 'Genius-level Intellect'),
        (35, 'Super Strength'),
        (35, 'Energy Absorption'),
        (36, 'Reality Warping'),
        (36, 'Chaos Magic'),
        (37, 'Synthetic Body'),
        (37, 'Intangibility'),
        (38, 'Master Archer'),
        (38, 'Expert Marksman'),
        (39, 'Bionic Arm'),
        (39, 'Expert Combatant'),
        (40, 'Flight'),
        (40, 'Wings'),
        (41, 'Tactical Genius'),
        (41, 'Espionage Expert'),
        (42, 'Expert Martial Artist'),
        (42, 'Canary Cry'),
        (43, 'Martian Physiology'),
        (43, 'Shape-shifting'),
        (44, 'Cybernetic Enhancements'),
        (44, 'Superhuman Strength'),
        (45, 'Divine Empowerment'),
        (45, 'Lightning Manipulation'),
        (46, 'Psychological Manipulation'),
        (46, 'Expert Acrobat'),
        (47, 'Master Acrobat'),
        (47, 'Leadership'),
        (48, 'Acrobatics'),
        (48, 'Expert Detective'),
        (49, 'Skilled Martial Artist'),
        (49, 'Gymnastics'),
        (50, 'Flight'),
        (50, 'Heat Vision');`
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'personajes'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE personajes (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre TEXT NOT NULL,
        FechaAparicion DATE NOT NULL,
        PuntosPoder INTEGER NOT NULL,
        IdEquipo INTEGER,
        IdFranquicia INTEGER NOT NULL,
        Activo BOOLEAN DEFAULT 1,
        FOREIGN KEY (IdEquipo) REFERENCES equipos(Id),
        FOREIGN KEY (IdFranquicia) REFERENCES franquicias(Id)
        );`
    );
    console.log("tabla personajes creada!");

    await db.run(
      `INSERT INTO personajes (Nombre, FechaAparicion, PuntosPoder, IdEquipo, IdFranquicia) VALUES
      ('Spider-Man', '1962-08-01', 85, 1, 1),
      ('Batman', '1939-05-01', 90, 2, 2),
      ('Iron Man', '1963-03-01', 95, 1, 1),
      ('Wonder Woman', '1941-10-01', 88, 2, 2),
      ('Captain America', '1941-03-01', 87, 1, 1),
      ('Superman', '1938-06-01', 92, 2, 2),
      ('Thor', '1962-08-01', 94, 1, 1),
      ('Hulk', '1962-05-01', 89, 1, 1),
      ('Black Widow', '1964-04-01', 84, 1, 1),
      ('Flash', '1956-01-01', 86, 2, 2),
      ('Green Lantern', '1940-07-01', 88, 2, 2),
      ('Aquaman', '1941-11-01', 83, 2, 2),
      ('Black Panther', '1966-07-01', 90, 1, 1),
      ('Doctor Strange', '1963-07-01', 91, 1, 1),
      ('Captain Marvel', '1967-03-01', 89, 1, 1),
      ('Wolverine', '1974-10-01', 93, 3, 1),
      ('Green Arrow', '1941-11-01', 85, 2, 2),
      ('Deadpool', '1991-02-01', 88, 3, 1),
      ('Catwoman', '1940-04-01', 82, 2, 2),
      ('Ant-Man', '1962-01-01', 86, 1, 1),
      ('Star-Lord', '1976-01-01', 87, 5, 1),
      ('Gamora', '1975-02-01', 84, 5, 1),
      ('Groot', '1960-11-01', 82, 5, 1),
      ('Rocket Raccoon', '1976-01-01', 85, 5, 1),
      ('Daredevil', '1964-04-01', 88, 6, 1),
      ('Luke Cage', '1972-06-01', 86, 6, 1),
      ('Jessica Jones', '2001-11-01', 83, 6, 1),
      ('Punisher', '1974-02-01', 90, 6, 1),
      ('Storm', '1975-05-01', 87, 3, 1),
      ('Jean Grey', '1963-09-01', 91, 3, 1),
      ('Cyclops', '1963-09-01', 85, 3, 1),
      ('Rogue', '1981-08-01', 88, 3, 1),
      ('Magneto', '1963-09-01', 93, 3, 1),
      ('Professor X', '1963-09-01', 92, 3, 1),
      ('Wonder Man', '1964-01-01', 86, 1, 1),
      ('Scarlet Witch', '1964-03-01', 87, 1, 1),
      ('Vision', '1968-10-01', 88, 1, 1),
      ('Hawkeye', '1964-09-01', 84, 1, 1),
      ('Winter Soldier', '2005-01-01', 85, 1, 1),
      ('Falcon', '1969-09-01', 83, 1, 1),
      ('Nick Fury', '1963-05-01', 86, 1, 1),
      ('Black Canary', '1947-07-01', 82, 2, 2),
      ('Martian Manhunter', '1955-11-01', 88, 2, 2),
      ('Cyborg', '1980-06-01', 85, 2, 2),
      ('Shazam', '1939-02-01', 90, 2, 2),
      ('Harley Quinn', '1992-09-01', 86, 8, 2),
      ('Robin', '1940-04-01', 82, 7, 2),
      ('Nightwing', '1984-04-01', 84, 7, 2),
      ('Batgirl', '1961-01-01', 83, 7, 2),
      ('Supergirl', '1959-05-01', 85, 2, 2);`
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'equipos'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE equipos (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      Nombre TEXT NOT NULL,
      FechaAparicion DATE,
      Bando TEXT,
      IdLugar INTEGER,
      Activo BOOLEAN DEFAULT 1,
      FOREIGN KEY (IdLugar) REFERENCES lugares(Id)
      CHECK (Bando IN ('Héroes', 'Villanos', 'Neutral'))
      );`
    );
    console.log("tabla equipos creada!");
    await db.run(
      `INSERT INTO equipos (Id, Nombre, FechaAparicion, Bando, IdLugar) VALUES
      (1, 'Avengers', '1963-09-01', 'Héroes', 1),
      (2, 'Justice League', '1960-03-01', 'Héroes', 2),
      (3, 'X-Men', '1963-09-01', 'Héroes', 3),
      (4, 'Fantastic Four', '1961-11-01', 'Héroes', 4),
      (5, 'Guardians of the Galaxy', '1969-01-01', 'Héroes', 5),
      (6, 'Defenders', '1971-12-01', 'Héroes', 6),
      (7, 'Teen Titans', '1964-07-01', 'Héroes', 7),
      (8, 'Suicide Squad', '1959-09-01', 'Neutral', 8),
      (9, 'Inhumans', '1965-12-01', 'Héroes', 9),
      (10, 'Legion of Super-Heroes', '1958-04-01', 'Héroes', 10);`
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'lugares'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE lugares (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      Nombre TEXT NOT NULL,
      Existe BOOLEAN NOT NULL,
      Ubicacion TEXT
      );`
    );
    console.log("tabla lugares creada!");
    await db.run(
      `INSERT INTO lugares (Id, Nombre, Existe, Ubicacion) VALUES
      (1, 'Avengers Tower', 1, 'New York City'),
      (2, 'Hall of Justice', 1, 'Washington, D.C.'),
      (3, 'X-Mansion', 1, 'Westchester County, New York'),
      (4, 'Baxter Building', 1, 'New York City'),
      (5, 'Knowhere', 1, 'Space'),
      (6, 'Sanctum Sanctorum', 1, 'New York City'),
      (7, 'Titans Tower', 0, 'Jump City'),
      (8, 'Belle Reve', 1, 'Louisiana'),
      (9, 'Attilan', 1, 'The Moon'),
      (10, 'Legion Headquarters', 0, 'Metropolis');`
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'peliculas'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE peliculas (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      Nombre TEXT NOT NULL,
      FechaEstreno DATE,
      Rating REAL,
      IdFranquicia INTEGER,
      Activo BOOLEAN DEFAULT 1,
      FOREIGN KEY (IdFranquicia) REFERENCES franquicias(Id)
      );`
    );
    console.log("tabla peliculas creada!");
    await db.run(
      `INSERT INTO peliculas (Id, Nombre, FechaEstreno, IdFranquicia, Rating) VALUES
      (1, 'Iron Man', '2008-05-02', 1, 8.5),
      (2, 'The Incredible Hulk', '2008-06-13', 1, 7.0),
      (3, 'Thor', '2011-05-06', 1, 7.0),
      (4, 'Captain America: The First Avenger', '2011-07-22', 1, 7.0),
      (5, 'The Avengers', '2012-05-04', 1, 8.0),
      (6, 'Guardians of the Galaxy', '2014-08-01', 1, 8.0),
      (7, 'Guardians of the Galaxy Vol. 2', '2017-05-05', 1, 7.5),
      (8, 'Fantastic Four', '2005-07-08', 5, 5.7),
      (9, 'Fantastic Four: Rise of the Silver Surfer', '2007-06-15', 5, 5.6),
      (10, 'Man of Steel', '2013-06-14', 2, 7.1),
      (11, 'Batman v Superman: Dawn of Justice', '2016-03-25', 2, 6.5),
      (12, 'Wonder Woman', '2017-06-02', 2, 7.5),
      (13, 'Justice League', '2017-11-17', 2, 6.3),
      (14, 'Aquaman', '2018-12-21', 2, 7.0),
      (15, 'X-Men', '2000-07-14', 3, 7.4),
      (16, 'X2: X-Men United', '2003-05-02', 3, 7.4),
      (17, 'X-Men: The Last Stand', '2006-05-26', 3, 6.7),
      (18, 'X-Men: First Class', '2011-06-03', 3, 7.7),
      (19, 'X-Men: Days of Future Past', '2014-05-23', 3, 8.0),
      (20, 'X-Men: Apocalypse', '2016-05-27', 3, 6.9),
      (21, 'Spider-Man', '2002-05-03', 4, 7.3),
      (22, 'Spider-Man 2', '2004-06-30', 4, 7.4),
      (23, 'Spider-Man 3', '2007-05-04', 4, 6.2),
      (24, 'The Amazing Spider-Man', '2012-07-03', 4, 6.9),
      (25, 'The Amazing Spider-Man 2', '2014-05-02', 4, 6.6);`
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'franquicias'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE franquicias (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      Nombre TEXT NOT NULL,
      FechaFundacion DATE
      );`
    );
    console.log("tabla franquicias creada!");
    await db.run(
      `INSERT INTO franquicias (Id, Nombre, FechaFundacion) VALUES
      (1, 'Marvel Cinematic Universe', '2008-05-02'),
      (2, 'DC Extended Universe', '2013-06-14'),
      (3, 'X-Men', '2000-07-14'),
      (4, 'Spider-Man', '2002-05-03'),
      (5, 'Fantastic Four', '2005-07-08');`
    );
  }

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;
