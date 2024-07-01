// opcion 1 cuando se hacen pruebas locales
const urlServidor = "http://localhost:3000"
// opcion 3 cuando se despliega el frontend, en el mismo servidor que el backend
//const urlServidor = ""  

const urlResourcePersonajes = urlServidor + "/api/personajes";
const urlResourcePoderes = urlServidor + "/api/poderes";

export const config = {
    urlServidor,
    urlResourcePersonajes,
    urlResourcePoderes,
}