import React, { useState, useEffect } from 'react';
import { poderesService } from '../services/poderes.service';
import { personajesService } from "../services/personajes.service";

function Poderes() {
  const tituloPagina = 'Poderes';
  const [poderesConNombres, setPoderesConNombres] = useState(null); 
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarPoderes();
  }, []);
  
  async function BuscarPoderes() {
    let data = await poderesService.Buscar();
    const poderesConNombresData = await unificarPoderes(data); // Use the data directly
    setPoderesConNombres(poderesConNombresData); // Set the poderesConNombres state
  };

  async function unificarPoderes (poderesData) {
    const resultado = {};

    poderesData.forEach(({ NombrePoder, IdPersonaje }) => {
      if (!resultado[NombrePoder]) {
        resultado[NombrePoder] = [IdPersonaje];
      } else {
        resultado[NombrePoder].push(IdPersonaje);
      }
    });

    const poderesConNombres = await Promise.all(
      Object.entries(resultado).map(async ([NombrePoder, IdPersonajes]) => {
        const nombres = await Promise.all(
          IdPersonajes.map(async (id) => {
            const personaje = await personajesService.BuscarPorId(id);
            return personaje.Nombre; // Assuming the service returns an object with a Nombre property
          })
        );
        return { NombrePoder, Nombres: nombres.join(', ') };
      })
    );

    return poderesConNombres;
  };

  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Poder</th>
            <th style={{ width: "60%" }}>Personajes</th>
          </tr>
        </thead>
        <tbody>
          {poderesConNombres &&
            poderesConNombres.map((poder) => (
              <tr key={poder.NombrePoder}>
                <td>{poder.NombrePoder}</td>
                <td>{poder.Nombres}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export { Poderes };