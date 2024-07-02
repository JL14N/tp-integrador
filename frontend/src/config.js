// opcion 1 cuando se hacen pruebas locales
const urlServidor = "http://localhost:3000"
// opcion 3 cuando se despliega el frontend, en el mismo servidor que el backend
//const urlServidor = ""  

const urlResourcePersonajes = urlServidor + "/api/personajes";
const urlResourcePoderes = urlServidor + "/api/poderes";
const urlResourceEquipos = urlServidor + "/api/equipos";
const urlResourceLugares = urlServidor + "/api/lugares";
const urlResourcePeliculas = urlServidor + "/api/peliculas";
const urlResourceFranquicias = urlServidor + "/api/franquicias";

export const config = {
    urlServidor,
    urlResourcePersonajes,
    urlResourcePoderes,
    urlResourceEquipos,
    urlResourceLugares,
    urlResourcePeliculas,
    urlResourceFranquicias
}