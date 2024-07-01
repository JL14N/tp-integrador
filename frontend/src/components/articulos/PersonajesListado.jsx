import React, { useEffect } from "react";
import moment from "moment";
import { poderesService } from '../../services/poderes.service';
import { get, set } from "react-hook-form";

export default function PersonajesListado({ Items, Consultar, Modificar, ActivarDesactivar }) {
  /* const [poderesPersonaje, setPoderesPersonaje] = useState(null); 
  
  useEffect(() => {
    Items.foreach((Item) => BuscarPoderes(Item.Id));
  }, []);

  async function BuscarPoderes(id) {
    const poderes = await poderesService.BuscarPorIdPersonaje(id);
    poderes.map((poder) => poder.NombrePoder).join(", ");
    setPoderesPersonaje(poderes);
  }*/

  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">Fecha de Aparicion</th>
            <th className="text-center">Puntos de Poder</th>
            {/* <th className="text-center">Poderes</th> */}
            <th className="text-center">Equipo</th>
            <th className="text-center">Franquicia</th>
            <th className="text-center">Activo</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.Id}>
                <td>{Item.Nombre}</td>
                <td className="text-end">
                  {moment(Item.FechaAparicion).format("DD/MM/YYYY")}
                </td>
                <td className="text-end">{Item.PuntosPoder}</td>
                {/* <td className="text-end">{getPoderes(Item.Id)}</td> */}
                <td className="text-end">{Item.IdEquipo}</td>
                <td className="text-end">{Item.IdFranquicia}</td>
                <td>{Item.Activo ? "SI" : "NO"}</td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className={
                      "btn btn-sm " +
                      (Item.Activo
                        ? "btn-outline-danger"
                        : "btn-outline-success")
                    }
                    title={Item.Activo ? "Desactivar" : "Activar"}
                    onClick={() => ActivarDesactivar(Item)}
                  >
                    <i
                      className={"fa fa-" + (Item.Activo ? "times" : "check")}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
