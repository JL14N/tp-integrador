import React, { useState, useEffect } from "react";
import moment from "moment";
import BuscarTodos from "../Buscar";
import PersonajesListado from "./PersonajesListado";
import PersonajesRegistro from "./PersonajesRegistro";
import { personajesService } from "../../services/personajes.service";
import { poderesService } from "../../services/poderes.service";
import { equiposService } from "../../services/equipos.service";
import { franquiciasService } from "../../services/franquicias.service";
import modalDialogService from "../../services/modalDialog.service";



function Personajes() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  const [Poderes, setPoderes] = useState(null);
  const [Equipos, setEquipos] = useState(null);
  const [Franquicias, setFranquicias] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarPoderes() {
      let data = await poderesService.Buscar();
      setPoderes(data);
    }
    async function BuscarEquipos() {
      let data = await equiposService.BuscarPorId(0);
      setEquipos(data);
    }
    async function BuscarFranquicias() {
      let data = await franquiciasService.Buscar();
      setFranquicias(data);
    }
    BuscarPoderes();
    BuscarEquipos();
    BuscarFranquicias();
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await personajesService.Buscar(Nombre, Activo, _pagina);
    modalDialogService.BloquearPantalla(false);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(id, accionABMC) {
    const data = await personajesService.BuscarPorId(id);
    setItem(data);
    setAccionABMC(accionABMC);
  }


  function Consultar(item) {
    BuscarPorId(item.Id, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    if (!item.Activo) {
      //alert("No puede modificarse un registro Inactivo.");
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item.Id, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      Id: 0,
      Nombre: '',
      FechaAparicion: moment(new Date()).format("YYYY-MM-DD"),
      PuntosPoder: 0,
      IdEquipo: 0,
      IdFranquicia: 0,
      Activo: true,
    });
    //modalDialogService.Alert("preparando el Alta...");
  }

  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
      (item.Activo ? "desactivar" : "activar") +
      " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await personajesService.ActivarDesactivar(item);
        await Buscar();
      }
    );

  }



  async function Grabar(item) {
    // agregar o modificar
    try {
      await personajesService.Grabar(item);
    }
    catch (error) {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();

    //setTimeout(() => {
    modalDialogService.Alert(
      "Registro " +
      (AccionABMC === "A" ? "agregado" : "modificado") +
      " correctamente."
    );
    //}, 0);
  }


  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Personajes <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <BuscarTodos
          Nombre={Nombre}
          setNombre={setNombre}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <PersonajesListado
          {...{
            Items,
            Equipos,
            Franquicias,
            Consultar,
            Modificar,
            ActivarDesactivar,
            Imprimir,
            Pagina,
            RegistrosTotal,
            Paginas,
            Buscar,
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <PersonajesRegistro
          {...{ AccionABMC, Poderes, Equipos, Franquicias, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}
export { Personajes };
