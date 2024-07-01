
import httpService from "./http.service";

import { config } from "../config";
const urlResource = config.urlResourceEquipos;


async function Buscar(Nombre, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(id) {
  const resp = await httpService.get(urlResource + "/" + id);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.Id);
}


async function Grabar(item) {
  if (item.Id === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.Id, item);
  }
}


export const equiposService = {
  Buscar, BuscarPorId, ActivarDesactivar, Grabar
};
