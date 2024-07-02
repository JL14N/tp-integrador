import React, {useState, useEffect} from 'react';
import { franquiciasService } from '../services/franquicias.service';
import moment from "moment";

function Franquicias() {
  const tituloPagina = 'Franquicias';
  const [franquicias, setFranquicias] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarFranquicias();
  }, []);
  async function BuscarFranquicias() {
    let data = await franquiciasService.Buscar();
    setFranquicias(data);
  };
  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "25%" }}>IdFranquicia</th>
            <th style={{ width: "50%" }}>Nombre</th>
            <th style={{ width: "25%" }}>FechaFundacion</th>
          </tr>
        </thead>
        <tbody>
          {franquicias &&
            franquicias.map((franquicia) => (
              <tr key={franquicia.Id}>
                <td>{franquicia.Id}</td>
                <td>{franquicia.Nombre}</td>
                <td className="text-end">
                  {moment(franquicia.FechaFundacion).format("DD/MM/YYYY")}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export {Franquicias};