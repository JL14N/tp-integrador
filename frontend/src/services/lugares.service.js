import axios from "axios";

import { config } from "../config";
const urlResource = config.urlResourceLugares;

async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}

async function BuscarPorId(id) {
  const resp = await axios.get(urlResource + "/" + id);
  return resp.data;
}

export const lugaresService = {
  Buscar, BuscarPorId
};
