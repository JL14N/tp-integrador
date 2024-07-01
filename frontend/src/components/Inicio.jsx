import { Link } from "react-router-dom";
import React from 'react';
function Inicio() {
  return (
    <div className="mt-4 p-5 rounded" style={{ backgroundColor: "lightgray" }}>
      <h1>Superhéroes</h1>
      <p>Este ejemplo está desarrollado con las siguientes tecnologías:</p>
      <p>
        Backend: NodeJs, Express , WebApiRest, Swagger, Sequelize, Sqlite
        múltiples capas en Javascript/Typescript.
      </p>
      <p>
        Frontend: Single Page Application, HTML, CSS, Bootstrap, NodeJs,
        Javascript y React.
      </p>
      <Link to="/personajes" className="btn btn-lg btn-primary">
          <i className="fa fa-search"> </i>  Ver Personajes
    </Link>

    </div>
  );
}
export { Inicio };
