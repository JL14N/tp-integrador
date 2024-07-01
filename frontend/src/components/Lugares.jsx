import React, {useState, useEffect} from 'react';
import { lugaresService } from '../services/lugares.service';

function Lugares() {
  const tituloPagina = 'Lugares';
  const [lugares, setLugares] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarLugares();
  }, []);
  async function BuscarLugares() {
    let data = await lugaresService.Buscar();
    setLugares(data);
  };
  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>IdLugar</th>
            <th style={{ width: "30%" }}>Nombre</th>
            <th style={{ width: "20%" }}>Existe</th>
            <th style={{ width: "40%" }}>Ubicación</th>
          </tr>
        </thead>
        <tbody>
          {lugares &&
            lugares.map((lugar) => (
              <tr key={lugar.Id}>
                <td>{lugar.Id}</td>
                <td>{lugar.Nombre}</td>
                <td>{lugar.Existe ? "SI" : "NO"}</td>
                <td>{lugar.Ubicacion}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export {Lugares};