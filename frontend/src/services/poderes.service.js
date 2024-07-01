import axios from "axios";

import { config } from "../config";
const urlResource = config.urlResourcePoderes;

async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}

async function BuscarPorIdPersonaje(idPersonaje) {
  const resp = await axios.get(urlResource + "/" + idPersonaje);
  return resp.data;
}

export const poderesService = {
  Buscar, BuscarPorIdPersonaje
};
