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
        FOREIGN KEY (IdEquipo) REFERENCES Equipo(Id),
        FOREIGN KEY (IdFranquicia) REFERENCES Franquicia(Id)
        );`
    );
    console.log("tabla personajes creada!");

    await db.run(
      `INSERT INTO personajes (Nombre, FechaAparicion, PuntosPoder, IdEquipo, IdFranquicia) VALUES
        ('Spider-Man', '1962-08-01', 85, 1, 1),
        ('Batman', '1939-05-01', 90, 2, 2),
        ('Iron Man', '1963-03-01', 95, 3, 1),
        ('Wonder Woman', '1941-10-01', 88, 4, 2),
        ('Captain America', '1941-03-01', 87, 5, 1),
        ('Superman', '1938-06-01', 92, 6, 2),
        ('Thor', '1962-08-01', 94, 7, 1),
        ('Hulk', '1962-05-01', 89, 8, 1),
        ('Black Widow', '1964-04-01', 84, 9, 1),
        ('Flash', '1956-01-01', 86, 10, 2),
        ('Green Lantern', '1940-07-01', 88, 11, 2),
        ('Aquaman', '1941-11-01', 83, 12, 2),
        ('Black Panther', '1966-07-01', 90, 13, 1),
        ('Doctor Strange', '1963-07-01', 91, 14, 1),
        ('Captain Marvel', '1967-03-01', 89, 15, 1),
        ('Wolverine', '1974-10-01', 93, 16, 1),
        ('Green Arrow', '1941-11-01', 85, 17, 2),
        ('Deadpool', '1991-02-01', 88, 18, 1),
        ('Catwoman', '1940-04-01', 82, 19, 2),
        ('Ant-Man', '1962-01-01', 86, 20, 1),
        ('Star-Lord', '1976-01-01', 87, 21, 1),
        ('Gamora', '1975-02-01', 84, 22, 1),
        ('Groot', '1960-11-01', 82, 23, 1),
        ('Rocket Raccoon', '1976-01-01', 85, 24, 1),
        ('Daredevil', '1964-04-01', 88, 25, 1),
        ('Luke Cage', '1972-06-01', 86, 26, 1),
        ('Jessica Jones', '2001-11-01', 83, 27, 1),
        ('Punisher', '1974-02-01', 90, 28, 1),
        ('Storm', '1975-05-01', 87, 29, 1),
        ('Jean Grey', '1963-09-01', 91, 30, 1),
        ('Cyclops', '1963-09-01', 85, 31, 1),
        ('Rogue', '1981-08-01', 88, 32, 1),
        ('Magneto', '1963-09-01', 93, 33, 1),
        ('Professor X', '1963-09-01', 92, 34, 1),
        ('Wonder Man', '1964-01-01', 86, 35, 1),
        ('Scarlet Witch', '1964-03-01', 87, 36, 1),
        ('Vision', '1968-10-01', 88, 37, 1),
        ('Hawkeye', '1964-09-01', 84, 38, 1),
        ('Winter Soldier', '2005-01-01', 85, 39, 1),
        ('Falcon', '1969-09-01', 83, 40, 1),
        ('Nick Fury', '1963-05-01', 86, 41, 1),
        ('Black Canary', '1947-07-01', 82, 42, 2),
        ('Martian Manhunter', '1955-11-01', 88, 43, 2),
        ('Cyborg', '1980-06-01', 85, 44, 2),
        ('Shazam', '1939-02-01', 90, 45, 2),
        ('Harley Quinn', '1992-09-01', 86, 46, 2),
        ('Robin', '1940-04-01', 82, 47, 2),
        ('Nightwing', '1984-04-01', 84, 48, 2),
        ('Batgirl', '1961-01-01', 83, 49, 2),
        ('Supergirl', '1959-05-01', 85, 50, 2);`
    );
  }

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
